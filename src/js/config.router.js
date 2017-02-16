'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
    function($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get('$state');
            $state.go('app.404', null, { location: false });
        });

        $stateProvider.state('app', {
            abstract: true,
            templateUrl: 'tpl/app.html',
            resolve: load(['js/controllers/AsideController.js', 'js/controllers/HeaderController.js', 'matchMedia']),
        })

            .state('app.index', {
                url: '/',
                controller: 'IndexController',
                templateUrl: 'tpl/index.html',
                data: { headerTransparent: true, asideHidden: true, isPublic: true },
                meta: {
                    'title': 'sioblog.com',
                    'titleSuffix': ' - Corporative blog'
                },
                resolve: load([
                    'js/controllers/IndexController.js',
                    'css/controllers/index.css',
                    ]),
            })

            .state('app.404', {
                url: '/404',
                templateUrl: 'tpl/404.html',
                data: { headerHidden: false, isPublic: true }
            })

            .state('app.article', {
                abstract: true,
                template: '<ui-view/>',
                url: '/article'
            })

                .state('app.article.submit', {
                    url: '/submit',
                    controller: 'ArticleSubmitController',
                    templateUrl: 'tpl/article.submit.html',
                    data: { headerTransparent: false, headerFixed: false , isPublic: true},
                    resolve: load([
                        'js/controllers/ArticleSubmitController.js', 'toastr'])
                })

                // Should be the last route to avoid conflict
                .state('app.article.show', {
                    url: '/:id',
                    controller: 'ArticleShowController',
                    templateUrl: 'tpl/article.show.html',
                    data: { headerTransparent: false, headerFixed: false , isPublic: true},
                    resolve: load(['js/controllers/ArticleShowController.js']),
                });

        function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                    function($ocLazyLoad, $q) {
                        var deferred = $q.defer();
                        var promise = false;
                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                        if (!promise) {
                            promise = deferred.promise;
                        }
                        angular.forEach(srcs, function(src) {
                            promise = promise.then(function() {
                                if (JQ_CONFIG[src]) {
                                    return $ocLazyLoad.load(JQ_CONFIG[src]);
                                }
                                return $ocLazyLoad.load(src);
                            });
                        });
                        deferred.resolve();
                        return callback ? promise.then(function() {
                            return callback();
                        }) : promise;
                    }
                ]
            }
        }


    }
]);
