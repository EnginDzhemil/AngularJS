'use strict';

// The AppController holds the presentation logic for the entire app (common all screens)
app.controller('AppController',
    function ($scope, authService, notifyService, $location) {
        // Put the authService in the $scope to make it accessible from all screens
        $scope.authService = authService;
        $scope.location = $location;

        // Implement the "logout" button click event handler
        $scope.logout = function() {
            authService.logout();
            notifyService.showInfo("Logout successful")
            $location.path('/user/ads');
            if(!$scope.$$phase) $scope.$apply()
        };
    }
);
