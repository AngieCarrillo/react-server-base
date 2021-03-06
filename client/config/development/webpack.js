import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const CLIENT = __dirname + '/../..';
const ROOT = CLIENT + '/..';

module.exports = {
  entry: {
    app: __dirname + '/app',
    style: __dirname + '/style'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/../../build/development'
  },
  module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "raw-loader!sass-loader")
        }, {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "raw-loader")
        }, {
            test: /\.js$/,
            loader: 'babel'
          }, {
            test: /\.json$/,
            loader: 'json'
          }, {
            test: /\.template\.html/,
            loader: "react-templates-loader?targetVersion=0.14.0"
          }
      ]
  },
  sassLoader: {
    includePaths: [CLIENT, ROOT + '/node_modules']
  },
  plugins: [
    new ExtractTextPlugin("style.css", {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
  ],
  node: {
    fs: "empty"
  },
  resolve: {
      alias: {
          api: __dirname + '/../../api/development',
          config: __dirname + '/../../config/development'
      }
  }
}
