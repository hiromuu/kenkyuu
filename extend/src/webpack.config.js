const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv')
const env = dotenv.config().parsed;

module.exports = {
  mode: 'development',
  devtool: 'source-map', // 'inline-source-map' から 'none' に変更
  entry: {
    content_script: './content_script.js',
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].bundle.js',
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
    ],
  },
  plugins: [
    // ...
    new webpack.DefinePlugin({
    'process.env': JSON.stringify(env),
  }),
  ],
};
