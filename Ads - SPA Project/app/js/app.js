'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination', 'angular-loading-bar']);

app.constant('baseServiceUrl', 'http://localhost:1337');
app.constant('pageSize', 5);

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("/user/") != -1 && !authService.isLoggedIn()) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }
    });
});

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/user/ads/publish', {
        templateUrl: 'templates/user/publish-new-ad.html',
        controller: 'UserPublishNewAdController'
    });

    $routeProvider.when('/user/ads', {
        templateUrl: 'templates/user/user-ads-home.html',
        controller: 'UserAdsController'
    });

    $routeProvider.when('/user/ads/delete/:id', {
        templateUrl: 'templates/user/delete-ad.html',
        controller: 'UserDeleteAdController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );

});
