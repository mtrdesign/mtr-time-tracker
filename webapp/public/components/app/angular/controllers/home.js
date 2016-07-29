(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);
    HomeController.$inject = [
        'ProjectsService',
        '$rootScope',
        'PageService'
    ];
    function HomeController(ProjectsService, $rootScope, PageService) {
        var c = this;
        c.getActiveProjects = [];
        c.getFinishedProjects = [];
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Home');
            PageService.setSlug('home');
            loadActiveProjects();
            loadFinishedProjects();
        })();
        function loadActiveProjects() {
            ProjectsService.GetActiveProjects()
                .then(function (projects) {
                    c.getActiveProjects = projects;
                });
        }
        function loadFinishedProjects() {
            ProjectsService.GetFinishedProjects()
                .then(function (projects) {
                    c.getFinishedProjects = projects;
                });
        }
    }
})();