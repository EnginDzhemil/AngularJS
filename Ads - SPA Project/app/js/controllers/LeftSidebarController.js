'use strict';

// The LeftSidebarController controls the content displayed in the right sidebar
app.controller('LeftSidebarController',
    function ($scope, $rootScope, $location) {
        $scope.location = $location;

        $scope.navigationClicked = function(clickedNavigationId) {
            $scope.selectedNavigationId = clickedNavigationId;
        };

        $scope.myAdsNavigationClicked = function(clickedMyAdsNavigationId) {
            $scope.selectedMyAdsNavigationId = clickedMyAdsNavigationId;
        };

        $scope.myAdsNavigationClicked = function(clickedMyAdsNavigationId) {
            $scope.clickedMyAdsNavigationId = clickedMyAdsNavigationId;
            $rootScope.$broadcast("myAdsNavigationSelectionChanged", clickedMyAdsNavigationId);
        };

    }
);
