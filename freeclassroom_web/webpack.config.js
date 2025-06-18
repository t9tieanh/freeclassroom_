const path = require('path');

module.exports = {
  // ...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/page'),
      '@services': path.resolve(__dirname, 'src/service'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@context': path.resolve(__dirname, 'src/context')
    },
    extensions: ['.js', '.jsx', '.json']
  }
};