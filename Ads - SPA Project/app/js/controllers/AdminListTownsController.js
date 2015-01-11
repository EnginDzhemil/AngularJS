'use strict';

app.controller('AdminListTownsController',
    function ($scope, notifyService, pageSize, $rootScope, adminService, $location) {
        $scope.townsParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };
        $scope.townParams = {};
        $scope.townEditParams = {};
        $rootScope.headerMsg = 'Admin List Towns';


        $scope.reloadTowns = function() {
            adminService.getAdminTowns(
                $scope.townsParams,
                function success(data) {
                    $scope.towns = data;
                },
                function error(err) {
                    notifyService.showError("Towns couldn't load", err);
                }
            );
        };

        $scope.deleteAdminTown = function(town) {
            noty({
                layout: 'center',
                text: 'Do you want to delete '+town.username+'?',
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        adminService.deleteTown(
                            town.id,
                            function success() {
                                notifyService.showInfo("Town deleted successfully");
                                $location.path("/admin/towns/list");
                                $scope.reloadTowns();
                            },
                            function error(err) {
                                notifyService.showError("Town delete failed", err);
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

        $scope.addAdminTown = function() {
            noty({
                layout: 'center',
                text: '<h3>Add Town</h3><br/><label for="townInput">Town:</label> <input class="form-control" id="townInput" type="text"/>',
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        $scope.townParams.name=$( "#townInput").val();
                        adminService.addTown(
                            $scope.townParams,
                            function success() {
                                notifyService.showInfo("Town added successfully");
                                $location.path("/admin/towns/list");
                                $scope.reloadTowns();
                            },
                            function error(err) {
                                notifyService.showError("Town add failed", err);
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

        $scope.editAdminTown = function(town) {
            noty({
                layout: 'center',
                text: '<h3>Edit Town</h3><br/><label for="townEdit">Town:</label> <input class="form-control" value="'+town.username+'" id="townEdit" type="text"/>',
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        $scope.townEditParams.name=$( "#townEdit").val();
                        adminService.editTown(
                            town.id,
                            $scope.townEditParams,
                            function success() {
                                notifyService.showInfo("Town edited successfully");
                                $location.path("/admin/towns/list");
                                $scope.reloadTowns();
                            },
                            function error(err) {
                                notifyService.showError("Town edit failed", err);
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

        $scope.reloadTowns();
    }
);
