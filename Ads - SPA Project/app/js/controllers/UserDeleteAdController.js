'use strict';

app.controller('UserDeleteAdController',
    function ($scope, userService, notifyService, $routeParams, $location) {

        $scope.reloadUserAd = function() {
            userService.getUserAdById(
                $routeParams.id,
                function success(data) {
                    $scope.ads = data;
                },
                function error(err) {
                    notifyService.showError("Ad couldn't load", err);
                }
            );
        };

        $scope.deleteAd = function() {
            userService.deleteAd(
                $routeParams.id,
                function success() {
                    notifyService.showInfo("Add deleted successfully")
                    $location.path("/user/ads");
                },
                function error(err) {
                    notifyService.showError("Ad couldn't load", err);
                }
            );
        };
        $scope.reloadUserAd();
    }
);