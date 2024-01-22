const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  //index.js file location
  entry: {
    src: './client/index.js',
  },
  //where to save final build files
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      //use for js & jsx files
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      //use for css files
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    //use to load react components
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './client/index.html',
    }),
  ],
  devServer: {
    //allow to run both front and backend
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build'),
    },
    //send all request to backend
    proxy: {
      '/api': 'http://localhost:3000',
    },
    //use to load react components with react router
    historyApiFallback: true,
  },
};
