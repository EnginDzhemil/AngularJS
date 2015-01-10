'use strict';

app.factory('adminService',
    function ($http, baseServiceUrl, authService) {
        return {
            getAdminAds: function (success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/admin/ads',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

        }
    }
);
