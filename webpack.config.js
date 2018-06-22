const path = require('path');
module.exports = {
  entry: path.join(__dirname, 'panel_src', 'main'),
  output: {
    filename: 'panel.js',
    path: path.resolve(__dirname, 'public', 'js')
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'panel_src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  }
};