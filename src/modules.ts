import { NativeModules, Platform, TurboModuleRegistry } from 'react-native';

export const getNativeModule = () => {
  try {
    switch (Platform.OS) {
      case 'ios':
        return NativeModules.ImageViewer;
      case 'android':
        return TurboModuleRegistry
          ? TurboModuleRegistry.get('ImageViewer')
          : NativeModules.ImageViewer;
      default:
        throw Error(
          'react-native-image-viewer is not supported on this platform'
        );
    }
  } catch (e) {
    // @ts-ignore
    if (global.ignoreDatePickerWarning) return null;
    throw Error('react-native-image-viewer is not supported on this platform');
  }
};
