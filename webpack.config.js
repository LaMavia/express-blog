const path = require('path');
module.exports = {
  entry: './public/js/panel/src/index.tsx',
  output: {
    path: path.resolve('public/js/panel'),
    filename: 'panel_bundle.js'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".d.ts", ".js"]
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "awesome-typescript-loader"
      }, {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "awesome-typescript-loader"
      }
    ]
  },
  /*externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }*/
}