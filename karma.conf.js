module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    client: {
      captureConsole: true,
      clearContext: false,
      jasmine: {
        random: false,
        timeoutInterval: 10000,
        failFast: true
      }
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false,
      jasmine: {
        random: false,
        timeoutInterval: 10000
      }
    },
    coverageReporter: {
      dir: './coverage/poso',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    browserNoActivityTimeout: 30000,
    browserDisconnectTolerance: 1
  });
};
