const path = require('path');

const webpack = require('webpack');

module.exports = {
  entry:  './src/index.js',
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'index.js',
  },
  devtool: 'source-map',
};
