const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PnpPlugin = require("pnp-webpack-plugin");

const isProductionBuild = process.env.ENV !== "development";

module.exports = {
  target: "es6",
  mode: !isProductionBuild ? 'development' : 'production',
  entry: './src/components/index.tsx', // Where your app entrypoint is, all modules import chains start here.
  output: {
    filename: 'bundle.[contenthash].js', // filename to output bundled JS to.
    path: path.resolve(__dirname, 'dist'), // the path to output the file to.
    publicPath: 'auto' // What path should be exposed as public
  },
  // Respect our source maps, so we can debug from in TS files in the browser, rather than bundle.
  devtool: 'inline-source-map',
  module: {
    rules: [
      // Look for inline sourcemaps and extract them.
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        },
        {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        },
    ]
  },
  resolve: {
    // What file extensions should be bundled?
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    // This tells Webpack how to resolve Yarn 2 dependencies, as they aren't
    // located in `node_modules`.
    plugins: [PnpPlugin],
  },
  // This tells Webpack how to resolve loaders for Yarn 2 as well.
  resolveLoader: {
    plugins: [PnpPlugin.moduleLoader(module)],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "components", "index.html"),
    })
  ]
}