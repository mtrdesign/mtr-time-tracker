module.exports = function(config) {
  config.set({

    basePath: 'public/components/',

    files: [
      'bower/angular/angular.js',
      'bower/angular-environment/dist/angular-environment.min.js',
      'bower/angular-cookies/angular-cookies.js',
      'bower/angular-route/angular-route.js',
      'bower/angular-jwt/dist/angular-jwt.min.js',
      'bower/angular-moment/angular-moment.min.js',
      'bower/angular-mocks/angular-mocks.js',
      'bower/jquery/dist/jquery.min.js',
      'bower/moment/min/moment.min.js',
      'bower/datetimepicker/build/jquery.datetimepicker.full.min.js',
      'bower/jquery-mask-plugin/dist/jquery.mask.min.js',
      'app/js/base.js',
      'app/angular/init.js',
      'app/angular/filters.js',
      'app/angular/services/*.js',
      'app/angular/controllers/*.js',
      'app/angular/tests/**/*.js'
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
      outputFile: 'app/angular/tests/output/unit.xml',
      suite: 'unit'
    }

  });
};