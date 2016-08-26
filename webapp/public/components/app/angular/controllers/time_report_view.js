///<reference path="../_all.ts"/>
"use strict";
var init_1 = require("../init");
var TimeReportViewController = (function () {
    function TimeReportViewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
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
        initUI();
    }
    TimeReportViewController.prototype.loadProject = function (id) {
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
    TimeReportViewController.prototype.loadReportData = function (id) {
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
    TimeReportViewController.prototype.removeItem = function (id) {
        var _this = this;
        var r = confirm('Are you sure that you want to delete this item?');
        if (r) {
            this.TimeReportsService.Delete(id, function (response) {
                if (response.length == 0) {
                    _this.FlashService.Success(['Time report has been successfully deleted.'], false);
                }
                else {
                    _this.FlashService.Error(['Unexpected error'], false);
                }
                history.go(-1);
            });
        }
    };
    return TimeReportViewController;
}());
exports.TimeReportViewController = TimeReportViewController;
angular.module(init_1.Module).controller("TimeReportViewController", ['$rootScope',
    '$location',
    'PageService',
    'FlashService',
    'ProjectsService',
    'TimeReportsService',
    '$routeParams', NewTimeReportViewController]);
function NewTimeReportViewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
    return new TimeReportViewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams);
}
