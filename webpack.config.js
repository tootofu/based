'use strict';

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join( __dirname, 'dist' ),
    filename: '[name].js'
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.json', to: './' },
        { from: './src/css/main.css', to: 'css/' }
      ]
    })
  ]
}
