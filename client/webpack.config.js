const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./script.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean : true
    },
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, "dist"),
        port:5500,
        open: true, 
         hot: true, 
    },
    module: {
        rules: [
          {
            test: /\.css$/, // Load CSS files
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./index.html", // Ensure this file exists
        }),
    ],
}