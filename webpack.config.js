const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const path = require('path');
module.exports = {
  devtool: 'eval-source-map',
    mode: 'development',
  entry:  __dirname + "/src/myModule.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname +"/dist1",//打包后的文件存放的地方
    filename: "bundles.js"//打包后输出文件的文件名
  },
  plugins: [
    new UglifyJSPlugin({
        uglifyOptions: {
            comments:false,
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }
        })
  ],
  module: {
    rules: [ {
        test: /\.css$/,
        use: [
            {
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    modules: true, // 指定启用css modules
                    localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                }
            }
        ]
    }]
  }
}