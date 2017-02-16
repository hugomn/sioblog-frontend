// config
var app =
    angular.module('app')
    .run(['$rootScope', '$state', '$stateParams', '$document', 'AuthService', 'localStorageService', 'ngMeta', '$location',
        function($rootScope, $state, $stateParams, $document, AuthService, localStorageService, ngMeta, $location) {

        // Init main settings
        $rootScope.app = {
            name: 'sioblog.com',
            version: '1.0.0',
            color: {
                primary: 'BA1E20',
                secundary: '#482167',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#363636',
                black: '#1c2b36'
            },
            isLoading: false,
            isLoadingState: true,
            settings: {
                default: {
                    headerHidden: false,
                    headerFixed: true,
                },
                headerFixed: true,
                headerHidden: false,
            }
        };

        // Init auth settings
        $rootScope.auth = {
            token: {},
            user: {},
            isAuthenticated: false,
            getToken: function() {
                return $rootScope.auth.token.access_token;
            }
        };

        // Check if user is logged
        AuthService.checkStorage();

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.app.isLoadingState = true;
            if (toState.data && toState.data.hasOwnProperty('headerHidden')) {
                $rootScope.app.settings.headerHidden = toState.data.headerHidden;
            } else {
                $rootScope.app.settings.headerHidden = $rootScope.app.settings.default.headerHidden;
            }
            if (toState.data && toState.data.hasOwnProperty('headerFixed')) {
                $rootScope.app.settings.headerFixed = toState.data.headerFixed;
            } else {
                $rootScope.app.settings.headerFixed = $rootScope.app.settings.default.headerFixed;
            }
            if (toState.data && toState.data.hasOwnProperty('isPublic') && toState.data.isPublic == false) {
               if(!$rootScope.auth.isAuthenticated) {
                   event.preventDefault(); // stop current execution
                //    $state.go('app.login', {'toState': toState.name, 'toParams': toParams} ); // go to login
               }
            }
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
            event.targetScope.$watch('$viewContentLoaded', function() {
                $rootScope.app.isLoadingState = false;
            });
            ngMeta.setTag('canonical', $state.href($state.current.name, $state.params, {absolute: true}));
            ngMeta.setTag('og:url', $state.href($state.current.name, $state.params, {absolute: true}));
        });
        ngMeta.init();

    }])
    .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function($controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;
        }
    ])

.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');
}])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('ApiInterceptorService');
    $httpProvider.interceptors.push('HttpInterceptorService');
}])

.config(['ngMetaProvider', function(ngMetaProvider) {
    var description = 'Sioblog.com blog!';
    ngMetaProvider.useTitleSuffix(true);
    ngMetaProvider.setDefaultTitleSuffix(' | sioblog.com');
    ngMetaProvider.setDefaultTitle('sioblog.com');
    ngMetaProvider.setDefaultTag('title', 'sioblog.com - News and content');
    ngMetaProvider.setDefaultTag('description', description);
    ngMetaProvider.setDefaultTag('keywords', 'blogging, development, php, js');
    ngMetaProvider.setDefaultTag('robots', 'index, follow');
    ngMetaProvider.setDefaultTag('image', 'http://www.gruender.de/wp-content/uploads/2016/08/SIO-AG.jpg');
    ngMetaProvider.setDefaultTag('site', 'sioblog.com');
    ngMetaProvider.setDefaultTag('type', 'website');
    ngMetaProvider.setDefaultTag('url', 'https://www.sioblog.com');
}]);
