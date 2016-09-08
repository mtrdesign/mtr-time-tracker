///<reference path="../_all.ts"/>
"use strict";
var init_1 = require("../init");
var ProjectController = (function () {
    function ProjectController($scope, $location, FlashService, PageService, ProjectsService, ProfilesService, TimeReportsService, $routeParams, $route) {
        this.$scope = $scope;
        this.$location = $location;
        this.FlashService = FlashService;
        this.PageService = PageService;
        this.ProjectsService = ProjectsService;
        this.ProfilesService = ProfilesService;
        this.TimeReportsService = TimeReportsService;
        this.$routeParams = $routeParams;
        this.$route = $route;
        this.c = this;
        this.filterData = {};
        PageService.resetData();
        PageService.setHtmlTitle('Projects');
        PageService.setSlug('projects');
        this.search = $location.search();
        this.c.filterData.profile__id = (this.search.profile__id) ? this.search.profile__id : null;
        this.c.filterData.project__id = $routeParams.id;
        this.loadProject($routeParams.id);
        this.listTimeReportsProfiles();
        this.listTimeReportsTotalHours();
        this.listProfiles();
        this.getTotalHoursByRange();
        this.listDataRange();
    }
    ProjectController.prototype.loadProject = function (id) {
        var _this = this;
        this.ProjectsService.GetProject(id)
            .then(function (project) {
            if (typeof project.id == 'number' && project.id > 0) {
                _this.c.getProject = project;
                _this.TimeReportsService.GetReportsByConditions(_this.c.filterData)
                    .then(function (response) {
                    _this.c.getProjectTimeReports = response;
                });
                _this.PageService.setHtmlTitle(project.name);
            }
            else {
                _this.$location.path('/404');
            }
        });
    };
    ProjectController.prototype.getTotalHoursByRange = function () {
        var _this = this;
        if (this.c.filterData == undefined)
            this.c.filterData = {};
        this.c.filterData.group_by = "MONTH";
        this.TimeReportsService.GetReportsProfilesByConditions(this.c.filterData)
            .then(function (response) {
            _this.c.totalMonthHours = response;
        });
    };
    ProjectController.prototype.listTimeReportsTotalHours = function () {
        var _this = this;
        this.TimeReportsService.GetReportsTotalHoursByConditions(this.c.filterData)
            .then(function (response) {
            _this.c.getTimeReportsTotalHours = response;
        });
    };
    ProjectController.prototype.listTimeReportsProfiles = function () {
        var _this = this;
        this.TimeReportsService.GetReportsProfilesByConditions(this.c.filterData)
            .then(function (response) {
            _this.c.getTimeReportsProfiles = response;
        });
    };
    ProjectController.prototype.removeItem = function (id) {
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
                _this.$route.reload();
            });
        }
    };
    ProjectController.prototype.listProfiles = function () {
        var _this = this;
        this.ProfilesService.GetAll()
            .then(function (response) {
            _this.c.profiles = response;
        });
    };
    ProjectController.prototype.filter = function () {
        this.$location.url('/projects/' + this.$routeParams.id + '/time-reports?' + $.param(this.c.filterData));
    };
    ProjectController.prototype.listDataRange = function () {
        var _this = this;
        this.c.filterData.group_by = "MONTH";
        this.TimeReportsService.GetReportsProjectsByConditions(this.c.filterData)
            .then(function (response) {
            _this.c.listDateRange = response;
        });
    };
    return ProjectController;
}());
exports.ProjectController = ProjectController;
angular.module(init_1.Module).controller("ProjectController", ['$rootScope',
    '$location',
    'FlashService',
    'PageService',
    'ProjectsService',
    'ProfilesService',
    'TimeReportsService',
    '$routeParams',
    '$route', NewProjectController]);
function NewProjectController($scope, $location, FlashService, PageService, ProjectsService, ProfilesService, TimeReportsService, $routeParams, $route) {
    return new ProjectController($scope, $location, FlashService, PageService, ProjectsService, ProfilesService, TimeReportsService, $routeParams, $route);
}
//# sourceMappingURL=project.js.map