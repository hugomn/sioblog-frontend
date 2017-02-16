app.controller('HeaderController', ['AuthService', '$scope', '$state', 'screenSize',
    function(AuthService, $scope, $state, screenSize) {
    angular.element("#preloader").remove();
    $scope.mobile = screenSize.on('xs', function(match) {
        $scope.mobile = match;
    });
}]);
