(function () {
    'use strict';
    angular
        .module('app')
        .controller('TimeReportListController', TimeReportListController);
    TimeReportListController.$inject = ['PageService', 'TimeReportsService'];
    function TimeReportListController(PageService, TimeReportsService) {
        var c = this;
        c.getTimeReports = [];
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Time Reports');
            PageService.setSlug('time-reports');
            listTimeReports();
        })();
        function listTimeReports() {
            TimeReportsService.GetReportsByConditions()
                .then(function (response) {
                     c.getTimeReports = response;
                });
        }
    }
})();