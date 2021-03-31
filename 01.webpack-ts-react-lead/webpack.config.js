const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[chuankhash].[name].js",
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"), // * 服务启动根目录（除了main.js所在目录之外的静态服务目录）
    compress: true, // * 为每个静态文件开启 gzip compression
    open: false, // * 是否自动打开浏览器，默认false不打开
    port: 8082, // * 自定义服务端口，默认为8080
    hot: true, // * 是否开启模块热更新，默认为false不开启
    proxy: { // * 本地正向代理（常用于非同源请求）
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: "asset",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", {
          loader: "sass-loader",
          options: {
            sassOptions: {
              module: true
            }
          },
        },],
      },
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new ReactRefreshPlugin()
  ],
}
