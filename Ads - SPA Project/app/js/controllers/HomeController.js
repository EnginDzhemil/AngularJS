'use strict';

app.controller('HomeController',
    function ($scope, adsService, notifyService, pageSize) {
        $scope.adsParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };

        $scope.reloadAds = function() {
            adsService.getAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads = data;
                },
                function error(err) {
                    // TODO: display an error message
                }
            );
        };

        $scope.reloadAds();
    }
);
