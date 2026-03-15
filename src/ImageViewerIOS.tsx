import { forwardRef, useRef, useImperativeHandle } from 'react';
import {
  Platform,
  UIManager,
  requireNativeComponent,
  findNodeHandle,
  type NativeSyntheticEvent,
  type HostComponent,
} from 'react-native';
import { Commands } from './fabric/GalleryViewNativeComponent';
import type FabricGalleryViewComponent from './fabric/GalleryViewNativeComponent';

const isFabricEnabled = (global as any)?.nativeFabricUIManager;

function generateHeaderForNative(obj: Record<string, string>) {
  if (!obj) {
    return [];
  }
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
}

const LINKING_ERROR =
  "The package 'react-native-image-viewer' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';
export type SizeChangeEvent = NativeSyntheticEvent<{ index: number }>;
type ImageViewerLibraryProps = {
  urls: string[];
  onOpen?: () => void;
  onClose?: () => void;
  onIndexChange?: (event: SizeChangeEvent) => void;
};
type ImageViewerProps = {
  onIndexChange?: (index: number) => void;
  headers?: Record<string, string>;
} & ImageViewerLibraryProps;

export type GalleryViewRef = {
  open: (initialIndex?: number) => void;
};

const ComponentName = 'GalleryView';

type OldArchGalleryViewComponent =
  | HostComponent<
      ImageViewerLibraryProps & {
        ref: React.MutableRefObject<null>;
      }
    >
  | (() => never);

let GalleryViewComponent:
  | OldArchGalleryViewComponent
  | typeof FabricGalleryViewComponent;

if (isFabricEnabled) {
  GalleryViewComponent = require('./fabric/GalleryViewNativeComponent').default;
} else if (UIManager.getViewManagerConfig(ComponentName) != null) {
  GalleryViewComponent = requireNativeComponent<ImageViewerLibraryProps>(
    ComponentName
  ) as unknown as OldArchGalleryViewComponent;
} else {
  throw new Error(LINKING_ERROR);
}

export const GalleryView = forwardRef<GalleryViewRef, ImageViewerProps>(
  ({ urls = [], onClose, onOpen, onIndexChange, headers }, ref) => {
    const galleryRef = useRef(null);
    useImperativeHandle(ref, () => ({
      open,
    }));

    const open = (initialIndex = 0) => {
      if (isFabricEnabled) {
        Commands.open(galleryRef.current as any, initialIndex);
      } else {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(galleryRef.current),
          UIManager.getViewManagerConfig('GalleryView').Commands.show!,
          [initialIndex]
        );
      }
    };

    return (
      <GalleryViewComponent
        ref={galleryRef}
        urls={urls}
        onClose={onClose}
        onIndexChange={(e) => {
          onIndexChange?.(e?.nativeEvent?.index);
        }}
        headers={generateHeaderForNative(headers ?? {})}
        onOpen={onOpen}
      />
    );
  }
);
