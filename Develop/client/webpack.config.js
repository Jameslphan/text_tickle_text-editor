const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Tickle Text-Editor'
      }),
      // Service Worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }), 

      // Manifest
      new WebpackPwaManifest({
        name: 'Text Tickle Text-Editor',
        short_name: 'TTT-E',
        background_color: 'black',
        theme_color: 'yellow',
        start_url: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      })
    ],

    module: {
      rules: [
        // CSS Loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel
        {
          test: /\.m?js$/,
          exclude: /node_modules|bower_components/,
          use: {
            loader: 'babel-loader',
            presets: ['@babel/preset-env'],
            plugins: ['./babel-plugin-myPlugin", "@babel/plugin-transform-runtime'],
          }
        }
        
      ],
    },
  };
};
