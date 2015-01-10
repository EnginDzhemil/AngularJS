'use strict';

app.controller('RegisterController',
    function ($scope, $location, townsService, authService, notifyService, $rootScope) {
        $scope.userData = {townId: null};
        $scope.towns = townsService.getTowns();

        $rootScope.headerMsg = 'Register';

        $scope.register = function(userData) {
            authService.register(userData,
                function success() {
                    notifyService.showInfo("Login successful");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User registration failed", err);
                }
            );
        };
    }
);
