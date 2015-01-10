'use strict';

app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService) {

        $rootScope.headerMsg = 'Login';

        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo("Login successful");
                    if(authService.isAdmin()){
                        $location.path("/admin/home");
                    }
                    else{
                        $location.path("/user/home");
                    }
                },
                function error(err) {
                    notifyService.showError("Login failed", err);
                }
            );
        };
    }
);
