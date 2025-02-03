//
//  GalleryViewManager.m
//  ImageViewerLibrary
//
//  Created by hydromoll on 31.01.2025.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>


@interface RCT_EXTERN_MODULE(GalleryViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(urls, NSArray<NSString *> *)
RCT_EXTERN_METHOD(show:(nonnull NSNumber *)node idx:(nonnull NSNumber)idx)

@end
