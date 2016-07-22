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
                        .then(function(response) {
                            response.data.date = moment(response.data.date).toDate();
                            console.log(response.data.date);
                            return response.data;
                        }, handleError('Error getting time reports.'));
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
                    'date': moment(timeReportData.date).format('YYYY-MM-DD'),
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
            if(moment.duration(timeReportData.seconds, "HH:mm").asSeconds()) {
                seconds = moment.duration(timeReportData.seconds, "HH:mm");
            } else {
                seconds = moment.duration({'hours' : timeReportData.seconds});
            }
            $http.patch(envService.read('apiUrl') + '/time-reports/'+ id+ '/', {
                    'name': timeReportData.name,
                    'seconds': seconds.asSeconds(),
                    'description': timeReportData.description,
                    'date': moment(timeReportData.date).format('YYYY-MM-DD'),
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
