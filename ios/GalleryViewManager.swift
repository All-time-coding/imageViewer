//
//  GalleryViewManager.swift
//  ImageViewerLibrary
//
//  Created by hydromoll on 31.01.2025.
//
import Foundation
import UIKit
import React

@objc(GalleryViewManager)
class GalleryViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override var methodQueue: DispatchQueue! {
    return DispatchQueue.main
  }
  
  override func view() -> UIView! {
    return GalleryView()
  }
  
  @objc func show(_ node:NSNumber, idx:NSNumber = 0){
    let index = Int(truncating: idx)
    DispatchQueue.main.async {
      let component = self.getGalleryView(withTag: node)
      component.showGallery(index)
    }
  }
  private func getGalleryView(withTag tag: NSNumber) -> GalleryView {
    return self.bridge.uiManager.view(forReactTag: tag) as! GalleryView
  }
}
