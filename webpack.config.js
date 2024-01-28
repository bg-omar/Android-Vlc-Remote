// npm install crypto crypto-browserify node-polyfill-webpack-plugin --legacy-peer-deps

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  plugins: [
    new NodePolyfillPlugin()
  ],
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  },
  target: 'node'
};
