const HtmlWebpackPlugin = require("html-webpack-plugin");

const { readdirSync } = require("fs");

const hasFlag = name => process.argv.some(arg => arg === "--" + name);
const HOT_MODE = hasFlag("hot");

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
      template: HOT_MODE ? "./src/template.html" : `!!prerender-loader?string&entry=${file}!src/template.html`,
      filename: `${name}.html`,
      compile: true,
      inject: HOT_MODE
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
