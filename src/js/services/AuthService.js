angular.module('app')
    .factory('AuthService', ['$rootScope', '$q', 'ApiService', 'ENV', 'localStorageService',
        function($rootScope, $q, ApiService, ENV, localStorageService) {
            var auth = {};

            auth.login = function(username, password) {
                var deferred = $q.defer();
                var error = function(error) {
                    auth.logout();
                    deferred.reject(error);
                };
                ApiService.users.login(username, password).then(function(token) {
                    auth.logUser(token);
                    auth.fetchUserData(token.access_token).then(function(user) {
                        auth.logUser(token, user, true);
                        deferred.resolve(user);
                    }, error);
                }, error);
                return deferred.promise;
            };


            auth.refreshToken = function() {
                var deferred = $q.defer();
                var error = function(error) {
                    deferred.reject(error);
                };
                ApiService.users.refreshToken($rootScope.auth.token.refresh_token).then(function(token) {
                    auth.logUser(token);
                    auth.fetchUserData(token).then(function(data) {
                        auth.logUser(token, data, true);
                        deferred.resolve(data);
                    }, error);
                }, error);
                return deferred.promise;
            };

            auth.signup = function(name, email, password) {
                var deferred = $q.defer();
                var error = function(error) {
                    deferred.reject(error);
                };
                ApiService.users.signup(name, email, password).then(function(user) {
                    ApiService.users.login(user.username, password).then(function(token) {
                        auth.logUser(token);
                        auth.fetchUserData(token).then(function(data) {
                            auth.logUser(token, data, true);
                            deferred.resolve(data);
                        }, error);
                    }, error);
                }, error);
                return deferred.promise;
            };

            auth.logUser = function(token, user, store) {
                $rootScope.auth.isAuthenticated = true;
                auth.updateToken(token);
                if (user) {
                    $rootScope.auth.user = user;
                    if (store) {
                        auth.storeUser(token, user);
                    }
                }
            }

            auth.updateUser = function(user) {
                $rootScope.auth.user = user;
                auth.storeUser($rootScope.auth.token, user);
            }

            auth.updateToken = function(token) {
                $rootScope.auth.token = token;
            };

            auth.logout = function() {
                var deferred = $q.defer();
                $rootScope.auth.token = {};
                $rootScope.auth.user = {};
                $rootScope.auth.isAuthenticated = false;
                auth.removeUserFromStorage();
                deferred.resolve();
                return deferred.promise;
            };

            auth.fetchUserData = function(token) {
                var deferred = $q.defer();
                var success = function(data) {
                    $rootScope.auth.user = data;
                    deferred.resolve(data);
                };
                var error = function(error) {
                    deferred.reject(error);
                };
                ApiService.users.me(token).then(success, error);
                return deferred.promise;
            };

            auth.storeUser = function(token, user) {
                return localStorageService.set(ENV.auth.storageKey, {
                    token: token,
                    data: user
                });
            };

            auth.removeUserFromStorage = function() {
                return localStorageService.remove(ENV.auth.storageKey);
            }

            auth.checkStorage = function() {
                if (localStorageService.get(ENV.auth.storageKey)) {
                    var userData = localStorageService.get(ENV.auth.storageKey);
                    auth.logUser(userData.token, userData.data, false);
                }
            };

            auth.isAuthenticated = function() {
                return $rootScope.auth.isAuthenticated;
            };

            return auth;
        }
    ]);
