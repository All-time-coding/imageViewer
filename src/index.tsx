import { Platform, Text } from 'react-native';
import { forwardRef } from 'react';

const ImageViewer = Platform.select({
  ios: () => require('./ImageViewerIOS').GalleryView,
  android: () => require('./ImageViewerAndroid').GalleryViewAndroid,
  default: () => <Text>DatePicker is not supported on this platform.</Text>,
})();

type ImageViewerProps = {
  onClose?: () => void;
  onOpen?: () => void;
  onChangeIndex?: (index: number) => void;
  urls?: string[];
};

export type ImageViewerRef = {
  open: (index?: number) => void;
};

export const GalleryView = forwardRef<ImageViewerRef, ImageViewerProps>(
  (props, ref) => {
    return <ImageViewer {...props} ref={ref} />;
  }
);
