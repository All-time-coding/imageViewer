//  GalleryView.swift
//  ImageViewerLibrary
//
//  Created by hydromoll on 31.01.2025.
//

import Foundation
import UIKit
import ImageViewer
import React

struct DataItem {
    let url: URL
    let galleryItem: GalleryItem
}

@objc(GalleryViewComponentDelegate)
public protocol GalleryViewComponentDelegate {
  func handleOnIndexChange(index:Int)
  func handleOnOpen()
  func handleOnClose()
}


@objc
public class GalleryViewImpl: UIView, GalleryItemsDataSource {
  
  var items: [DataItem] = []
  
  @objc public var urls: [String] = [] {
    didSet {
      loadImages(from: urls)
    }
  }
  
  @objc public var headers:[String:String]?
  
  @objc var onOpen:RCTDirectEventBlock?
  @objc var onClose:RCTDirectEventBlock?
  @objc var onIndexChange:RCTDirectEventBlock?
  
  
  @objc private func handleOpen(){
    DispatchQueue.main.async {
      if self.onOpen != nil{
        self.onOpen?(["isOpened":"true"])
      } else{
        self.delegate?.handleOnOpen()
      }
    }
  }
  
  @objc private func handleClose(){
    DispatchQueue.main.async {
      if self.onClose != nil{
        self.onClose?(["isClose":"true"])
      } else{
        self.delegate?.handleOnClose()
      }
    }
  }
  
  @objc private func handleIndexChange(index:Int){
    DispatchQueue.main.async {
      if self.onClose != nil{
        self.onIndexChange?(["index":index])
      } else{
        self.delegate?.handleOnIndexChange(index: index)
      }
    }
  }
  
  @objc public weak var delegate:GalleryViewComponentDelegate?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func loadImages(from urls: [String]) {
    items = []
    
    var tempItems: [DataItem?] = Array(repeating: nil, count: urls.count)
    
    let dispatchGroup = DispatchGroup()
    
    for (index, urlString) in urls.enumerated() {
        guard let url = URL(string: urlString) else { continue }
        
        dispatchGroup.enter()
        loadImage(from: url) { image in
            let fetchImageBlock: FetchImageBlock = { completion in
                DispatchQueue.global().async {
                    completion(image)
                }
            }
            
            let galleryItem = GalleryItem.image(fetchImageBlock: fetchImageBlock)
            let dataItem = DataItem(url: url, galleryItem: galleryItem)
            
            DispatchQueue.main.async {
                tempItems[index] = dataItem
                dispatchGroup.leave()
            }
        }
    }
    
    dispatchGroup.notify(queue: .main) {
        self.items = tempItems.compactMap { $0 }
    }
}
    
    @objc public func showGallery(_ startIndex: Int) {
        guard let rootViewController = UIApplication.shared.windows.first?.rootViewController,
              startIndex >= 0 && startIndex < items.count else { return }
        
        let galleryViewController = GalleryViewController(
            startIndex: startIndex,
            itemsDataSource: self,
            configuration: galleryConfiguration()
        )

        galleryViewController.launchedCompletion = {
          self.handleOpen()
        }

        galleryViewController.closedCompletion = {
          self.handleClose()
}
        galleryViewController.swipedToDismissCompletion = { 
          self.handleClose()
    }

        galleryViewController.landedPageAtIndexCompletion = { index in
          self.handleIndexChange(index: index)
        }

        rootViewController.present(galleryViewController, animated: false, completion: nil)
    }

    public func provideGalleryItem(_ index: Int) -> GalleryItem {
        return items[index].galleryItem
    }

    public func itemCount() -> Int {
        return items.count
    }

    func galleryConfiguration() -> GalleryConfiguration {
        return [
            GalleryConfigurationItem.closeButtonMode(.builtIn),
            GalleryConfigurationItem.thumbnailsButtonMode(.none),
            GalleryConfigurationItem.deleteButtonMode(.none),
            
            GalleryConfigurationItem.pagingMode(.carousel),
            GalleryConfigurationItem.presentationStyle(.displacement),
            GalleryConfigurationItem.hideDecorationViewsOnLaunch(false),
            GalleryConfigurationItem.swipeToDismissMode(.vertical),
            GalleryConfigurationItem.toggleDecorationViewsBySingleTap(false),
            GalleryConfigurationItem.activityViewByLongPress(false),
            GalleryConfigurationItem.overlayColor(UIColor(white: 0.035, alpha: 1)),
            GalleryConfigurationItem.overlayColorOpacity(1),
            GalleryConfigurationItem.overlayBlurOpacity(1),
            GalleryConfigurationItem.overlayBlurStyle(UIBlurEffect.Style.dark),
            
            GalleryConfigurationItem.videoControlsColor(.white),
            GalleryConfigurationItem.maximumZoomScale(8),
            GalleryConfigurationItem.swipeToDismissThresholdVelocity(500),
            GalleryConfigurationItem.doubleTapToZoomDuration(0.15),
            GalleryConfigurationItem.blurPresentDuration(0.5),
            GalleryConfigurationItem.colorPresentDuration(0.25),
            GalleryConfigurationItem.statusBarHidden(true),
            GalleryConfigurationItem.displacementKeepOriginalInPlace(false),
            GalleryConfigurationItem.displacementInsetMargin(50)
        ]
    }
    
    private func loadImage(from url: URL, completion: @escaping (UIImage?) -> Void) {
        
      var request = URLRequest(url: url);
      
      if let headers = headers{
        for (key, value) in headers{
          request.setValue(value, forHTTPHeaderField: key)
        }
      }
      
      
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error loading image: \(error.localizedDescription)")
                completion(nil)
                return
            }
            
            guard let data = data, let image = UIImage(data: data) else {
                print("Failed to decode image from data")
                completion(nil)
                return
            }
            
            completion(image)
        }.resume()
    }
}
