(function () {
    'use strict';
    angular
        .module('app')
        .factory('CompaniesService', CompaniesService);
    CompaniesService.$inject = ['$http', 'config', 'envService'];
    function CompaniesService($http, config, envService) {
        var service = {};
        service.GetAll = GetAll;
        function GetAll() {
            return $http.get(envService.read('apiUrl') + '/companies/')
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
