(function () {
    'use strict';
    angular
        .module('app')
        .controller('TimeReportListController', TimeReportListController);
    TimeReportListController.$inject = [
        '$location',
        'FlashService',
        'PageService',
        'TimeReportsService',
        'ProfilesService',
        'ProjectsService',
        '$route'
    ];
    function TimeReportListController($location, FlashService, PageService, TimeReportsService, ProfilesService, ProjectsService, $route) {
        var search = $location.search();
        var c = this;
        c.filter = filter;
        c.removeItem = removeItem;
        c.profiles = [];
        c.projects = [];
        c.filterData = {};
        c.filterData.date_0 = (search.date_0) ? search.date_0 : moment().startOf('month').format('YYYY-MM-DD');
        c.filterData.date_1 = (search.date_1) ? search.date_1 : moment().format('YYYY-MM-DD');
        c.filterData.profile__id = (search.profile__id) ? search.profile__id : null;
        c.filterData.project__id = (search.project__id) ? search.project__id : null;
        c.getTimeReports = [];
        c.getTimeReportsProfiles = [];
        c.getTimeReportsProjects = [];
        c.getTimeReportsTotalHours = [];
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Time Reports');
            PageService.setSlug('time-reports');
            listTimeReports();
            listTimeReportsProfiles();
            listTimeReportsProjects();
            listTimeReportsTotalHours();
            listProfiles();
            listProjects();
            initUI();
        })();
        function listTimeReports() {
            TimeReportsService.GetReportsByConditions(c.filterData)
                .then(function (response) {
                    c.getTimeReports = response;
                });
        }
        function listTimeReportsProfiles() {
            TimeReportsService.GetReportsProfilesByConditions(c.filterData)
                .then(function (response) {
                    c.getTimeReportsProfiles = response;
                });
        }
        function listTimeReportsProjects() {
            TimeReportsService.GetReportsProjectsByConditions(c.filterData)
                .then(function (response) {
                    c.getTimeReportsProjects = response;
                });
        }
        function listTimeReportsTotalHours() {
            TimeReportsService.GetReportsTotalHoursByConditions(c.filterData)
                .then(function (response) {
                    c.getTimeReportsTotalHours = response;
                });
        }
        function filter() {
            $location.url('/time-reports?' + $.param(c.filterData));
        }
        function removeItem(id) {
            var r = confirm('Are you sure that you want to delete this item?');
            if(r){
                TimeReportsService.Delete(id, function (response) {
                    if(response.length  == 0){
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
        function listProjects() {
            ProjectsService.GetAllProjects()
                .then(function (response) {
                    c.projects = response;
                });
        }
    }
})();