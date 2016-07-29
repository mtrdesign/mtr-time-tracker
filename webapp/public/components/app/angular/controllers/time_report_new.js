(function () {
    'use strict';
    angular
        .module('app')
        .controller('TimeReportNewController', TimeReportNewController);
    TimeReportNewController.$inject = [
        '$rootScope',
        '$location',
        'PageService',
        'FlashService',
        'ProjectsService',
        'TimeReportsService',
        '$routeParams'
    ];
    function TimeReportNewController($rootScope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
        var c = this;
        c.create = create;
        c.getProject = [];
        c.getProjectTimeReports = [];
        c.timeReportData = {};
        c.timeReportData.name = '';
        c.timeReportData.seconds = '';
        c.timeReportData.description = '';
        c.timeReportData.date = moment().format('YYYY-MM-DD');
        c.timeReportData.profile = $rootScope.globals.currentUser.profile.id;
        c.timeReportData.project = $routeParams.id;
        c.readableKeys = {};
        c.readableKeys.name = 'Name';
        c.readableKeys.seconds = 'Hours';
        c.readableKeys.description = 'Description';
        c.readableKeys.date = 'Date';
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Projects');
            PageService.setSlug('projects');
            loadProject($routeParams.id);
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
        function create() {
            var messages = [];
            TimeReportsService.Create(c.timeReportData, function (response) {
                if (typeof response.id == 'number' && response.id > 0) {
                    FlashService.Success(['Time report has been successfully created.']);
                    $location.path('/projects/' + $routeParams.id + '/time-reports');
                } else {
                    angular.forEach(response, function(value, key) {
                        messages.push(c.readableKeys[key] + ': ' + value);
                    });
                    FlashService.Error(messages);
                }
            });
        };
    }
})();