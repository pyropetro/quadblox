const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },{
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' }, 
          { loader: 'css-loader' }],
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};