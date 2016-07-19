(function () {
    'use strict';
    angular
        .module('app')
        .factory('ProfilesService', ProfilesService);
    ProfilesService.$inject = ['$http', 'config', '$rootScope'];
    function ProfilesService($http, config, $rootScope) {
        var service = {};
        service.GetAll = GetAll;
        service.GetOneByUserID = GetOneByUserID;
        service.Edit = Edit;
        function GetAll() {
            return $http.get(config.apiUrl + '/profiles/')
                        .then(handleSuccess, handleError('Error getting all profiles.'));
        }
        function GetOneByUserID(id) {
            return $http.get(config.apiUrl + '/profiles/?user__id=' + id)
                        .then(handleSuccess, handleError('Error getting this profile.'));
        }
        function Edit(profileData, callback) {
            $http.patch(config.apiUrl + '/profiles/' + $rootScope.globals.currentUser.profile.id + '/', profileData)
                .error(function (response) {
                    callback(response);
                })
                .success(function (response) {
                    callback(response);
                });
        }
        function handleSuccess(res) {
            return res.data;
        }
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
        return service;
    }
})();
