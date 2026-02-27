import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
import {} from "./";
import { getNativeModule } from "./modules";

type ImageViewerProps = {
  onClose?: () => void;
  onOpen?: () => void;
  onChangeIndex?: (index: number) => void;
  urls?: string[];
};

export type ImageViewerRef = {
  open: (index?: number) => void;
};

const NativeModule = getNativeModule();

const { ImageViewer: NativeImageViewer } = NativeModules;

export const GalleryViewAndroid = forwardRef<ImageViewerRef, ImageViewerProps>(
  ({ onClose, onOpen, onChangeIndex, urls = [] }, ref) => {
    const subscriptions = useRef<any[]>([]);

    useEffect(() => {
      return () => {
        subscriptions.current.forEach((subscription) => subscription.remove());
        subscriptions.current = [];
      };
    }, []);

    useEffect(() => {
      const eventEmitter = new NativeEventEmitter(NativeModule);
      if (onClose) {
        eventEmitter.addListener("onClose", onClose);
      }

      if (onOpen) {
        eventEmitter.addListener("onOpen", onOpen);
      }

      if (onChangeIndex) {
        eventEmitter.addListener("onChangeIndex", (event) => {
          if (event && typeof event.index === "number") {
            onChangeIndex(event.index);
          }
        });
      }
      return () => {
        eventEmitter.removeAllListeners("onClose");
        eventEmitter.removeAllListeners("onOpen");
        eventEmitter.removeAllListeners("onChangeIndex");
      };
    }, [onClose, onOpen, onChangeIndex]);

    useImperativeHandle(ref, () => ({
      open: (index: number = 0) => {
        if (!urls || urls.length === 0) {
          console.error("ImageViewer: No URLs provided");
          return;
        }
        if (index < 0 || index >= urls.length) {
          console.warn("ImageViewer: Index out of bounds, using 0 instead");
          index = 0;
        }

        NativeImageViewer.open(urls, index);
      },
    }));
    return <></>;
  },
);

GalleryViewAndroid.displayName = "GalleryViewAndroid";
