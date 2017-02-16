app.controller('LoginController', ['AuthService', '$rootScope', '$scope', '$aside', '$state', '$stateParams', 'toastr',
    function(AuthService, $rootScope, $scope, $aside, $state, $stateParams, toastr) {
    $scope.authError = null;

    $scope.signup = function() {
        if ($scope.isAside) {
            createAsideInstance = $aside.open({
                templateUrl: 'tpl/signup.html',
                controller: 'SignupController',
                placement: 'right',
                size: 'lg',
                scope: angular.extend($rootScope, { 'isAside': true }),
                backdrop  : 'static',
                keyboard  : false
            });
            $scope.$dismiss('cancel');
        } else {
            $state.go('app.signup');
        }
    };

    $scope.resettingRequest = function() {
        if ($scope.isAside) {
            createAsideInstance = $aside.open({
                templateUrl: 'tpl/resetting.request.html',
                controller: 'ResettingRequestController',
                placement: 'right',
                size: 'lg',
                scope: angular.extend($rootScope, { 'isAside': true }),
                backdrop  : 'static',
                keyboard  : false
            });
            $scope.$dismiss('cancel');
        } else {
            $state.go('app.resetting.request');
        }
    };

    $scope.login = function() {
        AuthService.login($scope.user.email, $scope.user.password)
            .then(function(response) {
                toastr.success('Seja bem-vindo(a), ' + response.name + '!');
                $rootScope.$emit('user.authenticated');
                if ($scope.isAside) {
                    $scope.$dismiss('authenticated');
                } else {
                    $state.go($stateParams.toState, $stateParams.toParams);
                }
            }, function(error) {
                toastr.error('Dados inválidos, tente novamente.');
                AuthService.logout();
            });
    };

    $scope.loginFacebook = function() {
        AuthService.loginFacebook()
            .then(function(response) {
                toastr.success('Seja bem-vindo(a), ' + response.name + '!');
                $rootScope.$emit('user.authenticated');
                if ($scope.isAside) {
                    $scope.$dismiss('authenticated');
                } else {
                    $state.go($stateParams.toState, $stateParams.toParams);
                }
            }, function(error) {
                if (error.data && error.data.code == 400) {
                    toastr.error(error.data.message);
                } else {
                    toastr.error('Erro ao realizar o login com o facebook. Por favor, tente novamente em alguns instantes.');
                }
                AuthService.logout();
            });
    };
}]);
