app.controller('ArticleShowController', ['AuthService', '$q', '$rootScope', '$scope', '$state', '$stateParams', 'ApiService', 'ngMeta',
    function(AuthService, $q, $rootScope, $scope, $state, $stateParams, ApiService, ngMeta) {
        $scope.isLoading = true;
        ApiService.articles.get($stateParams.id, true).then(function(article) {
            $scope.isLoading = false;
            $scope.article = article;
            ngMeta.setTitle(article.title);
            ngMeta.setTag('description', htmlToPlaintext(article.content.slice(0, 160)));
        }, function(error) {
            $state.go('app.404', null, { location: false });
        });

    }
]);

function htmlToPlaintext(text) {
  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
}
