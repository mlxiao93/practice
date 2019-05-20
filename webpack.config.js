const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CodeJumpPlugin = require('./webpack-plugin/CodeJumpPlugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
    // demo: path.resolve(__dirname, './SimpleVue.Demo/index.js'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    compress: true,
    port: 6060,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      chunks: ['index']
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'demo.html',
    //   template: path.resolve(__dirname, './SimpleVue.Demo/index.html'),
    //   chunks: ['demo']
    // }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, './sw.js'),
    }),
    new VueLoaderPlugin(),
    new CodeJumpPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.(js|html|vue)$/,
        use: [
          {
            loader: path.resolve('./webpack-loader/CodeJumpLoader.js')
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
}