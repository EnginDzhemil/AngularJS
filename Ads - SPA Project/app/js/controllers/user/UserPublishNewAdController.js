'use strict';

app.controller('UserPublishNewAdController',
    function ($scope, $location, townsService, categoriesService,
              userService, notifyService, $rootScope) {
        $scope.adData = {townId: null, categoryId: null, imageDataUrl:''};
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();
        $rootScope.headerMsg = 'Publish new ad';

        $scope.fileSelected = function(fileInputField) {
            delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".image-box").html("<img class='ad-img' src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.publishAd = function(adData) {
            userService.createNewAd(adData,
                function success() {
                    notifyService.showInfo("Add submitted for approval")
                    $location.path("/user/ads");
                },
                function error(err) {
                   notifyService.showError("Ad wasn't submitted", err)
                }
            );
        };

    }
);
