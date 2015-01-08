'use strict';

app.controller('UserAdsController',
    function ($scope, userService, notifyService, pageSize) {
        $scope.userAdsParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };

        $scope.$on("myAdsNavigationSelectionChanged", function(event, selectedMyAdsNavigationId) {
            $scope.userAdsParams.status = selectedMyAdsNavigationId;
            $scope.userAdsParams.startPage = 1;
            $scope.reloadUserAds();
        });

        $scope.reloadUserAds = function() {
            userService.getUserAds(
                $scope.userAdsParams,
                function success(data) {
                    $scope.ads = data;
                },
                function error(err) {
                    notifyService.showError("Ads couldn't load", err);
                }
            );
        };

        $scope.reloadUserAds();
    }
);
