// Karma configuration
// Generated on Wed Aug 05 2015 01:38:24 GMT-0300 (BRT)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'dist/',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'libs/jquery/jquery/dist/jquery.js',
            'libs/angular/angular/angular.js',
            'libs/angular/angular-mocks/angular-mocks.js',
            'libs/angular/angular-animate/angular-animate.js',
            'libs/angular/angular-aria/angular-aria.js',
            'libs/angular/angular-cookies/angular-cookies.js',
            'libs/angular/angular-messages/angular-messages.js',
            'libs/angular/angular-resource/angular-resource.js',
            'libs/angular/textAngular/dist/textAngular-sanitize.min.js',
            'libs/angular/angular-touch/angular-touch.js',
            'libs/angular/angular-ui-router/release/angular-ui-router.js',
            'libs/angular/ngstorage/ngStorage.js',
            'libs/angular/angular-bootstrap/ui-bootstrap-tpls.js',
            'libs/angular/oclazyload/dist/ocLazyLoad.js',
            'libs/angular/angular-translate/angular-translate.js',
            'libs/angular/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'libs/angular/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
            'libs/angular/angular-translate-storage-local/angular-translate-storage-local.js',
            'libs/angular/angular-local-storage/dist/angular-local-storage.js',
            'libs/angular/ngInfiniteScroll/build/ng-infinite-scroll.js',
            'libs/angular/angular-dynamic-locale/dist/tmhDynamicLocale.js',
            'libs/angular/angular-google-maps/dist/angular-google-maps.min.js',
            'libs/angular/angular-simple-logger/dist/angular-simple-logger.min.js',
            'libs/angular/angular-scrolltofixed/dist/angular-scrolltofixed.min.js',
            'libs/angular/angular-smooth-scroll/angular-smooth-scroll.min.js',
            '../bower_components/rangy/rangy-core.js',
			'../bower_components/rangy/rangy-selectionsaverestore.js',
            'libs/angular/ngMeta/dist/ngMeta.min.js',
            'libs/angular/angulartics/dist/angulartics.min.js',
            'libs/angular/angulartics-google-analytics/dist/angulartics-ga.min.js',
            'libs/angular/angulartics-facebook-pixel/dist/angulartics-facebook-pixel.min.js',
            'libs/angular/angular-aside/dist/js/angular-aside.min.js',
            'libs/angular/angular-toastr/dist/angular-toastr.tpls.min.js',
            'js/config.env.js',
            'libs/angular/angular-facebook/lib/angular-facebook.js',
            'js/*.js',
            { pattern: 'js/controllers/*.js', included: true, served: true },
            'js/directives/*.js',
            'js/filters/*.js',
            'js/services/*.js',
            '../test/unit/mock/*.js',
            '../test/unit/config.js',
            '../test/unit/**/*Spec.js'
        ],

        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'js/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: '../test/coverage/',
            subdir: '.',
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-spec-reporter'
        ],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}
