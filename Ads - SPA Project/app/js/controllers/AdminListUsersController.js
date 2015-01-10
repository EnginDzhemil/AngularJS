'use strict';

app.controller('AdminListUsersController',
    function ($scope, adsService, notifyService, pageSize, $rootScope, adminService, $location) {
        $scope.usersParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };
        $rootScope.headerMsg = 'Admin List Users';

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

        $scope.reloadUsers();
    }
);
