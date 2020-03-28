const { PostMeta } = require("./PostMeta");

const path = require("path");
const { dirToEntries } = require("./dirToEntries");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { readFileSync } = require("fs");
const VirtualModulePlugin = require("virtual-module-webpack-plugin");

const PAGE_ENTRIES = dirToEntries("./src/pages");
const POST_ENTRIES = dirToEntries("./src/posts");

const POSTS_META = PostMeta(POST_ENTRIES);
const pageTmpl = ({ name, file, slug, isDev }) =>
  new HtmlWebpackPlugin({
    template: isDev ? "./src/template.html" : `!!prerender-loader?string&entry=${file}!src/template.html`,
    filename: `${slug || name}.html`,
    inject: isDev,
    chunks: [name],
  });

const PAGES_HTML = (isDev) => Object.entries(PAGE_ENTRIES).map(([name, file]) => pageTmpl({ name, file, isDev }));
const POSTS_HTML = (isDev) =>
  Object.entries(POSTS_META).map(([name, meta]) => pageTmpl({ name, slug: meta.matter.slug, file: meta.path, isDev }));

module.exports = (env, argv) => ({
  entry: {
    ...PAGE_ENTRIES,
    ...dirToEntries("./src/posts", (f) => f.replace(/\.md$/, ".js")),
  },
  bail: true,
  devServer: {
    hot: true,
  },
  resolveLoader: {
    alias: {
      "posts-meta": "./loaders/posts-meta.js",
    },
  },
  resolve: {
    alias: {
      "posts.meta": path.resolve(`./src/posts.meta`),
    },
    modules: ["node_modules", "src", "src/styles", "src/layout"],
  },
  module: {
    rules: [
      {
        test: /\.meta$/,
        use: "posts-meta",
      },
      {
        test: /\.md$/i,
        use: "raw-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new VirtualModulePlugin({
      moduleName: `./src/posts.meta`,
      contents: "",
    }),
    new VirtualModulePlugin({
      moduleName: `./src/posts/data.json`,
      contents: JSON.stringify({ index: Object.keys(POST_ENTRIES), meta: POSTS_META }),
    }),
    new webpack.HotModuleReplacementPlugin({}),
    ...Object.entries(POST_ENTRIES).map(
      ([post, filePath]) =>
        new VirtualModulePlugin({
          moduleName: `./src/posts/${post}.js`,
          contents: [["__POST__", post]].reduce(
            (p, [k, v]) => p.replace(new RegExp(k, "g"), v),
            readFileSync("./genPosts.js").toString()
          ),
        })
    ),

    new webpack.DefinePlugin({
      SC_DISABLE_SPEEDY: true,
    }),
    ...PAGES_HTML(argv.mode !== "production"),
    ...POSTS_HTML(argv.mode !== "production"),
  ],
});
