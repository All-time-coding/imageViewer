type ImageViewerProps = {
    onClose?: () => void;
    onOpen?: () => void;
    onChangeIndex?: (index: number) => void;
    urls?: string[];
    headers?: Record<string, string>;
};
export type ImageViewerRef = {
    open: (index?: number) => void;
};
export declare const GalleryViewAndroid: import("react").ForwardRefExoticComponent<ImageViewerProps & import("react").RefAttributes<ImageViewerRef>>;
export {};
//# sourceMappingURL=ImageViewerAndroid.d.ts.map