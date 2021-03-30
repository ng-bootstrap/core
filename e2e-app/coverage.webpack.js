module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'coverage-istanbul-loader',
        options: { esModules: true },
        enforce: 'post',
        include: require('path').join(__dirname, '..', 'src'),
        exclude: [
          /\.(e2e|spec|po)\.ts$/,
          /node_modules/,
          /(ngfactory|ngstyle)\.js/
        ]
      }
    ]
  }
};
