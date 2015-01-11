'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination', 'ui.bootstrap', 'angular-loading-bar']);

app.constant('baseServiceUrl', 'http://localhost:1337');
app.constant('pageSize', 10);

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if($location.path() == "/login" || $location.path() == "/register"
            || $location.path() == "/user/ads"
            || $location.path() == "/user/ads/publish"
            || $location.path() == "/user/profile"
            || $location.path() == "/admin/users/list"
            || $location.path() == "/admin/categories/list"
            || $location.path().indexOf("/user/ads/edit/") !=-1
            || $location.path().indexOf("/user/ads/delete/") !=-1
            || $location.path().indexOf("/admin/ads/edit/") !=-1
            || $location.path().indexOf("/admin/ads/delete/") !=-1){
            $rootScope.showRightSidebar = false;
        }
        else{
            $rootScope.showRightSidebar = true;
        }
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

    $routeProvider.when('/user/home', {
        templateUrl: 'templates/user/home.html',
        controller: 'UserHomeController'
    });

    $routeProvider.when('/user/ads', {
        templateUrl: 'templates/user/user-ads-home.html',
        controller: 'UserAdsController'
    });

    $routeProvider.when('/user/ads/publish', {
        templateUrl: 'templates/user/publish-new-ad.html',
        controller: 'UserPublishNewAdController'
    });

    $routeProvider.when('/user/ads/delete/:id', {
        templateUrl: 'templates/user/delete-ad.html',
        controller: 'UserDeleteAdController'
    });

    $routeProvider.when('/user/ads/edit/:id', {
        templateUrl: 'templates/user/edit-ad.html',
        controller: 'UserEditAdController'
    });

    $routeProvider.when('/user/profile', {
        templateUrl: 'templates/user/edit-user.html',
        controller: 'EditUserProfileController'
    });

    $routeProvider.when('/admin/home', {
        templateUrl: 'templates/admin/home.html',
        controller: 'AdminHomeController'
    });

    $routeProvider.when('/admin/ads/delete/:id', {
        templateUrl: 'templates/admin/delete-ad.html',
        controller: 'AdminDeleteAdController'
    });

    $routeProvider.when('/admin/ads/edit/:id', {
        templateUrl: 'templates/admin/edit-ad.html',
        controller: 'AdminEditAdController'
    });

    $routeProvider.when('/admin/users/list', {
        templateUrl: 'templates/admin/list-users.html',
        controller: 'AdminListUsersController'
    });

    $routeProvider.when('/admin/categories/list', {
        templateUrl: 'templates/admin/list-categories.html',
        controller: 'AdminListCategoriesController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );

});
