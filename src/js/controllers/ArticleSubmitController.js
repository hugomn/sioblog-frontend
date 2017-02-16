app.controller('ArticleSubmitController', ['ApiService', 'AuthService', '$rootScope', '$scope', '$state', 'toastr',
    function(ApiService, AuthService,$rootScope, $scope, $state, toastr) {
        $scope.isLoading = false;
        $scope.isSubmitting = false;
        $scope.article = {};

        $scope.submit = function() {
            $scope.isSubmitting = true;
            if ($scope.form.$valid) {
                ApiService.articles.save($scope.article).then(function(article) {
                    $scope.isSubmitting = false;
                    $state.go('app.article.show', { id: article.id });
                    toastr.success('Article created successfully!');
                }, function(error) {
                    $scope.isSubmitting = false;
                    toastr.error(error.data.message);
                });
            } else {
                $scope.isSubmitting = false;
                toastr.error('Please check your form.');
            }
        };
    }
]);
