module.exports = {
  entry: './src/formulon.js',
  output: {
    path: './lib',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader'
      }
    ]
  }
}
