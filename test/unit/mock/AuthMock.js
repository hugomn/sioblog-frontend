(function() {

    'use strict';

    angular.module('app.auth.mock', []);

    angular.module('app.auth.mock').factory('authMock', ['$q', '$rootScope', function($q, $rootScope) {
        var authMock = {};

        return authMock;
    }]);

})();
