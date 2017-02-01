var path = require('path');

var config = {
  entry: {
    avantura: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  node: {
    __filename: true
  },
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loaders: ['to-string-loader', 'css-loader']
    }, {
      test: /\.html$/,
      loader: "html"
    }, {
      test: /\.(jpg|png)$/,
      loader: 'file?name=[path][name].[hash].[ext]'
    }]
  }
};

module.exports = config
