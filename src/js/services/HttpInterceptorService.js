app.factory('HttpInterceptorService', ['$q', '$rootScope', '$injector',
    function($q, $rootScope, $injector) {
        $rootScope.showSpinner = false;
        $rootScope.http = null;
        return {
            'request': function(config) {
                $rootScope.app.isLoading = true;
                return config || $q.when(config);
            },
            'requestError': function(rejection) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.app.isLoading = false;
                }
                return $q.reject(rejection);
            },
            'response': function(response) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.app.isLoading = false;
                }
                return response || $q.when(response);
            },
            'responseError': function(rejection) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.app.isLoading = false;
                }
                return $q.reject(rejection);
            }
        }
    }
]);
