const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        include: /node_modules\/react-dom/,
        use: ["react-hot-loader/webpack"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    // contentBase
    static: {
      directory: path.join(__dirname, "public/"),
    },
    port: 3000,
    // publicPath
    devMiddleware: {
      publicPath: "https://localhost:3000/dist/",
    },
    // hotOnly
    hot: "only",

    // To use router
    historyApiFallback: true,

    // Proxy
    /*proxy: {
      "/api/v1": "http://localhost:8000",
    },*/
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      systemvars: true,
    }),
  ],
};
