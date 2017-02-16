app.controller('IndexController', ['$rootScope', '$scope', '$state', 'ApiService', 'screenSize',
        function($rootScope, $scope, $state, ApiService, screenSize) {
    $scope.isLoadingArticles = true;
    $scope.articles = [];

    ApiService.articles.query({ limit: 8 }).then(function(response) {
        $scope.articles = response.data;
        $scope.links = response.links;
        $scope.isLoadingArticles = false;
    });

    $scope.loadMore = function() {
        if (!$scope.isLoadingArticles && $scope.articles.length && $scope.links.next) {
            $scope.isLoadingArticles = true;
            ApiService.articles.get({}, $scope.links.next).then(function(response) {
                $scope.isLoadingArticles = false;
                var items = response.data;
                for (var i = 0; i < items.length; i++) {
                    $scope.articles.push(items[i]);
                }
                $scope.links = response.links;
            });
        }
    };
}]);
