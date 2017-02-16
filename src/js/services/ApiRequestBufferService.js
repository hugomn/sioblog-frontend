app.factory('ApiRequestBufferService', ['$injector', function($injector) {
    var buffer = [];
    var $http;

    function retryHttpRequest(config, deferred) {
        function successCallback(response) {
            deferred.resolve(response);
        }

        function errorCallback(response) {
            deferred.reject(response);
        }
        $http = $http || $injector.get('$http');
        $http(config).then(successCallback, errorCallback);
    }
    return {
        append: function(config, deferred) {
            buffer.push({
                config: config,
                deferred: deferred
            });
        },

        rejectAll: function(reason) {
            if (reason) {
                for (var i in buffer) {
                    buffer[i].deferred.reject(reason);
                }
            }
            buffer = [];
        },

        retryAll: function(configUpdater) {
            var updater = configUpdater || function(config) {return config;};
            for (var i in buffer) {
                retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
            }
            buffer = [];
        }
    };
}]);
