module.exports = {
    default: {
        src: [
            'dist/libs/jquery/jquery/dist/jquery.js',
            'dist/libs/jquery/bootstrap/dist/js/bootstrap.js',
            'dist/libs/angular/angular/angular.js',
            'dist/libs/angular/angular-animate/angular-animate.js',
            'dist/libs/angular/angular-aria/angular-aria.js',
            'dist/libs/angular/angular-cookies/angular-cookies.js',
            'dist/libs/angular/angular-messages/angular-messages.js',
            'dist/libs/angular/angular-resource/angular-resource.js',
            'dist/libs/angular/ngstorage/ngStorage.js',
            'dist/libs/angular/angular-local-storage/dist/angular-local-storage.js',
            'dist/libs/angular/textAngular/dist/textAngular-sanitize.min.js',
            'dist/libs/angular/angular-touch/angular-touch.js',
            'dist/libs/angular/angular-ui-router/release/angular-ui-router.js',
            'dist/libs/angular/angular-bootstrap/ui-bootstrap-tpls.js',
            'dist/libs/angular/oclazyload/dist/ocLazyLoad.js',
            'dist/libs/angular/ngMeta/dist/ngMeta.min.js',
            'dist/js/config.env.js',
            'src/js/*.js',
            'src/js/directives/*.js',
            'src/js/services/*.js',
            'src/js/filters/*.js'
        ],
        dest: 'dist/js/app.src.js'
    }
};
