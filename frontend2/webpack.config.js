const webpack = require("webpack");

module.exports = {
  entry: { app: "./src/index.jsx" },
  output: { filename: "bundle.js" },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          }
        ]
      }
    ]
  }
};
