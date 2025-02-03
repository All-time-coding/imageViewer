import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  findNodeHandle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-image-viewer' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type ImageViewerLibraryProps = {
  urls: string[];
};

export type GalleryViewRef = {
  open: (initialIndex: number) => void;
};

const ComponentName = 'GalleryView';

const GalleryViewComponent =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<
        ImageViewerLibraryProps & {
          ref: React.MutableRefObject<null>;
        }
      >(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export const GalleryView = forwardRef<GalleryViewRef, ImageViewerLibraryProps>(
  ({ urls = [] }, ref) => {
    const galleryRef = useRef(null);
    useImperativeHandle(ref, () => ({
      open,
    }));

    const open = (initialIndex = 0) => {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(galleryRef.current),
        UIManager.getViewManagerConfig('GalleryView').Commands.show!,
        [initialIndex]
      );
    };

    return <GalleryViewComponent ref={galleryRef} urls={urls} />;
  }
);
