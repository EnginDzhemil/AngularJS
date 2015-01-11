'use strict';

app.factory('adminService',
    function ($http, baseServiceUrl, authService) {
        return {
            getAdminAds: function (params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/admin/ads',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                $http(request).success(success).error(error);
            },

            getAdminUsers: function (params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/admin/users',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                $http(request).success(success).error(error);
            },

            getAdminCategories: function (params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/admin/categories',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                $http(request).success(success).error(error);
            },

            deleteCategory: function (id, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/admin/categories/'+id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            addCategory: function (categoryParams, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/admin/categories',
                    headers: authService.getAuthHeaders(),
                    data: categoryParams
                };
                $http(request).success(success).error(error);
            },

            editCategory: function (id, categoryParams, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/categories/'+id,
                    headers: authService.getAuthHeaders(),
                    data: categoryParams
                };
                $http(request).success(success).error(error);
            },

            getAdminTowns: function (params, success, error) {
            var request = {
                method: 'GET',
                url: baseServiceUrl + '/api/admin/towns',
                headers: authService.getAuthHeaders(),
                params: params
            };
            $http(request).success(success).error(error);
            },

            deleteTown: function (id, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/admin/towns/'+id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            addTown: function (townParams, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/admin/towns',
                    headers: authService.getAuthHeaders(),
                    data: townParams
                };
                $http(request).success(success).error(error);
            },

            editTown: function (id, townParams, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/towns/'+id,
                    headers: authService.getAuthHeaders(),
                    data: townParams
                };
                $http(request).success(success).error(error);
            },

            editUserProfile: function (username, userData, success, error) {
                delete userData.username;
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/user/'+username,
                    headers: authService.getAuthHeaders(),
                    data: userData
                };
                $http(request).success(success).error(error);
            },

            setUserPassword: function (userData, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/setpassword',
                    headers: authService.getAuthHeaders(),
                    data: userData
                };
                $http(request).success(success).error(error);
            },

            getAdById: function (id, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/admin/ads/'+id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            deleteAd: function (id, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/admin/ads/'+id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            deleteUser: function (username, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/admin/user/'+username,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            approveAd: function (id, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/ads/approve/'+id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            rejectAd: function (id, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/ads/reject/'+id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },
            editAd: function (id, adData, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/ads/'+id,
                    headers: authService.getAuthHeaders(),
                    data: adData
                };
                $http(request).success(success).error(error);
            }
        }
    }
);
