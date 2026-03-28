"use strict";

import { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { getNativeModule } from "./modules.js";
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
const NativeModule = getNativeModule();
const {
  ImageViewer: NativeImageViewer
} = NativeModules;
export const GalleryViewAndroid = /*#__PURE__*/forwardRef(({
  onClose,
  onOpen,
  onChangeIndex,
  urls = [],
  headers
}, ref) => {
  const subscriptions = useRef([]);
  useEffect(() => {
    return () => {
      subscriptions.current.forEach(subscription => subscription.remove());
      subscriptions.current = [];
    };
  }, []);
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModule);
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
  useImperativeHandle(ref, () => ({
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
  return /*#__PURE__*/_jsx(_Fragment, {});
});
GalleryViewAndroid.displayName = 'GalleryViewAndroid';
//# sourceMappingURL=ImageViewerAndroid.js.map