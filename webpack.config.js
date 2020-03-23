const HtmlWebpackPlugin = require("html-webpack-plugin");
const { readdirSync } = require("fs");

const pages = readdirSync("./src/pages").reduce(
  (p, f) => ({
    ...p,
    [f.split(".js")[0]]: `./src/pages/${f}`
  }),
  {}
);

const htmls = Object.entries(pages).map(
  ([name, file]) =>
    new HtmlWebpackPlugin({
      template: `!!prerender-loader?string&entry=${file}!src/template.html`,
      template: "./src/template.html",
      filename: `${name}.html`,
      inject: false
    })
);

module.exports = {
  entry: pages,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [...htmls]
};
