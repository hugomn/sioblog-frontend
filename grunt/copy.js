module.exports = {
    libs:{
        files:[
            {
                src:  [
                    'angular/angular.js',
                    'angular-animate/angular-animate.js',
                    'angular-aria/angular-aria.js',
                    'angular-cookies/angular-cookies.js',
                    'angular-messages/angular-messages.js',
                    'angular-resource/angular-resource.js',
                    'angular-sanitize/angular-sanitize.js',
                    'angular-touch/angular-touch.js',
                    'angular-bootstrap/ui-bootstrap-tpls.js',
                    'angular-ui-router/release/**',
                    'angular-skycons/angular-skycons.min.js',
                    'oclazyload/dist/**',
                    'textAngular/dist/textAngular-sanitize.min.js',
                    'rangy/rangy-core.min.js',
                    'rangy/rangy-selectionsaverestore.min.js',
                    'textAngular/dist/textAngular.js',
                    'textAngular/dist/textAngularSetup.js',
                    'textAngular/dist/textAngular.css',
                    'angular-slugify/angular-slugify.js',
                    'angular-local-storage/dist/angular-local-storage.js',
                    'angular-media-queries/match-media.js',
                    'ngstorage/ngStorage.js',
                    'ngMeta/dist/ngMeta.min.js'
                ],
                dest: 'dist/libs/angular',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'jquery/dist/jquery.js',
                    'bootstrap/dist/**',
                    'plugins/integration/bootstrap/3/**',
                    'plugins/integration/bootstrap/images/**',
                    'jquery_appear/jquery.appear.js',
                ],
                dest: 'dist/libs/jquery',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'animate.css/animate.css',
                    'font-awesome/css/**',
                    'simple-line-icons/css/**',
                ],
                dest: 'dist/libs/assets',
                cwd:  'bower_components',
                expand: true
            },
            { src: '**', cwd: 'bower_components/bootstrap/dist/fonts', dest: 'dist/fonts', expand: true },
            { src: '**', cwd: 'bower_components/font-awesome/fonts', dest: 'dist/fonts', expand: true },
            { src: '**', cwd: 'bower_components/simple-line-icons/fonts', dest: 'dist/fonts', expand: true },
        ]
    },
    src: {
        files: [
            { src: "**", cwd: 'src/fonts',   dest: "dist/fonts", expand: true },
            { src: "**", cwd: 'src/l10n',    dest: "dist/l10n", expand: true },
            { src: "**", cwd: 'src/img',     dest: "dist/img", expand: true },
            { src: "**", cwd: 'src/tpl',     dest: "dist/tpl", expand: true },
            { src: 'src/favicon.ico', dest: "dist/favicon.ico" },
            { src: 'src/favicon-32x32.png', dest: "dist/favicon-32x32.png" },
            { src: 'src/favicon-16x16.png', dest: "dist/favicon-16x16.png" },
        ]
    },
    dev: {
        files: [
            { src: "**", cwd: 'src/js', dest: "dist/js", expand: true },
            { src: 'src/index.html', dest : 'dist/index.html' },
        ]
    },
    prod: {
        files: [
            { src: "**", cwd: 'src/js/controllers', dest: "dist/js/controllers", expand: true },
            { src: 'src/index.min.html', dest : 'dist/index.html' },
            { src: 'robots.txt', dest : 'dist/robots.txt' },
        ]
    },

};
