import { type NativeSyntheticEvent } from 'react-native';
export type SizeChangeEvent = NativeSyntheticEvent<{
    index: number;
}>;
type ImageViewerLibraryProps = {
    urls: string[];
    onOpen?: () => void;
    onClose?: () => void;
    onIndexChange?: (event: SizeChangeEvent) => void;
};
export type GalleryViewRef = {
    open: (initialIndex?: number) => void;
};
export declare const GalleryView: import("react").ForwardRefExoticComponent<{
    onIndexChange?: (index: number) => void;
    headers?: Record<string, string>;
} & ImageViewerLibraryProps & import("react").RefAttributes<GalleryViewRef>>;
export {};
//# sourceMappingURL=ImageViewerIOS.d.ts.map