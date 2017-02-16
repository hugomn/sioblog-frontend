angular.module('app')
    .factory('ApiService', ['$q', '$http' ,'$rootScope', '$resource', 'ENV',
                    function($q, $http, $rootScope, $resource, ENV) {
        var cancellableResources = [];
        var api = {
            articles: {
                delete: function(id) {
                    return createDeleteResource(getUrl('/articles/' + id));
                },
                get: function(id) {
                    return createGetResource(getUrl('/articles/' + id));
                },
                query: function(params, url) {
                    return createCancelableLinkedResource(url || getUrl('/articles'), params);
                },
                queryAll: function(params) {
                    return createGetAllResource(getUrl('/articles'), params);
                },
                save: function(article) {
                    return createPostResource(getUrl('/articles'), article);
                },
                update: function(article) {
                    return createPatchResource(getUrl('/articles/' + article.id), article);
                },
            },
            users: {
                get: function(id) {
                    return createGetResource(getUrl('/users/' + id));
                },
                getAll: function(params, url) {
                    return createCancelableLinkedResource(url || getUrl('/users'), params);
                },
                login: function(username, password) {
                    var params = {
                        'client_id': ENV.api.clientId,
                        'client_secret': ENV.api.clientSecret,
                        'grant_type': 'password',
                        'scope': 'user',
                        'username': username,
                        'password': password
                    };
                    return createGetResource(getUrl('/oauth/v2/token', false), params);

                },
                me: function() {
                    return createGetResource(getUrl('/users/me'));
                },
                refreshToken: function(refreshToken) {
                    var params = {
                        'client_id': ENV.api.clientId,
                        'client_secret': ENV.api.clientSecret,
                        'grant_type': 'refresh_token',
                        'scope': 'user',
                        'refresh_token': refreshToken
                    };
                    return createGetResource(getUrl('/oauth/v2/token', false), params);
                },
                save: function(id, params) {
                    return createPatchResource(getUrl('/users/' + id), params);
                },
                signup: function(name, email, password) {
                    var params = { 'name': name, 'email': email, 'password': password };
                    return createPostResource(getUrl('/users'), params);
                },
            },
        };

        var createDeleteResource = function(url, params) {
            params = typeof params !== 'undefined' ? params : {};
            var deferred = $q.defer();
            var Resource = $resource(url);
            var resource = Resource.delete(params, function() {
                deferred.resolve(resource)
            }, function(error) {
                deferred.reject(error)
            });
            return deferred.promise;
        }

        var createGetAllResource = function(url, params) {
            var deferred = $q.defer();
            var data = [];
            createLinkedResource(url, params).then(function(response) {
                if (response.links.next) {
                    createGetAllResource(response.links.next, params).then(function(data) {
                        deferred.resolve(response.data.concat(data));
                    });
                } else {
                    deferred.resolve(response.data);
                }
            }, function(error) {
                deferred.reject(error)
            });
            return deferred.promise;
        }

        var createGetResource = function(url, params) {
            var deferred = $q.defer();
            var Resource = $resource(url);
            var resource = Resource.get(params || {}, function() {
                deferred.resolve(resource)
            }, function(error) {
                deferred.reject(error)
            });
            return deferred.promise;
        }

        var createLinkedResource = function(url, params) {
            var deferred = $q.defer();
            var Resource = $resource(url);
            var resource = Resource.query(params || {}, function(data, headers) {
                deferred.resolve({'data': resource, 'links': parseLinkHeader(headers('Link')), 'total': headers('X-Total-Count')});
            }, function(error) {
                deferred.reject(error)
            });
            return deferred.promise;
        }

        var createCancelableLinkedResource = function(url, params, data, method) {
            var canceller;
            if (cancellableResources[url]) {
                canceller = cancellableResources[url];
                canceller.resolve("Requisição cancelada");
            }
            canceller = $q.defer();
            cancellableResources[url] = canceller;
            params = typeof params !== 'undefined' ? params : {};
            var deferred = $q.defer();
            $http({
                method: method || 'GET',
                url: url,
                timeout: canceller.promise,
                params: params,
                data: data,
            }).then(function(response) {
               deferred.resolve({'data': response.data, 'links': parseLinkHeader(response.headers('Link')), 'total': response.headers('X-Total-Count')});
            }, function(error) {
               deferred.reject(error)
            });
            return deferred.promise;
        }

        var createPatchResource = function(url, params) {
            var deferred = $q.defer();
            var Resource = $resource(url, null, { 'patch': { method:'PATCH' } });
            var resource = Resource.patch(params, function() {
                deferred.resolve(resource);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        var createPostResource = function(url, params) {
            var deferred = $q.defer();
            var Resource = $resource(url);
            var resource = Resource.save(params, function() {
                deferred.resolve(resource);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        var createPutResource = function(url, params) {
            var deferred = $q.defer();
            var Resource = $resource(url, null, { 'put': { method:'PUT' } });
            var resource = Resource.put(params, function() {
                deferred.resolve(resource);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        var parseLinkHeader = function(header) {
            if (header.length === 0) { throw new Error("input must not be of zero length"); }
            var parts = header.split(',');
            var links = {};
            for (var i = 0; i < parts.length; i++) {
                var section = parts[i].split(';');
                if (section.length !== 2) { throw new Error("section could not be split on ';'"); }
                var url = section[0].replace(/<(.*)>/, '$1').trim();
                var name = section[1].replace(/rel="(.*)"/, '$1').trim();
                links[name] = url;
            }
            return links;
        }

        var queryResource = function(url, params) {
            var deferred = $q.defer();
            var Resource = $resource(url);
            var resource = Resource.query(params || {}, function() {
                deferred.resolve(resource)
            }, function(error) {
                deferred.reject(error)
            });
            return deferred.promise;
        }

        var getUrl = function(url, includeVersion) {
            var base = "";
            if (typeof includeVersion === 'undefined' || includeVersion) {
                base = ENV.api.baseUrl + ENV.api.version;
            } else {
                base = ENV.api.baseUrl;
            }
            return base + url;
        }

        return api;
    }])
