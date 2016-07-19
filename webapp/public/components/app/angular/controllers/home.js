(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['ProjectsService', '$rootScope', 'PageService'];
    function HomeController(ProjectsService, $rootScope, PageService) {
        var c = this;
        c.getProjects = [];
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Home');
            PageService.setSlug('home');
            loadAllProjects();
        })();
        function loadAllProjects() {
            ProjectsService.GetAll()
                .then(function (projects) {
                    c.getProjects = projects;
                });
        }
    }
})();