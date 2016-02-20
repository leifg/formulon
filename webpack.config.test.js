/**
 * Export test configuration
 */

module.exports = {
  entry: './test/index.js',
  output: {
    filename: './lib/bundle.test.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader'
      },
      {
        test: /\.test\/index.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'mocha-loader']
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }
};
