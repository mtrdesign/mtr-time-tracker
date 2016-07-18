(function () {
    'use strict';
    angular
        .module('app')
        .factory('ProjectsService', ProjectsService);
    ProjectsService.$inject = ['$http', 'config'];
    function ProjectsService($http, config) {
        var service = {};
        service.GetAll = GetAll;
        function GetAll() {
            return $http.get(config.apiUrl + '/projects/')
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
