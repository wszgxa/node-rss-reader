var webpack = require('webpack');
var glob = require('glob');
var path = require('path');

var entry = (function () {
  var entry = {}
  glob.sync('statics/src/vue/**/*.js').forEach(function (tagName) {
    var tag = './' + path.parse(tagName).dir + '/' + path.parse(tagName).name
    var tagKey = 'js' + tagName.slice(15, -3)
    entry[tagKey] = [tag]
  })
  return entry
})()
console.log(entry)
module.exports = {
  entry: entry,
  output: {
    publicPath: './',
    path: path.join(__dirname, 'statics/dist'),
    filename: '[name].js'
  },
  module: {
    loader: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          'presets': ['es2015'],
          'plugins': [
            ['transform-es2015-for-of', {
              'loose': true
            }],
            'transform-object-assign'
          ]
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
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
  vue: {
    loaders: {
      css: 'style!css!autoprefixer!less',
    },
    autoprefixer: {
      browsers: ['last 40 versions']
    }
  },
  babel: {
    presets: ['es2015', 'stage-1'],
    plugins: ['transform-runtime']
  }
}