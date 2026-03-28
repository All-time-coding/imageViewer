import type { HostComponent, ViewProps } from 'react-native';
import type { DirectEventHandler, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
type SizeChangeEvent = Readonly<{
    index: Int32;
}>;
type Headers = ReadonlyArray<Readonly<{
    key: string;
    value: string;
}>>;
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
export declare const Commands: GalleryViewNativeCommands;
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<NativeProps>;
export default _default;
//# sourceMappingURL=GalleryViewNativeComponent.d.ts.map