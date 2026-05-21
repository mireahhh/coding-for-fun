const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const htmlPages = require("./webpack.pages.js");

const webpack = require("webpack");
const path = require("path");

class DuplicateNotFoundAs404Plugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap("DuplicateNotFoundAs404Plugin", (compilation) => {
      const fs = require("fs");
      const path = require("path");
      const outDir = compilation.outputOptions.path;
      const source = path.join(outDir, "pages", "notFound.html");
      const target = path.join(outDir, "404.html");

      if (fs.existsSync(source)) {
        fs.copyFileSync(source, target);
      }
    });
  }
}

module.exports = {
  entry: {
    index: "./src/javascripts/index.js",
    landing: "./src/javascripts/pages/landing.js",
    handbook: "./src/javascripts/pages/handbook.js",
    gallery: "./src/javascripts/pages/gallery.js",
    module: "./src/javascripts/pages/module.js",
    tutorial: "./src/javascripts/pages/tutorial.js",
    work: "./src/javascripts/pages/work.js",
    adding: "./src/javascripts/pages/adding.js",
    sandbox: "./src/javascripts/pages/sandbox.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(".", "docs"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(), ...htmlPages, new DuplicateNotFoundAs404Plugin()],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
};
