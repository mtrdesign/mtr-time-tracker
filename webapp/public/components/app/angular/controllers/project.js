(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProjectController', ProjectController);
    ProjectController.$inject = [
        '$rootScope',
        '$location',
        'FlashService',
        'PageService',
        'ProjectsService',
        'ProfilesService',
        'TimeReportsService',
        '$routeParams',
        '$route'
    ];
    function ProjectController($rootScope, $location, FlashService, PageService, ProjectsService, ProfilesService, TimeReportsService, $routeParams, $route) {
        var search = $location.search();
        var c = this;
        c.filter = filter;
        c.removeItem = removeItem;
        c.listDateRange = [];
        c.getProject = [];
        c.profiles = [];
        c.filterData = {};
        c.filterData.profile__id = (search.profile__id) ? search.profile__id : null;
        c.filterData.project__id = $routeParams.id;
        c.getProjectTimeReports = [];
        c.getTimeReportsTotalHours = [];
        c.getTimeReportsProfiles = [];
        c.totalMonthHours = [];
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Projects');
            PageService.setSlug('projects');
            loadProject($routeParams.id);
            listTimeReportsProfiles();
            listTimeReportsTotalHours();
            listProfiles();
            getTotalHoursByRange();
            listDataRange();
        })();
        function loadProject(id) {
            ProjectsService.GetProject(id)
                .then(function (project) {
                    if (typeof project.id == 'number' && project.id > 0) {
                        c.getProject = project;
                        TimeReportsService.GetReports(id)
                            .then(function (response) {
                                c.getProjectTimeReports = response;
                            });
                        PageService.setHtmlTitle(project.name);
                    } else {
                        $location.path('/404');
                    }
                });
        }
        function getTotalHoursByRange() {
            TimeReportsService.GetReportsTotalHoursGroupByMonth(c.filterData)
                .then(function (response) {
                    c.totalMonthHours = response;
                });
        }
        function listTimeReportsTotalHours() {
            TimeReportsService.GetReportsTotalHoursByConditions(c.filterData)
                .then(function (response) {
                    c.getTimeReportsTotalHours = response;
                });
        }
        function listTimeReportsProfiles() {
            TimeReportsService.GetReportsProfilesByConditions(c.filterData)
                .then(function (response) {
                    c.getTimeReportsProfiles = response;
                });
        }
        function removeItem(id) {
            var r = confirm('Are you sure that you want to delete this item?');
            if (r) {
                TimeReportsService.Delete(id, function (response) {
                    if (response.length == 0) {
                        FlashService.Success(['Time report has been successfully deleted.']);
                    } else {
                        FlashService.Error(['Unexpected error']);
                    }
                    $route.reload();
                });
            }
        }
        function listProfiles() {
            ProfilesService.GetAll()
                .then(function (response) {
                    c.profiles = response;
                });
        }
        function filter() {
            $location.url('/projects/' + $routeParams.id + '/time-reports?' + $.param(c.filterData));
        }
        function listDataRange() {
            TimeReportsService.GetReportsDateRangesByConditions(c.filterData)
                .then(function (response) {
                    c.listDateRange = response;
                });
        }
    }
})();