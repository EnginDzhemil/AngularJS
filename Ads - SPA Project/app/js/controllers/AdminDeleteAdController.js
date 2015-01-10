'use strict';

app.controller('AdminDeleteAdController',
    function ($scope, adminService, notifyService, $routeParams, $location, $rootScope) {
        $rootScope.headerMsg = "Delete ad";

        $scope.reloadAdminAd = function() {
            adminService.getAdById(
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
            adminService.deleteAd(
                $routeParams.id,
                function success() {
                    notifyService.showInfo("Add deleted successfully")
                    $location.path("/admin/home");
                },
                function error(err) {
                    notifyService.showError("Ad couldn't load", err);
                }
            );
        };
        $scope.reloadAdminAd();
    }
);