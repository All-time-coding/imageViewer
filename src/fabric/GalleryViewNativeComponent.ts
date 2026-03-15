import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { HostComponent, ViewProps } from 'react-native';
import type {
  DirectEventHandler,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

type SizeChangeEvent = Readonly<{
  index: Int32;
}>;

type Headers = ReadonlyArray<
  Readonly<{
    key: string;
    value: string;
  }>
>;

export interface NativeProps extends ViewProps {
  urls: string[];
  onOpen?: DirectEventHandler<null>;
  onClose?: DirectEventHandler<null>;
  onIndexChange?: DirectEventHandler<SizeChangeEvent>;
  headers?: Headers;
}

export type GalleryViewComponent = HostComponent<NativeProps>;

export interface GalleryViewNativeCommands {
  open: (viewRef: React.ElementRef<GalleryViewComponent>, index: Int32) => void;
}

export const Commands = codegenNativeCommands<GalleryViewNativeCommands>({
  supportedCommands: ['open'],
});

export default codegenNativeComponent<NativeProps>('GalleryView');
