const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          buffer: require.resolve('buffer/'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util/'),
          path: require.resolve('path-browserify'),
          crypto: require.resolve('crypto-browserify'),
          querystring: require.resolve('querystring-es3'),
          url: require.resolve('url/'),
          https: require.resolve('https-browserify'),
          http: require.resolve('stream-http'),
          os: require.resolve('os-browserify/browser'),
          zlib: require.resolve('browserify-zlib'),
          assert: require.resolve('assert/'),
          process: require.resolve('process/browser'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ],
    },
  },
}; 