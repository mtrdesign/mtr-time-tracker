///<reference path="../_all.ts"/>
"use strict";
var init_1 = require("../init");
var TimeReportListController = (function () {
    function TimeReportListController($scope, $location, PageService, FlashService, ProjectsService, ProfilesService, TimeReportsService, $route, $routeParams) {
        this.$scope = $scope;
        this.$location = $location;
        this.PageService = PageService;
        this.FlashService = FlashService;
        this.ProjectsService = ProjectsService;
        this.ProfilesService = ProfilesService;
        this.TimeReportsService = TimeReportsService;
        this.$route = $route;
        this.$routeParams = $routeParams;
        this.c = this;
        this.filterData = {};
        PageService.resetData();
        PageService.setHtmlTitle('Time Reports');
        PageService.setSlug('time-reports');
        this.search = $location.search();
        this.c.filterData.date_0 = (this.search.date_0) ? this.search.date_0 : moment().startOf('month').format('YYYY-MM-DD');
        this.c.filterData.date_1 = (this.search.date_1) ? this.search.date_1 : moment().format('YYYY-MM-DD');
        this.c.filterData.profile__id = (this.search.profile__id) ? this.search.profile__id : null;
        this.c.filterData.project__id = (this.search.project__id) ? this.search.project__id : null;
        this.listTimeReports();
        this.listTimeReportsProfiles();
        this.listTimeReportsProjects();
        this.listTimeReportsTotalHours();
        this.listProfiles();
        this.listProjects();
        initUI();
    }
    TimeReportListController.prototype.listTimeReports = function () {
        var _this = this;
        this.TimeReportsService.GetReportsByConditions(this.c.filterData)
            .then(function (response) {
            _this.c.getTimeReports = response;
        });
    };
    TimeReportListController.prototype.listTimeReportsProfiles = function () {
        var _this = this;
        this.TimeReportsService.GetReportsProfilesByConditions(this.c.filterData)
            .then(function (response) {
            _this.c.getTimeReportsProfiles = response;
        });
    };
    TimeReportListController.prototype.listTimeReportsProjects = function () {
        var _this = this;
        this.TimeReportsService.GetReportsProjectsByConditions(this.c.filterData)
            .then(function (response) {
            _this.c.getTimeReportsProjects = response;
        });
    };
    TimeReportListController.prototype.listTimeReportsTotalHours = function () {
        var _this = this;
        this.TimeReportsService.GetReportsTotalHoursByConditions(this.c.filterData)
            .then(function (response) {
            _this.c.getTimeReportsTotalHours = response;
        });
    };
    TimeReportListController.prototype.filter = function () {
        this.$location.url('/time-reports?' + $.param(this.c.filterData));
    };
    TimeReportListController.prototype.removeItem = function (id) {
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
    TimeReportListController.prototype.listProfiles = function () {
        var _this = this;
        this.ProfilesService.GetAll()
            .then(function (response) {
            _this.c.profiles = response;
        });
    };
    TimeReportListController.prototype.listProjects = function () {
        var _this = this;
        this.ProjectsService.GetAllProjects()
            .then(function (response) {
            _this.c.projects = response;
        });
    };
    return TimeReportListController;
}());
exports.TimeReportListController = TimeReportListController;
angular.module(init_1.Module).controller("TimeReportListController", ['$rootScope',
    '$location',
    'PageService',
    'FlashService',
    'ProjectsService',
    'ProfilesService',
    'TimeReportsService',
    '$route',
    '$routeParams', NewTimeReportListController]);
function NewTimeReportListController($scope, $location, PageService, FlashService, ProjectsService, ProfilesService, TimeReportsService, $route, $routeParams) {
    return new TimeReportListController($scope, $location, PageService, FlashService, ProjectsService, ProfilesService, TimeReportsService, $route, $routeParams);
}
