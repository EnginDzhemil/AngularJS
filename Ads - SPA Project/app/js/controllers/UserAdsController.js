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

        $scope.deactivateUserAd = function(id) {
            userService.deactivateAd(
                id,
                function success() {
                    notifyService.showInfo("Ad successfully deactivated")
                    $scope.reloadUserAds();
                },
                function error(err) {
                    notifyService.showError("Ad couldn't deactivate", err);
                }
            );
        };

        $scope.publishAgainUserAd = function(id) {
            userService.publishAgainAd(
                id,
                function success() {
                    notifyService.showInfo("Ad successfully submitted for approval")
                    $scope.reloadUserAds();
                },
                function error(err) {
                    notifyService.showError("Ad couldn't be submitted for approval", err);
                }
            );
        };

        $scope.reloadUserAds();
    }
);
