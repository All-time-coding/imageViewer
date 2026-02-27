const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const config = {
  resolver: {
    extraNodeModules: {
      'react-native-image-viewer': path.resolve(
        __dirname,
        '..',
        'lib',
        'commonjs',
      ),
    },
  },
  watchFolders: [path.resolve(__dirname, '..')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
