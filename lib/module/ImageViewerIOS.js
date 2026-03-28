"use strict";

import { forwardRef, useRef, useImperativeHandle } from 'react';
import { Platform, UIManager, requireNativeComponent, findNodeHandle } from 'react-native';
import { Commands } from "./fabric/GalleryViewNativeComponent.js";
import { jsx as _jsx } from "react/jsx-runtime";
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
const LINKING_ERROR = "The package 'react-native-image-viewer' doesn't seem to be linked. Make sure: \n\n" + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComponentName = 'GalleryView';
let GalleryViewComponent;
if (isFabricEnabled) {
  GalleryViewComponent = require('./fabric/GalleryViewNativeComponent').default;
} else if (UIManager.getViewManagerConfig(ComponentName) != null) {
  GalleryViewComponent = requireNativeComponent(ComponentName);
} else {
  throw new Error(LINKING_ERROR);
}
export const GalleryView = /*#__PURE__*/forwardRef(({
  urls = [],
  onClose,
  onOpen,
  onIndexChange,
  headers
}, ref) => {
  const galleryRef = useRef(null);
  useImperativeHandle(ref, () => ({
    open
  }));
  const open = (initialIndex = 0) => {
    if (isFabricEnabled) {
      Commands.open(galleryRef.current, initialIndex);
    } else {
      UIManager.dispatchViewManagerCommand(findNodeHandle(galleryRef.current), UIManager.getViewManagerConfig('GalleryView').Commands.show, [initialIndex]);
    }
  };
  return /*#__PURE__*/_jsx(GalleryViewComponent, {
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