'use strict';

app.controller('AdminListCategoriesController',
    function ($scope, adsService, notifyService, pageSize, $rootScope, adminService, $location) {
        $scope.categoriesParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };
        $scope.categoryParams = {};
        $rootScope.headerMsg = 'Admin List Categories';


        $scope.reloadCategories = function() {
            adminService.getAdminCategories(
                $scope.categoriesParams,
                function success(data) {
                    $scope.categories = data;
                },
                function error(err) {
                    notifyService.showError("Categories couldn't load", err);
                }
            );
        };

        $scope.deleteAdminCategory = function(category) {
            noty({
                layout: 'center',
                text: 'Do you want to delete '+category.username+'?',
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        adminService.deleteCategory(
                            category.id,
                            function success() {
                                notifyService.showInfo("Category deleted successfully");
                                $location.path("/admin/categories/list");
                                $scope.reloadCategories();
                            },
                            function error(err) {
                                notifyService.showError("Category delete failed", err);
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

        $scope.addAdminCategory = function() {
            noty({
                layout: 'center',
                text: '<label for="categoryInput">Category:</label> <input class="form-control" id="categoryInput" type="text"/>',
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        $scope.categoryParams.name=$( "#categoryInput").val();
                        adminService.addCategory(
                            $scope.categoryParams,
                            function success() {
                                notifyService.showInfo("Category added successfully");
                                $location.path("/admin/categories/list");
                                $scope.reloadCategories();
                            },
                            function error(err) {
                                notifyService.showError("Category add failed", err);
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

        $scope.reloadCategories();
    }
);
