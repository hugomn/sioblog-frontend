app.factory('ApiInterceptorService', ['$rootScope', '$q', '$injector', 'ApiRequestBufferService',
    function($rootScope, $q, $injector, requestBuffer) {
        var AuthService;
        var $state;

        var refreshSuccess = function() {
            $rootScope.$broadcast('auth:refreshed');
            requestBuffer.retryAll();
        };

        var refreshError = function() {
            AuthService = AuthService || $injector.get('AuthService');
            AuthService.logout().then(function() {
                $state = $state || $injector.get('$state');
                // $state.go('app.login');
            });
        };

        return {
            request: function(config) {
                if ($rootScope.auth.isAuthenticated) {
                    config.headers.authorization = 'Bearer ' + $rootScope.auth.getToken();
                }
                return config;
            },
            responseError: function(response) {
                if (response.status === 401) {
                    var deferred = $q.defer();
                    requestBuffer.append(response.config, deferred);
                    $rootScope.$broadcast('auth:unauthorized', response);
                    AuthService = AuthService || $injector.get('AuthService');
                    AuthService.refreshToken().then(refreshSuccess, refreshError);
                    return deferred.promise;
                }
                return $q.reject(response);
            }
        }
    }
]);
