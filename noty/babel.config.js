module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            '@assets': './assets',
            '@components': './src/components',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@shared': './src/shared',
          },
        },
      ],
    ],
  };
};
