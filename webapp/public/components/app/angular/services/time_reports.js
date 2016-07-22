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
            var seconds = 0;
            if(moment.duration(timeReportData.seconds, "HH:mm").asSeconds()) {
                seconds = moment.duration(timeReportData.seconds, "HH:mm");
            } else {
                seconds = moment.duration({'hours' : timeReportData.seconds});
            }
            $http.post(envService.read('apiUrl') + '/time-reports/', {
                    'name': timeReportData.name,
                    'seconds': seconds.asSeconds(),
                    'description': timeReportData.description,
                    'date': timeReportData.date,
                    'profile': timeReportData.profile,
                    'project': timeReportData.project
                })
                .error(function (response) {
                    callback(response);
                })
                .success(function (response) {
                    callback(response);
                });
        }
        function Update(id, timeReportData, callback) {
            var seconds = 0;
            if(moment.duration(timeReportData.hours, "HH:mm").asSeconds()) {
                seconds = moment.duration(timeReportData.hours, "HH:mm");
            } else {
                seconds = moment.duration({'hours' : timeReportData.hours});
            }
            $http.patch(envService.read('apiUrl') + '/time-reports/'+ id+ '/', {
                    'name': timeReportData.name,
                    'seconds': seconds.asSeconds(),
                    'description': timeReportData.description,
                    'date': timeReportData.date
                })
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
