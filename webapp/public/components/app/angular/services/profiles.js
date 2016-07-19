(function () {
    'use strict';
    angular
        .module('app')
        .factory('ProfilesService', ProfilesService);
    ProfilesService.$inject = ['$http', 'config'];
    function ProfilesService($http, config) {
        var service = {};
        service.GetAll = GetAll;
        service.GetOneByUserID = GetOneByUserID;
        function GetAll() {
            return $http.get(config.apiUrl + '/profiles/')
                        .then(handleSuccess, handleError('Error getting all profiles.'));
        }
        function GetOneByUserID(id) {
            return $http.get(config.apiUrl + '/profiles/?user__id=' + id)
                        .then(handleSuccess, handleError('Error getting this profile.'));
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
