app.controller('AsideController', ['ApiService', 'AuthService', '$scope',
    function(ApiService, AuthService, $scope) {
        if (AuthService.isAdmin()) {
            ApiService.admin.taskscount.get().then(function(data) {
                $scope.data = data;
            });
        }
}]);
