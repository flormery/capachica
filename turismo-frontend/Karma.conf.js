// karma.conf.js
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      jasmine: { /* opcional config de Jasmine */ },
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/capachica'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        // <-- Cambiado de "icov" a "lcov"
        { type: 'lcov' }
      ]
    },
  });
};
