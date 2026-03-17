import { forwardRef } from 'react';
import { Platform, Text, Image } from 'react-native';

const ImageViewer = Platform.select({
  ios: () => require('./ImageViewerIOS').GalleryView,
  android: () => require('./ImageViewerAndroid').GalleryViewAndroid,
  default: () => <Text>ImageViewer is not supported on this platform.</Text>,
})();

type ImageViewerProps = {
  onClose?: () => void;
  onOpen?: () => void;
  onChangeIndex?: (index: number) => void;
  urls?: (string | number)[];
  headers?: Record<string, string>;
};

export type ImageViewerRef = {
  open: (index?: number) => void;
};

function resolveUrls(urls: (string | number)[]): string[] {
  return urls.map((url) =>
    typeof url === 'number' ? Image.resolveAssetSource(url).uri : url
  );
}

export const GalleryView = forwardRef<ImageViewerRef, ImageViewerProps>(
  ({ urls = [], ...props }, ref) => {
    return <ImageViewer {...props} urls={resolveUrls(urls)} ref={ref} />;
  }
);
