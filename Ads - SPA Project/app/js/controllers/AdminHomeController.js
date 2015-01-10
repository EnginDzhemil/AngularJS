'use strict';

app.controller('AdminHomeController',
    function ($scope, adsService, notifyService, pageSize, $rootScope, adminService) {
        $scope.adsParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };
        $rootScope.headerMsg = 'Admin Home';

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

        $scope.reloadAds();
    }
);
