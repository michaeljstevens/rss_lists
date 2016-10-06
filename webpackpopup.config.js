var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./js/popup.jsx",
  output: {
    path: path.join(__dirname, 'js'),
    filename: "popupbundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
