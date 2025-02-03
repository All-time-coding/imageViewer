//
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
    let imageView: UIImageView
    let galleryItem: GalleryItem
}



class GalleryView:UIView,GalleryItemsDataSource{
  
  var items:[DataItem] = []
  
  @objc var urls:[String] = [] {
    didSet {
      items = []
      urls.forEach {url in
        DispatchQueue.main.async {
          var galleryItem:GalleryItem
          let img = UIImageView()
          guard let imageSource = URL(string:url) else {return}
          
          img.load(url: imageSource)
          
          let fetchImageBlock: FetchImageBlock = { completion in
            completion(img.image)
          }
          
          galleryItem = GalleryItem.image(fetchImageBlock: fetchImageBlock)
          self.items.append(DataItem(imageView: img, galleryItem: galleryItem));
        }
      }
    }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc func showGallery(_ startIndex:Int){
    guard let rootViewController = UIApplication.shared.windows.first?.rootViewController else {return}
    print("StartIndex \(startIndex)")
    let galleryViewController = GalleryViewController(startIndex: startIndex, itemsDataSource: self, configuration: galleryConfiguration())
    rootViewController.present(galleryViewController, animated: true, completion: nil)
  }
  
  
  func provideGalleryItem(_ index:Int) -> GalleryItem {
    return self.items[index].galleryItem;
  }
  
  func itemCount() -> Int {
    return self.items.count;
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
          GalleryConfigurationItem.blurPresentDelay(0),
          GalleryConfigurationItem.colorPresentDuration(0.25),
          GalleryConfigurationItem.colorPresentDelay(0),

          GalleryConfigurationItem.blurDismissDuration(0.1),
          GalleryConfigurationItem.blurDismissDelay(0.4),
          GalleryConfigurationItem.colorDismissDuration(0.45),
          GalleryConfigurationItem.colorDismissDelay(0),

          GalleryConfigurationItem.itemFadeDuration(0.3),
          GalleryConfigurationItem.decorationViewsFadeDuration(0.15),
          GalleryConfigurationItem.rotationDuration(0.15),

          GalleryConfigurationItem.displacementDuration(0.55),
          GalleryConfigurationItem.reverseDisplacementDuration(0.25),
          GalleryConfigurationItem.displacementTransitionStyle(.springBounce(0.7)),
          GalleryConfigurationItem.displacementTimingCurve(.linear),

          GalleryConfigurationItem.statusBarHidden(true),
          GalleryConfigurationItem.displacementKeepOriginalInPlace(false),
          GalleryConfigurationItem.displacementInsetMargin(50)
      ]
  }
  
}

fileprivate extension UIImageView {
  func load(url: URL) {
    DispatchQueue.global().async { [weak self] in
      if let data = try? Data(contentsOf: url) {
        if let image = UIImage(data: data) {
          DispatchQueue.main.async {
            self?.image = image
          }
        }
      }
    }
  }
}
