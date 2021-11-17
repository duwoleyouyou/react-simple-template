const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react','@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },      
      {
        test: /\.css$/,
        include: [/node_modules/],  //处理依赖包的css文件，不做模块化处理
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(le|c)ss$/,
        exclude: [/node_modules/], 
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader?modules' },
            { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
            loader: 'url-loader?esModule=false'
        }
      },
    ]
  },
  devServer: {
    historyApiFallback:true,
    webSocketServer:false,
  },
  resolve: {
    extensions: ['.js','.jsx','.ts', '.tsx'],
    alias: {
        '@': path.resolve(__dirname, 'src')
    },
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      new HtmlwebpackPlugin({
          title: 'react-simple-template',
          template: './public/index.html'
      })
  ],
};