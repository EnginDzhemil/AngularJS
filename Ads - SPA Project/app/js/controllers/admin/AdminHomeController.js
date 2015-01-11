'use strict';

app.controller('AdminHomeController',
    function ($scope, adsService, notifyService, pageSize, $rootScope, adminService, $location) {
        $scope.adsParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };
        $rootScope.headerMsg = 'Admin - Home';

        $scope.$on("myAdsNavigationSelectionChanged", function(event, selectedMyAdsNavigationId) {
            $scope.adsParams.status = selectedMyAdsNavigationId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });

        $scope.$on("categorySelectionChanged", function(event, selectedCategoryId) {
            $scope.adsParams.categoryId = selectedCategoryId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });

        $scope.$on("townSelectionChanged", function(event, selectedTownId) {
            $scope.adsParams.townId = selectedTownId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });

        $scope.reloadAds = function() {
            adminService.getAdminAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads = data;
                },
                function error(err) {
                    notifyService.showError("Ads couldn't load", err);
                }
            );
        };

        $scope.approveAdminAd = function(id) {
            adminService.approveAd(
                id,
                function success() {
                    notifyService.showInfo("Add approved successfully")
                    $scope.reloadAds();
                    $location.path("/admin/home");
                },
                function error(err) {
                    notifyService.showError("Ad couldn't be approved", err);
                }
            );
        };

        $scope.rejectAdminAd = function(id) {
            adminService.rejectAd(
                id,
                function success() {
                    notifyService.showInfo("Add rejected successfully")
                    $scope.reloadAds();
                    $location.path("/admin/home");
                },
                function error(err) {
                    notifyService.showError("Ad couldn't be rejected", err);
                }
            );
        };

        $scope.reloadAds();
    }
);
