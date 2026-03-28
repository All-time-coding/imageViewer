"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GalleryView = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _GalleryViewNativeComponent = require("./fabric/GalleryViewNativeComponent.js");
var _jsxRuntime = require("react/jsx-runtime");
const isFabricEnabled = global?.nativeFabricUIManager;
function generateHeaderForNative(obj) {
  if (!obj) {
    return [];
  }
  return Object.entries(obj).map(([key, value]) => ({
    key,
    value
  }));
}
const LINKING_ERROR = "The package 'react-native-image-viewer' doesn't seem to be linked. Make sure: \n\n" + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComponentName = 'GalleryView';
let GalleryViewComponent;
if (isFabricEnabled) {
  GalleryViewComponent = require('./fabric/GalleryViewNativeComponent').default;
} else if (_reactNative.UIManager.getViewManagerConfig(ComponentName) != null) {
  GalleryViewComponent = (0, _reactNative.requireNativeComponent)(ComponentName);
} else {
  throw new Error(LINKING_ERROR);
}
const GalleryView = exports.GalleryView = /*#__PURE__*/(0, _react.forwardRef)(({
  urls = [],
  onClose,
  onOpen,
  onIndexChange,
  headers
}, ref) => {
  const galleryRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({
    open
  }));
  const open = (initialIndex = 0) => {
    if (isFabricEnabled) {
      _GalleryViewNativeComponent.Commands.open(galleryRef.current, initialIndex);
    } else {
      _reactNative.UIManager.dispatchViewManagerCommand((0, _reactNative.findNodeHandle)(galleryRef.current), _reactNative.UIManager.getViewManagerConfig('GalleryView').Commands.show, [initialIndex]);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GalleryViewComponent, {
    ref: galleryRef,
    urls: urls,
    onClose: onClose,
    onIndexChange: e => {
      onIndexChange?.(e?.nativeEvent?.index);
    },
    headers: generateHeaderForNative(headers ?? {}),
    onOpen: onOpen
  });
});
//# sourceMappingURL=ImageViewerIOS.js.map