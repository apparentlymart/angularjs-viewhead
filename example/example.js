
var app = angular.module('viewheadExample', ['ng', 'ngRoute', 'viewhead']);

app.config(
    function ($routeProvider) {
        $routeProvider.when(
            '/',
            {
                templateUrl: 'partials/home.html'
            }
        );
        $routeProvider.when(
            '/dynamic-title',
            {
                templateUrl: 'partials/dynamic-title.html',
                controller: function ($scope) {
                    $scope.chosenTitle = 'Dynamic Title';
                }
            }
        );
        $routeProvider.when(
            '/rss-link',
            {
                templateUrl: 'partials/rss-link.html',
                controller: function ($scope) {
                    $scope.rssUrl = 'example.rss';
                }
            }
        );
    }
);
