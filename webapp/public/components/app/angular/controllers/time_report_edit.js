///<reference path="../_all.ts"/>
"use strict";
var init_1 = require("../init");
var TimeReportEditController = (function () {
    function TimeReportEditController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
        this.$scope = $scope;
        this.$location = $location;
        this.PageService = PageService;
        this.FlashService = FlashService;
        this.ProjectsService = ProjectsService;
        this.TimeReportsService = TimeReportsService;
        this.$routeParams = $routeParams;
        this.c = this;
        PageService.resetData();
        PageService.setHtmlTitle('Time Reports');
        PageService.setSlug('time-reports');
        this.loadReportData($routeParams.id);
        this.loadProject($routeParams.project_id);
        // initUI();
    }
    TimeReportEditController.prototype.loadProject = function (id) {
        var _this = this;
        this.ProjectsService.GetProject(id)
            .then(function (project) {
            if (typeof project.id == 'number' && project.id > 0) {
                _this.c.getProject = project;
                _this.PageService.setHtmlTitle(project.name);
            }
            else {
                _this.$location.path('/404');
            }
        });
    };
    TimeReportEditController.prototype.loadReportData = function (id) {
        var _this = this;
        this.TimeReportsService.GetByID(id)
            .then(function (timeReports) {
            if (typeof timeReports.id == 'number' && timeReports.id > 0) {
                _this.c.timeReportData = timeReports;
                _this.PageService.setHtmlTitle(timeReports.name);
            }
            else {
                _this.$location.path('/404');
            }
        });
    };
    TimeReportEditController.prototype.edit = function () {
        var _this = this;
        var messages = [];
        this.TimeReportsService.Update(this.$routeParams.id, this.c.timeReportData, function (response) {
            if (typeof response.id == 'number' && response.id > 0) {
                _this.FlashService.Success(['Time report has been successfully updated.'], false);
                _this.$location.path('/projects/' + _this.$routeParams.project_id + '/time-reports/' + _this.$routeParams.id);
            }
            else {
                angular.forEach(response, function (value, key) {
                    messages.push(this.c.readableKeys[key] + ': ' + value);
                });
                _this.FlashService.Error(messages, false);
            }
        });
    };
    return TimeReportEditController;
}());
exports.TimeReportEditController = TimeReportEditController;
angular.module(init_1.Module).controller("TimeReportEditController", ['$rootScope',
    '$location',
    'PageService',
    'FlashService',
    'ProjectsService',
    'TimeReportsService',
    '$routeParams', NewTimeReportEditController]);
function NewTimeReportEditController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
    return new TimeReportEditController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams);
}
