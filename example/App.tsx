import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GalleryView, GalleryViewRef} from './components';

const randomImages: string[] = [
  'https://loremflickr.com/320/240',
  'https://loremflickr.com/320/240',
  'https://loremflickr.com/320/240',
  'https://loremflickr.com/320/240',
  'https://loremflickr.com/320/240',
  'https://loremflickr.com/320/240',
  'https://loremflickr.com/320/240',
];
export default function App() {
  const anyRef = useRef<GalleryViewRef>(null);

  const open = () => {
    anyRef?.current?.open(1);
  };
  return (
    <View style={styles.container}>
      <Text onPress={open}>123</Text>
      <GalleryView
        ref={anyRef}
        onOpen={() => console.log('opened')}
        onClose={() => console.log('closed')}
        onIndexChange={idx => console.log('currentIndex' + idx)}
        urls={randomImages}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
