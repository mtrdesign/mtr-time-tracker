(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProjectController', ProjectController);
    ProjectController.$inject = ['$rootScope', '$location', 'PageService', 'ProjectsService', 'TimeReportsService', '$routeParams'];
    function ProjectController($rootScope, $location, PageService, ProjectsService, TimeReportsService, $routeParams) {
        var c = this;
        c.getProject = [];
        c.getProjectTimeReports = [];
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Projects');
            PageService.setSlug('projects');
            loadProject($routeParams.id);
        })();
        function loadProject(id) {
            ProjectsService.GetProject(id)
                .then(function (project) {
                    if(typeof project.id == 'number' && project.id > 0) {
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
    }
})();