(function () {
    'use strict';
    angular
        .module('app')
        .controller('TimeReportListController', TimeReportListController);
    TimeReportListController.$inject = ['$location', 'FlashService', 'PageService', 'TimeReportsService'];
    function TimeReportListController($location, FlashService, PageService, TimeReportsService) {
        var search = $location.search();
        var c = this;
        c.filter = filter;
        c.removeItem = removeItem;
        c.filterData = {};
        c.filterData.from = (search.from) ? search.from : moment().startOf("month").format("YYYY-MM-DD");
        c.filterData.to = (search.to) ? search.to : moment().format("YYYY-MM-DD");
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
            // listTimeReportsTotalHours();
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
            $location.url('/time-reports?'+$.param(c.filterData));
        }

        function removeItem(id) {
            var r = confirm("Are you sure?")
            if(r){
                TimeReportsService.Delete(id, function (response) {
                    if(response.length  == 0){
                        FlashService.Success(['Time report has been successfully deleted.']);
                        $location.path('/time-reports' );
                    }else{
                        FlashService.Error(["Unexpected error"]);
                        $location.path('/time-reports' );
                    }

                });
            }
        }
    }
})();