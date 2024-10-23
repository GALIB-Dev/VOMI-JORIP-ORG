const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry point file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.json$/, // This tells Webpack to use the json-loader for .json files
        loader: 'json-loader',
      },
      // You might have other loaders here, for example:
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
  },
  devtool: 'source-map', // For easier debugging
};
