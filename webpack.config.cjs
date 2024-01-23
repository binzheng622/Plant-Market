const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  //index.js file location
  entry: {
    src: './client/index.tsx',
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
      //use for ts & tsx files
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      //use for css files
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      //use for image files
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    //use to load react components
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './client/index.html',
    }),
    //seperate css file durring bundle
    new CopyPlugin({
      patterns: [{ from: './client/styles.css' }],
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
