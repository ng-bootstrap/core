// Configuration used for local testing and GitHub CI

const reporters = process.env.CI ? ['dots'] : ['progress'];
const browsers = process.env.CI ? ['ChromeHeadlessNoSandbox'] : ['ChromeNoExtensions'];

module.exports = function (config) {
  config.set({
    basePath: '',
    files: ['../node_modules/bootstrap/dist/css/bootstrap.min.css', '../src/test/test-styles.css'],
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '..', 'coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'json' },
        { type: 'lcovonly' }
      ],
      fixWebpackSourcePaths: true
    },
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      },
      ChromeNoExtensions: {
        base: 'Chrome',
        flags: ['--disable-extensions']
      },
      IENoExtensions: {
        base: 'IE',
        flags: ['-extoff', '-k']
      }
    },
    reporters,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers,
    singleRun: false,
    restartOnFileChange: true,
    browserNoActivityTimeout: 20000
  });
};
