import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  open(urls: string[], index: number): void;
}

export default TurboModuleRegistry.get<Spec>('ImageViewer');
