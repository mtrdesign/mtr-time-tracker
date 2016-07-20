(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProjectController', ProjectController);
    ProjectController.$inject = ['$rootScope', 'PageService', 'ProjectsService', '$routeParams'];
    function ProjectController($rootScope, PageService, ProjectsService, $routeParams) {
        var c = this;
        c.getProject = [];
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Projects');
            PageService.setSlug('projects');
            loadProject($routeParams.id);
        })();
        function loadProject(id) {
            ProjectsService.GetProject(id)
                .then(function (project) {
                    c.getProject = project;
                    PageService.setHtmlTitle(project.name);
                });
        }
    }
})();