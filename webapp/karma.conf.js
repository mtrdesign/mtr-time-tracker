module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      'public/resources/javascripts/vendor.js',
      'public/resources/bower/angular-moment/angular-moment.min.js',
      'public/resources/javascripts/angular.js',
      
      'tests/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'tests/output/unit.xml',
      suite: 'unit'
    }

  });
};