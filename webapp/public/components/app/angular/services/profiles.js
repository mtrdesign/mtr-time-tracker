﻿(function () {
    'use strict';
    angular
        .module('app')
        .factory('ProfilesService', ProfilesService);
    ProfilesService.$inject = ['$http'];
    function ProfilesService($http) {
        var service = {};
        service.GetAll = GetAll;
        function GetAll() {
            return $http.get('http://127.0.0.1:8000/api/profiles/')
                        .then(handleSuccess, handleError('Error getting all users'));
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
