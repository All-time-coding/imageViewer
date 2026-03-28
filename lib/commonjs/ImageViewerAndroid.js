"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GalleryViewAndroid = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _modules = require("./modules.js");
var _jsxRuntime = require("react/jsx-runtime");
const NativeModule = (0, _modules.getNativeModule)();
const {
  ImageViewer: NativeImageViewer
} = _reactNative.NativeModules;
const GalleryViewAndroid = exports.GalleryViewAndroid = /*#__PURE__*/(0, _react.forwardRef)(({
  onClose,
  onOpen,
  onChangeIndex,
  urls = [],
  headers
}, ref) => {
  const subscriptions = (0, _react.useRef)([]);
  (0, _react.useEffect)(() => {
    return () => {
      subscriptions.current.forEach(subscription => subscription.remove());
      subscriptions.current = [];
    };
  }, []);
  (0, _react.useEffect)(() => {
    const eventEmitter = new _reactNative.NativeEventEmitter(NativeModule);
    if (onClose) {
      eventEmitter.addListener('onClose', onClose);
    }
    if (onOpen) {
      eventEmitter.addListener('onOpen', onOpen);
    }
    if (onChangeIndex) {
      eventEmitter.addListener('onChangeIndex', event => {
        if (event && typeof event.index === 'number') {
          onChangeIndex(event.index);
        }
      });
    }
    return () => {
      eventEmitter.removeAllListeners('onClose');
      eventEmitter.removeAllListeners('onOpen');
      eventEmitter.removeAllListeners('onChangeIndex');
    };
  }, [onClose, onOpen, onChangeIndex]);
  (0, _react.useImperativeHandle)(ref, () => ({
    open: (index = 0) => {
      if (!urls || urls.length === 0) {
        console.error('ImageViewer: No URLs provided');
        return;
      }
      if (index < 0 || index >= urls.length) {
        console.warn('ImageViewer: Index out of bounds, using 0 instead');
        index = 0;
      }
      NativeImageViewer.open(urls, index, headers);
    }
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {});
});
GalleryViewAndroid.displayName = 'GalleryViewAndroid';
//# sourceMappingURL=ImageViewerAndroid.js.map