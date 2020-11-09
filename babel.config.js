module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel',
        [
          require('@babel/plugin-proposal-decorators').default,
          {
            legacy: true
          }
        ],
      ],
    },
  },
};
