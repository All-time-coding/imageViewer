#ifdef RCT_NEW_ARCH_ENABLED

#import "GalleryView.h"

#include "react/renderer/components/ImageViewerSpecs/EventEmitters.h"
#include <Foundation/Foundation.h>
#include "ReactCodegen/react/renderer/components/ImageViewerSpecs/EventEmitters.h"
#include <objc/NSObject.h>

#import <React/RCTConversions.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>

#import <react/renderer/components/ImageViewerSpecs/ComponentDescriptors.h>
#import <react/renderer/components/ImageViewerSpecs/EventEmitters.h>
#import <react/renderer/components/ImageViewerSpecs/Props.h>
#import <react/renderer/components/ImageViewerSpecs/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "react_native_image_viewer-Swift.h"

using namespace facebook::react;

bool headersEqual(
    const std::vector<facebook::react::GalleryViewHeadersStruct> &a,
    const std::vector<facebook::react::GalleryViewHeadersStruct> &b) {
  if (a.size() != b.size()) return false;
  for (size_t i = 0; i < a.size(); ++i) {
    if (a[i].key != b[i].key || a[i].value != b[i].value) return false;
  }
  return true;
}

@interface GalleryView()<RCTGalleryViewViewProtocol, GalleryViewComponentDelegate>
@end

@implementation GalleryView {
  GalleryViewImpl * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<GalleryViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const GalleryViewProps>();
        _props = defaultProps;
        _view = [[GalleryViewImpl alloc] init];
        _view.delegate = self;
        self.contentView = _view;
    }
    return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<GalleryViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<GalleryViewProps const>(props);
  
  if (!headersEqual(oldViewProps.headers, newViewProps.headers)) {
      
      NSMutableDictionary<NSString *, NSString *> *headers = [NSMutableDictionary new];
      
      for (const auto &header : newViewProps.headers){
        NSString * key = [NSString stringWithUTF8String:header.key.c_str()];
        NSString * value = [NSString stringWithUTF8String:header.value.c_str()];
        
        if(key != nil && value != nil){
          headers[key] = value;
        }
      }
      _view.headers = headers;
    }
  
    if(oldViewProps.urls != newViewProps.urls){
      NSMutableArray *newUrls = [NSMutableArray new];
      for (const auto &url : newViewProps.urls) {
        [newUrls addObject:[NSString stringWithUTF8String:url.c_str()]];
      }
      _view.urls = newUrls;
    }
    [super updateProps:props oldProps:oldProps];
}

- (void)handleCommand:(nonnull const NSString *)commandName args:(nonnull const NSArray *)args {
  RCTGalleryViewHandleCommand(self, commandName, args);
}

- (void)open:(NSInteger)index {
  [_view showGallery:index];
}

- (void)handleOnClose {
  if(_eventEmitter != nil){
    std::dynamic_pointer_cast<const GalleryViewEventEmitter>(_eventEmitter)->onClose({});
  }
}

- (void)handleOnIndexChangeWithIndex:(NSInteger)index {
  if(_eventEmitter != nil){
    std::dynamic_pointer_cast<const GalleryViewEventEmitter>(_eventEmitter)->onIndexChange(GalleryViewEventEmitter::OnIndexChange{
      .index = int(index)
    });
  }
}

- (void)handleOnOpen {
  if(_eventEmitter != nil){
    std::dynamic_pointer_cast<const GalleryViewEventEmitter>(_eventEmitter)->onOpen({});
  }
}


Class<RCTComponentViewProtocol> GalleryViewCls(void)
{
    return GalleryView.class;
}


@end
#endif
