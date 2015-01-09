'use strict';

app.controller('UserEditAdController',
    function ($scope, $location, townsService, categoriesService,
              userService, notifyService, $routeParams) {
        $scope.adData = {townId: null, categoryId: null};
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();

        $scope.reloadUserAd = function() {
            userService.getUserAdById(
                $routeParams.id,
                function success(data) {
                    $scope.ads = data;
                },
                function error(err) {
                    notifyService.showError("Ad couldn't load", err);
                }
            );
        };

        $scope.fileSelected = function(fileInputField) {
            delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "' width='170px;'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.editUserAd = function(id, adData) {
            userService.editAd(id, adData,
                function success() {
                    notifyService.showInfo("Ad edited")
                    $location.path("/user/ads");
                },
                function error(err) {
                    notifyService.showError("Ad edit failed", err)
                }
            );
        };

        $scope.reloadUserAd();
    }
);

