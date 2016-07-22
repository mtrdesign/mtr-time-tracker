(function () {
    'use strict';
    angular
        .module('app')
        .controller('TimeReportListController', TimeReportListController);
    TimeReportListController.$inject = ['$rootScope', '$location', 'PageService', 'FlashService', 'ProjectsService', 'TimeReportsService', '$routeParams'];
    function TimeReportListController($rootScope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
        var c = this;
        c.getTimeReports = [];
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Time Reports');
            PageService.setSlug('time-reports');
            list();
        })();
        function list() {
            TimeReportsService.GetReportsByConditions()
                .then(function (response) {
                     c.getTimeReports = response;
                });
        };
    }
})();