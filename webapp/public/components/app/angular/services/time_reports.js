(function () {
    'use strict';
    angular
        .module('app')
        .factory('TimeReportsService', TimeReportsService);
    TimeReportsService.$inject = ['$http', 'config', 'envService'];
    function TimeReportsService($http, config, envService) {
        var service = {};
        service.GetReportsByConditions = GetReportsByConditions;
        service.GetReports = GetReports;
        service.Create = Create;
        service.Update = Update;
        service.GetByID = GetByID;
        function GetByID(id) {
            return $http.get(envService.read('apiUrl') + '/time-reports/' + id + '/')
                        .then(handleSuccess, handleError('Error getting time reports.'));
        }
        function GetReportsByConditions() {
            return $http.get(envService.read('apiUrl') + '/time-reports/')
                        .then(handleSuccess, handleError('Error getting time reports.'));
        }
        function GetReports(project_id) {
            return $http.get(envService.read('apiUrl') + '/time-reports/?project__id=' + project_id)
                        .then(handleSuccess, handleError('Error getting time reports.'));
        }
        function Create(timeReportData, callback) {
            $http.post(envService.read('apiUrl') + '/time-reports/', timeReportData)
                .error(function (response) {
                    callback(response);
                })
                .success(function (response) {
                    callback(response);
                });
        }
        function Update(id, timeReportData, callback) {
            $http.patch(envService.read('apiUrl') + '/time-reports/'+ id+ '/', timeReportData)
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
