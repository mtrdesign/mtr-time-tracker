(function () {
    'use strict';
    angular
        .module('app')
        .factory('TimeReportsService', TimeReportsService);
    TimeReportsService.$inject = ['$http', 'config', 'envService'];
    function TimeReportsService($http, config, envService) {
        var service = {};
        service.GetReports = GetReports;
        service.Create = Create;
        function GetReports(project_id) {
            return $http.get(envService.read('apiUrl') + '/time-reports/?project__id=' + project_id)
                        .then(handleSuccess, handleError('Error getting time reports.'));
        }
        function Create(timeReportData, callback) {
            timeReportData.date = moment(timeReportData.date).format('YYYY-MM-DD');
            $http.post(envService.read('apiUrl') + '/time-reports/', timeReportData)
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
