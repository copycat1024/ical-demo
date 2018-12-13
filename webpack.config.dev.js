'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const directory = fs.realpathSync(process.cwd())
const resolve = (relativePath) => path.resolve(directory, relativePath)

module.exports = {
  mode: 'development',
  entry: {
    'js': [
      require.resolve('react-hot-loader/patch'),
      resolve('src/index.js')
    ]
  },
  output: {
    pathinfo: true,
    filename: '[name]/bundle.js',
    path: resolve('build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve('./src/index.html'),
      chunks: ['js']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'public'),
      to: path.resolve(__dirname, 'build')
    }])
  ],
  devServer: {
    port: 2401,
    host: '0.0.0.0',
    contentBase: resolve('./build'),
    hot: true,
    proxy: [{
      context: ['/frontend', '/all_event', '/calendar_url', '/user_setting', '/ics', '/logout'],
      target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false
    }]
  }
}
