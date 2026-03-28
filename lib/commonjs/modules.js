"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNativeModule = void 0;
var _reactNative = require("react-native");
const getNativeModule = () => {
  try {
    switch (_reactNative.Platform.OS) {
      case 'ios':
        return _reactNative.NativeModules.ImageViewer;
      case 'android':
        return _reactNative.TurboModuleRegistry ? _reactNative.TurboModuleRegistry.get('ImageViewer') : _reactNative.NativeModules.ImageViewer;
      default:
        throw Error('react-native-image-viewer is not supported on this platform');
    }
  } catch (e) {
    // @ts-ignore
    if (global.ignoreDatePickerWarning) return null;
    throw Error('react-native-image-viewer is not supported on this platform');
  }
};
exports.getNativeModule = getNativeModule;
//# sourceMappingURL=modules.js.map