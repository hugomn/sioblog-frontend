'use strict';

beforeEach(function() {
        module('app', function($provide, $translateProvider) {
            $provide.factory('customLoader', function($q) {
                return function() {
                    var deferred = $q.defer();
                    deferred.resolve({});
                    return deferred.promise;
                };
            });
            $translateProvider.useLoader('customLoader');
        });
    }
);
