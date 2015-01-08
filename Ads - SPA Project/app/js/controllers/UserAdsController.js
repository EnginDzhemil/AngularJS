'use strict';

app.controller('UserAdsController',
    function ($scope, userService, notifyService) {
        userService.getUserAds(
            null,
            function success(data) {
                $scope.ads = data;
            },
            function error(err) {
                notifyService.showError("Cannot load ads", err);
            }
        );
    }
);
