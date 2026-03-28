"use strict";

import { forwardRef } from 'react';
import { Platform, Text, Image } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
const ImageViewer = Platform.select({
  ios: () => require('./ImageViewerIOS').GalleryView,
  android: () => require('./ImageViewerAndroid').GalleryViewAndroid,
  default: () => /*#__PURE__*/_jsx(Text, {
    children: "ImageViewer is not supported on this platform."
  })
})();
function resolveUrls(urls) {
  return urls.map(url => typeof url === 'number' ? Image.resolveAssetSource(url).uri : url);
}
export const GalleryView = /*#__PURE__*/forwardRef(({
  urls = [],
  ...props
}, ref) => {
  return /*#__PURE__*/_jsx(ImageViewer, {
    ...props,
    urls: resolveUrls(urls),
    ref: ref
  });
});
//# sourceMappingURL=index.js.map