'use strict';

// The RightSidebarController controls the content displayed in the right sidebar
app.controller('RightSidebarController',
    function ($scope, $rootScope, categoriesService, townsService) {
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();
        $scope.clickedCategory = {};
        $scope.clickedTown = {};
        $scope.clickedCategory.id = '';
        $scope.clickedTown.id = '';
        $scope.categoryClicked = function() {
            $rootScope.$broadcast("categorySelectionChanged", $scope.clickedCategory.id);
        };

        $scope.townClicked = function() {
            $rootScope.$broadcast("townSelectionChanged", $scope.clickedTown.id);
        };

    }
);

