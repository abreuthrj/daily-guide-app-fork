module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'ENV_MODE',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '#': './src',
          '@types': './src/@types',
        },
        extensions: [
          '.native.ts',
          '.native.tsx',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
