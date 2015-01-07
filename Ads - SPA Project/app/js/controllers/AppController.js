'use strict';

// The AppController holds the presentation logic for the entire app (common all screens)
app.controller('AppController',
    function ($scope, authService) {
        // Put the authService in the $scope to make it accessible from all screens
        $scope.authService = authService;

        // Implement the "logout" button click event handler
        $scope.logout = function() {
            authService.logout();
            // TODO: display "Logout successful" notification
            // TODO: redirect to the application home page
        };
    }
);
