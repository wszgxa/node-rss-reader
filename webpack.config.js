var webpack = require('webpack');
var glob = require('glob');
var path = require('path');

var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var entry = (function () {
  var entry = {}
  glob.sync('statics/src/vue/**/*.js').forEach(function (tagName) {
    var tag = './' + path.parse(tagName).dir + '/' + path.parse(tagName).name
    var tagKey = 'js' + tagName.slice(15, -3)
    entry[tagKey] = [tag]
  })
  return entry
})()
var commonArray = (function (en) {
  var commonArr = [];
  for (var props in en) {
    commonArr.push(props);
  }
  return commonArr;
})(entry)

module.exports = {
  entry: entry,
  output: {
    publicPath: './',
    path: path.join(__dirname, 'statics/dist'),
    filename: '[name].js'
  },
  module: {
    resolve: {
      extensions: ['', '.js', '.styl', '.vue']
    },
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,        
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { 
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader' 
      },
      {
        test: /\.(png|jp?eg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[path]/[name].[ext]'
        }
      }
    ],
  },
  devtool: 'source-map',
  plugins: [
    new CommonsChunkPlugin('./statics/dist/js/common.bundle.js', commonArray)
  ],
  vue: {
    loaders: {
      css: 'style!css!autoprefixer!stylus',
    },
    autoprefixer: {
      browsers: ['last 40 versions']
    },
  },
  babel: {
    presets: ['es2015', 'stage-1'],
    plugins: ['transform-runtime']
  }
}