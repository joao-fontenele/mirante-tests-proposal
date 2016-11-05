var config = {
  entry: [
    './css/styles.less',
    './main.js',
  ],
   output: {
    publicPath:'/',
    filename: 'index.js',
   },
   devtool: 'source-map',
   debug: 'true',
   devServer: {
    inline: true,
    port: 8080,
   },
   module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      }
    ]
  }
}

module.exports = config;
