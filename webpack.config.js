module.exports = {
  entry: [
    './client/src/index.js'
  ],
  output: {
    path: __dirname + '/client',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react','es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}

