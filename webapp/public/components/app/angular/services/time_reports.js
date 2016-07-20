(function () {
    'use strict';
    angular
        .module('app')
        .factory('TimeReportsService', TimeReportsService);
    TimeReportsService.$inject = ['$http', 'config', 'envService'];
    function TimeReportsService($http, config, envService) {
        var service = {};
        service.GetReports = GetReports;
        function GetReports(project_id) {
            return $http.get(envService.read('apiUrl') + '/time-reports/?project_id=' + project_id)
                        .then(handleSuccess, handleError('Error getting time reports.'));
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
