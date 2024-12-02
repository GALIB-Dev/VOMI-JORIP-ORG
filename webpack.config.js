const path = require('path');
const webpack = require('webpack');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Your entry point file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'], // Automatically resolve certain extensions
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
      "fs": false,
      "child_process": false,
      "net": false,
      "tls": false,
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
    }
  },
  devtool: 'source-map', // For easier debugging
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      include: [/\.html$/, /\.js$/, /\.css$/],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
