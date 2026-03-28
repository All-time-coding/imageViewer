"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GalleryView = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const ImageViewer = _reactNative.Platform.select({
  ios: () => require('./ImageViewerIOS').GalleryView,
  android: () => require('./ImageViewerAndroid').GalleryViewAndroid,
  default: () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
    children: "ImageViewer is not supported on this platform."
  })
})();
function resolveUrls(urls) {
  return urls.map(url => typeof url === 'number' ? _reactNative.Image.resolveAssetSource(url).uri : url);
}
const GalleryView = exports.GalleryView = /*#__PURE__*/(0, _react.forwardRef)(({
  urls = [],
  ...props
}, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ImageViewer, {
    ...props,
    urls: resolveUrls(urls),
    ref: ref
  });
});
//# sourceMappingURL=index.js.map