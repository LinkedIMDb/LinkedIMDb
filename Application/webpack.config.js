const webpack = require('webpack');
const  path = require('path');


// const BUILD_DIR = path.resolve(__dirname, './build');

module.exports = {
  entry: 
    // 'react-hot-loader/patch',
    './client/src/index.js'
  ,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      }
    ]
  },
  // resolve: {
  //   extensions: ['*', '.js', '.jsx']
  // },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  // watch: true,
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  // devServer: {
  //   contentBase: './dist',
    // hot: true
  // }
};