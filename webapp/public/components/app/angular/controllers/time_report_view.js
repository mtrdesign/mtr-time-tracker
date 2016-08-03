(function () {
    'use strict';
    angular
        .module('app')
        .controller('TimeReportViewController', TimeReportViewController);
    TimeReportViewController.$inject = [
        '$rootScope', 
        '$location', 
        'PageService', 
        'FlashService', 
        'ProjectsService', 
        'TimeReportsService', 
        '$routeParams'
    ];
    function TimeReportViewController($rootScope, $location, PageService, FlashService,
                                      ProjectsService, TimeReportsService, $routeParams) {
        var c = this;
        c.removeItem = removeItem;
        c.getProject = [];
        c.getProjectTimeReports = [];
        c.timeReportData = {};
        c.timeReportData.id = '';
        c.timeReportData.name = '';
        c.timeReportData.seconds = '';
        c.timeReportData.description = '';
        c.timeReportData.date = '';
        c.timeReportData.profile = $rootScope.globals.currentUser.profile.id;
        c.timeReportData.project = $routeParams.id;
        c.readableKeys = {};
        c.readableKeys.name = 'Name';
        c.readableKeys.seconds = 'Hours';
        c.readableKeys.description = 'Description';
        c.readableKeys.date = 'Date';
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Time Reports');
            PageService.setSlug('time-reports');
            loadReportData($routeParams.id);
            loadProject($routeParams.project_id);
            initUI();
        })();
        function loadProject(id) {
            ProjectsService.GetProject(id)
                .then(function (project) {
                    if(typeof project.id == 'number' && project.id > 0) {
                        c.getProject = project;
                        PageService.setHtmlTitle(project.name);
                    } else {
                        $location.path('/404');
                    }
                });
        }
        function loadReportData(id) {
            TimeReportsService.GetByID(id)
                .then(function (timeReports) {
                    if(typeof timeReports.id == 'number' && timeReports.id > 0) {
                        c.timeReportData = timeReports;
                        PageService.setHtmlTitle(timeReports.name);
                    } else {
                        $location.path('/404');
                    }
                });
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
                    history.go(-1);
                });
            }
        }
    }
})();