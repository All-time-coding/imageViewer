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
export declare const GalleryView: import("react").ForwardRefExoticComponent<ImageViewerProps & import("react").RefAttributes<ImageViewerRef>>;
export {};
//# sourceMappingURL=index.d.ts.map