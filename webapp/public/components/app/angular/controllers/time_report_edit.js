(function () {
    'use strict';
    angular
        .module('app')
        .controller('TimeReportEditController', TimeReportEditController);
    TimeReportEditController.$inject = ['$rootScope', '$location', 'PageService', 'FlashService', 'ProjectsService', 'TimeReportsService', '$routeParams'];
    function TimeReportEditController($rootScope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
        var c = this;
        c.create = edit;
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
            loadProject($routeParams.id);
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
        function edit(){
            var messages = [];
            TimeReportsService.Update($routeParams.id, c.timeReportData, function (response) {
                if (typeof response.id == 'number' && response.id > 0) {
                    FlashService.Success(['Time report has been successfully updated.']);
                    $location.path('/time-reports/' + $routeParams.id );
                } else {
                    angular.forEach(response, function(value, key) {
                        messages.push(c.readableKeys[key] + ': ' + value);
                    });
                    FlashService.Error(messages);
                }
            });
        }
    }
})();