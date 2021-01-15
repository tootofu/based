'use strict';

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: [
      './src/content/4chan.js',
      './src/content/hispachan.js',
      './src/content/yuki.js'
    ]
  },
  output: {
    path: path.join( __dirname, 'dist' ),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
        {
            test: /\.tsx?/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.json', to: './' },
        { from: './src/css/based.css', to: './css' },
        { from: './src/css/tooltip.css', to: './css' }
      ]
    })
  ]
}
