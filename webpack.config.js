const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.js", "./src/style/main.scss"],
  output: {
    path: path.join(__dirname, "docs"),
    // publicPath: '/dist/',
    filename: "bundle.js",
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src/"),
      "@Template": path.resolve(__dirname, "src/components/Template/"),
      "@Organisms": path.resolve(__dirname, "src/components/Organisms/"),
      "@Molecules": path.resolve(__dirname, "src/components/Molecules/"),
      "@Atoms": path.resolve(__dirname, "src/components/Atoms/"),
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  plugins: [
    new ManifestPlugin({
      fileName: "./manifest/manifest.json",
      seed: {
        name: "Kim's portfolio",
        short_name: "Kimyongkuk portfolio",
        background_color: "#ffbcbc",
        start_url: "/",
      },
    }),
    new HtmlWebpackPlugin({
      title: "Resume",
      manifest: "./manifest/manifest.json",
      template: path.join(__dirname, "./src/index.html"),
      inject: true,
      showErrors: true,
      cache: true, //변경된경우에
      filename: path.join(__dirname, "./docs/index.html"),
      meta: {
        charset: {
          charset: "utf-8",
        },
        viewport: "width=device-width, initial-scale=1",
      },
    }),
    new VueLoaderPlugin(),
  ],
  target: "web",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules)|(docs)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.svg$/,
        loader: "file-loader",
      },
      {
        test: /\.mp4$/,
        loader: "file-loader",
      },
    ],
  },
  // devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    port: 8000,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },
};
