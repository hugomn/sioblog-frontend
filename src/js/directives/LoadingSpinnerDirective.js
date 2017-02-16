angular.module('app')
    .directive('loadingSpinnerDirective', ['$window', function($window) {
        return {
            scope: {
                width: '=?',
                height: '=?',
            },
            restrict: 'AC',
            template: '<svg class="spinner" ng-attr-width="{{width || \'60\'}}px" ng-attr-height="{{height || \'60\'}}px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
                '<circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
                '</svg>',
            link: function(scope, el, attrs) {
                el.addClass('loading-spinner');
            }
        }
    }]);
