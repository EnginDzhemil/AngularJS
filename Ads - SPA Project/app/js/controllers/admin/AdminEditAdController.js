'use strict';

app.controller('AdminEditAdController',
    function ($scope, $location, townsService, categoriesService,
              adminService, notifyService, $routeParams, $rootScope) {
        $scope.adData = {townId: null, categoryId: null, imageDataUrl: "dfgh"};
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();
        $scope.selectedImageChangeState = false;
        $scope.selectedImageDeleteState = false;
        $rootScope.headerMsg = "Edit ad";

        $scope.reloadAd = function() {
            adminService.getAdById(
                $routeParams.id,
                function success(data) {
                    $scope.ads = data;
                    $scope.adData.title = $scope.ads.title;
                    $scope.adData.text = $scope.ads.text;
                    $scope.adData.status = $scope.ads.status;
                    $scope.adData.date = $scope.ads.date;
                    $scope.adData.ownerUsername = $scope.ads.ownerUsername;
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


        $scope.editAdminAd = function(id, adData) {
            adminService.editAd(id, adData,
                function success() {
                    notifyService.showInfo("Ad edited")
                    $location.path("/admin/home");
                },
                function error(err) {
                    notifyService.showError("Ad edit failed", err)
                }
            );
        };
        $scope.reloadAd();
        //date
        $scope.today = function() {
            $scope.dt = new Date();
        };

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];


    }
);

