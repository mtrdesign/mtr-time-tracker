"use strict";
///<reference path="../_all.ts"/>
var init_1 = require("../init");
var TimeReportsService = (function () {
    function TimeReportsService($http, config, envService) {
        this.$http = $http;
        this.config = config;
        this.envService = envService;
    }
    TimeReportsService.prototype.GetByID = function (id) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/' + id + '/')
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    };
    TimeReportsService.prototype.GetReportsByConditions = function (conditions) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/?' + this.getParams(conditions))
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    };
    TimeReportsService.prototype.GetReportsProfilesByConditions = function (conditions) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/profiles/?' + this.getParams(conditions))
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    };
    TimeReportsService.prototype.GetReportsProjectsByConditions = function (conditions) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/projects/?' + this.getParams(conditions))
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    };
    TimeReportsService.prototype.GetReportsTotalHoursByConditions = function (conditions) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/total-hours/?' + this.getParams(conditions))
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    };
    TimeReportsService.prototype.GetReports = function (project_id) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/?project__id=' + project_id)
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    };
    TimeReportsService.prototype.Create = function (timeReportData, callback) {
        var seconds = 0;
        if (moment.duration(timeReportData.seconds, "HH:mm").asSeconds()) {
            seconds = moment.duration(timeReportData.seconds, "HH:mm");
        }
        else {
            seconds = moment.duration({ 'hours': timeReportData.seconds });
        }
        this.$http.post(this.envService.read('apiUrl') + '/time-reports/', {
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
    };
    TimeReportsService.prototype.Update = function (id, timeReportData, callback) {
        var seconds = 0;
        if (moment.duration(timeReportData.hours, "HH:mm").asSeconds()) {
            seconds = moment.duration(timeReportData.hours, "HH:mm");
        }
        else {
            seconds = moment.duration({ 'hours': timeReportData.hours });
        }
        this.$http.patch(this.envService.read('apiUrl') + '/time-reports/' + id + '/', {
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
    };
    TimeReportsService.prototype.Delete = function (id, callback) {
        this.$http.delete(this.envService.read('apiUrl') + '/time-reports/' + id + '/')
            .error(function (response) {
            callback(response);
        })
            .success(function (response) {
            callback(response);
        });
    };
    TimeReportsService.prototype.handleSuccess = function (res) {
        return res.data;
    };
    TimeReportsService.prototype.handleError = function (error) {
        return function () {
            return { success: false, message: error };
        };
    };
    TimeReportsService.prototype.getParams = function (conditions) {
        var params = '';
        if (conditions)
            params = $.param(conditions);
        return params;
    };
    return TimeReportsService;
}());
exports.TimeReportsService = TimeReportsService;
angular.module(init_1.Module).factory("TimeReportsService", ['$http', 'config', 'envService', NewTimeReportsService]);
function NewTimeReportsService($http, config, envService) {
    return new TimeReportsService($http, config, envService);
}
exports.NewTimeReportsService = NewTimeReportsService;
//# sourceMappingURL=time_reports.js.map