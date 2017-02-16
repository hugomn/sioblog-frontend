'use strict';

describe('AuthService', function() {

    var $q, $rootScope, AuthService, ApiService;
    var userMock = { username: "hugomn", name: "Hugo Magalhães", id: 1, firstname: "Hugo", lastname: "Magalhães", avatar: "https://static.meuingresso.com/uploads/user/avatar/5a06c85eb887324680bf8723ef52791642c14f93.jpeg" };
    var tokenMock = { access_token: "NjU2MzI5NTgyZTgyYWM4Mzg3ZjhlZTEwZDEzNDBjYjAwYzgyZDA0YjVkMDhkZmFkYmJjZWZmZmE0YzQ1Y2I0Zg", expires_in: 3600, token_type: "bearer", scope: "user", refresh_token: "MjdmM2ExODI5MTVkMWViNzMwYTVhNjk2YTgxZWNjZTM3NTMyZGRiNDViNjVhMjAyYjI4ZWNjNjY2MjQxMzg1NQ" };

    beforeEach(function() {
        module('app');

        module(function($provide) {
            $provide.value('ApiService', {
                users: {
                    login: function() {},
                    loginFacebook: function() {},
                    me: function() {}
                }
            });
        });

        inject(function(_$q_, _$rootScope_, _AuthService_, _ApiService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            AuthService = _AuthService_;
            ApiService = _ApiService_;
        });

        spyOn(ApiService.users, 'login').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(tokenMock);
            return deferred.promise;
        });

        spyOn(ApiService.users, 'me').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(userMock);
            return deferred.promise;
        });
    });

});
