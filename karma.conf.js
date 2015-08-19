module.exports = function(config){
  config.set({

    basePath : './',
    preprocessors: {
        'app/*.html': ['ng-html2js']
    },
    
    ngHtml2JsPreprocessor: {
    	stripPrefix: 'app/'
    },
    
    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/view*/**/*.js',
      'app/*.module.js',
      'app/app.js',
      'app/*.directive.js',
      'app/*.service.js',
      'app/*.spec.js',
      'app/*.html'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
             'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
