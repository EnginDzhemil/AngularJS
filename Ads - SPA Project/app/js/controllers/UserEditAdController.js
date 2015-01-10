'use strict';

app.controller('UserEditAdController',
    function ($scope, $location, townsService, categoriesService,
              userService, notifyService, $routeParams) {
        $scope.adData = {townId: null, categoryId: null};
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();
        $scope.adData.changeImage = false;
        $scope.reloadUserAd = function() {
            userService.getUserAdById(
                $routeParams.id,
                function success(data) {
                    $scope.ads = data;
                    $scope.adData.title = data.title;
                    $scope.adData.text = data.text;
                    $scope.adData.categoryId = data.categoryId;
                    $scope.adData.townId = data.townId;
                    $scope.adData.imageDataUrl = data.imageDataUrl;
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
                    $scope.imageUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "' width='170px;'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };
        $scope.changeImage = function() {
            if($scope.selectedImageChangeState == true){
                $scope.adData.changeImage = false;
                $scope.selectedImageChangeState = false;
            }else{
                $scope.adData.imageDataUrl = $scope.imageUrl;
                $scope.adData.changeImage = true;
                $scope.selectedImageChangeState = true;
            }

        };

        $scope.deleteImage = function() {
            if($scope.selectedImageDeleteState == true){
                $scope.adData.changeImage = false;
                $scope.selectedImageDeleteState = false;
            }else{
                $scope.adData.imageDataUrl = "";
                $scope.adData.changeImage = true;
                $scope.selectedImageDeleteState = true;
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

