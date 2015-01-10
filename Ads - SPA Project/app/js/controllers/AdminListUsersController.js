'use strict';

app.controller('AdminListUsersController',
    function ($scope, adsService, notifyService, pageSize, $rootScope, adminService, $location, townsService) {
        $scope.towns = townsService.getTowns();
        $scope.usersParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };
        $scope.userEdit = {};
        $scope.passwordData = {};
        $rootScope.headerMsg = 'Admin List Users';

        $scope.showList = true;

        $scope.reloadUsers = function() {
            adminService.getAdminUsers(
                $scope.usersParams,
                function success(data) {
                    $scope.users = data;
                },
                function error(err) {
                    notifyService.showError("Users couldn't load", err);
                }
            );
        };

        $scope.deleteAdminUser = function(user) {
            noty({
                layout: 'center',
                text: 'Do you want to delete '+user.name+'?',
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        adminService.deleteUser(
                            user.username,
                            function success() {
                                notifyService.showInfo("User deleted successfully");
                                $location.path("/admin/users/list");
                                $scope.reloadUsers();
                            },
                            function error(err) {
                                notifyService.showError("User delete failed", err);
                            }
                        );
                        $noty.close();
                    }
                    },
                    {
                        addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                        $noty.close();
                    }
                    }
                ]
            });

        };

        $scope.showEditAdminUser = function(user) {
            $scope.showList = false;
            $scope.userEdit.username = user.username;
            $scope.passwordData.username = user.username;
            $scope.userEdit.name = user.name;
            $scope.userEdit.email = user.email;
            $scope.userEdit.phoneNumber = user.phoneNumber;
            $scope.userEdit.townId = user.townId;
            $scope.userEdit.isAdmin = user.isAdmin;
        };

        $scope.editAdminUser = function(userData) {
            adminService.editUserProfile(userData.username, userData,
                function success() {
                    notifyService.showInfo("User updated")
                    $location.path("/admin/users/list");
                    $scope.reloadUsers();
                    $scope.cancelEdit();
                },
                function error(err) {
                    notifyService.showError("User update failed", err)
                }
            );
        };

        $scope.changeUserPassword = function(userData) {
            console.log($scope.passwordData.username);
            adminService.setUserPassword(userData,
                function success() {
                    notifyService.showInfo("User password changed")
                    $location.path("/admin/users/list");
                    $scope.reloadUsers();
                    $scope.cancelEdit();
                },
                function error(err) {
                    notifyService.showError("User password change failed", err)
                }
            );
        };

        $scope.cancelEdit = function() {
            $scope.showList = true;
            delete $scope.userEdit.username;
            delete $scope.userEdit.name;
            delete $scope.userEdit.email;
            delete $scope.userEdit.phoneNumber;
            delete $scope.userEdit.townId;
            delete $scope.userEdit.isAdmin;
            delete $scope.passwordData.username;
            delete $scope.passwordData.newPassword;
            delete $scope.passwordData.confirmPassword;
        };

        $scope.reloadUsers();
    }
);
