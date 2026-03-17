import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GalleryView} from 'react-native-image-viewer';
import type {ImageViewerRef} from 'react-native-image-viewer';

const randomImages = [
  require('../assets/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg'),
  require('../assets/lavender-field-sunset-near-valensole_268835-3910.jpg'),
  require('../assets/sun-sets-behind-mountain-ranges-600nw-2479236003.jpg'),
  'https://oh.sssh.it/api/files/animals/6k2f607durw6ix5/14766203_mnim4S7hJJ.jpg',
  'https://oh.sssh.it/api/files/animals/6k2f607durw6ix5/30138998_eh6cbcb4Sr.jpg',
  'https://oh.sssh.it/api/files/animals/6k2f607durw6ix5/26148393_3LN5rLg0xI.jpg',
  'https://oh.sssh.it/api/files/animals/6k2f607durw6ix5/28301817_4daHV8TdQF.jpg',
  'https://oh.sssh.it/api/files/animals/6k2f607durw6ix5/89423953_YDJ2tk3kaw.jpg',
  'https://oh.sssh.it/api/files/animals/6k2f607durw6ix5/25498496_bD7vbMRgQQ.jpg',
  'https://oh.sssh.it/api/files/animals/6k2f607durw6ix5/14736276_Bv0yLVR0T1.jpg',
];

const uiManager = (global as any)?.nativeFabricUIManager ? 'Fabric' : 'Paper';

export default function App() {
  const anyRef = useRef<ImageViewerRef>(null);

  const open = (idx = 1) => {
    console.log(randomImages[idx]);
    anyRef?.current?.open(idx);
  };
  return (
    <View style={styles.container}>
      <Text>{uiManager}</Text>
      {randomImages.map((item, index) => (
        <Text key={index} onPress={() => open(index)}>
          {item}
        </Text>
      ))}
      <Text onPress={() => open(0)}>123</Text>
      <GalleryView
        ref={anyRef}
        onOpen={() => console.log('opened')}
        onClose={() => console.log('closed')}
        onChangeIndex={idx => console.log('currentIndex' + idx)}
        urls={randomImages}
        headers={{
          'Content-Type': 'application/json',
          Authorization: 'Bearer 1234567890',
        }}
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
