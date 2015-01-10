'use strict';

app.controller('UserEditAdController',
    function ($scope, $location, townsService, categoriesService,
              userService, notifyService, $routeParams) {
        $scope.adData = {townId: null, categoryId: null, imageDataUrl: "dfgh"};
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();
        $scope.selectedImageChangeState = false;
        $scope.selectedImageDeleteState = false;

        $scope.reloadUserAd = function() {
            userService.getUserAdById(
                $routeParams.id,
                function success(data) {
                    $scope.ads = data;
                    $scope.adData.title = $scope.ads.title;
                    $scope.adData.text = $scope.ads.text;
                    $scope.adData.categoryId = $scope.ads.categoryId;
                    $scope.adData.townId = $scope.ads.townId;
                    $scope.adData.imageDataUrl = $scope.ads.imageDataUrl;
                    $scope.adData.changeImage = false;
                },
                function error(err) {
                    notifyService.showError("Ad couldn't load", err);
                }
            );
        };

        $scope.fileSelected = function(fileInputField) {
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

