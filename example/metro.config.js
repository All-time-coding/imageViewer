const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const root = path.resolve(__dirname, '..');
const modules = path.resolve(__dirname, 'node_modules');

const config = {
  watchFolders: [root],
  resolver: {
    extraNodeModules: {
      'react-native-image-viewer': root,
      'react': path.resolve(modules, 'react'),
      'react-native': path.resolve(modules, 'react-native'),
    },
    blockList: exclusionList([
      new RegExp(`${root}/node_modules/react/.*`),
      new RegExp(`${root}/node_modules/react-native/.*`),
    ]),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
