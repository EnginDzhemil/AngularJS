'use strict';

app.controller('EditUserProfileController',
    function ($scope, $location, townsService, userService, notifyService, $rootScope) {
        $scope.towns = townsService.getTowns();
        $scope.userData = {};

        $rootScope.headerMsg = 'Edit User Profile'
        $scope.reloadUserProfile = function() {
            userService.getUserProfile(
                function success(data) {
                    $scope.user = data;
                    $scope.userData.name = data.name;
                    $scope.userData.email = data.email;
                    $scope.userData.phoneNumber = data.phoneNumber;
                    $scope.userData.townId = data.townId;
                },
                function error(err) {
                    notifyService.showError("Profile couldn't load", err);
                }
            );
        };

        $scope.editUserProfile = function(userData) {

            userService.editUserProfile( userData,
                function success() {
                    notifyService.showInfo("User updated")
                    $location.path("/user/profile");
                },
                function error(err) {
                    notifyService.showError("User update failed", err)
                }
            );
        };

        $scope.changeUserPassword = function(passwordData) {

            userService.changeUserPassword( passwordData,
                function success() {
                    notifyService.showInfo("Password changed")
                    $location.path("/user/profile");
                },
                function error(err) {
                    notifyService.showError("Password change failed", err)
                }
            );
        };

        $scope.reloadUserProfile();
    }
);

