(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['CompaniesService', 'ProjectsService', 'ProfilesService', '$rootScope'];
    function HomeController(CompaniesService, ProjectsService, ProfilesService, $rootScope) {
        var c = this;
        c.getCompanies = [];
        c.getProjects = [];
        c.getProfiles = [];
        initController();
        function initController() {
            loadAllCompanies();
            loadAllProjects();
            loadAllProfiles();
        }
        function loadAllCompanies() {
            CompaniesService.GetAll()
                .then(function (companies) {
                    c.getCompanies = companies;
                });
        }
        function loadAllProjects() {
            ProjectsService.GetAll()
                .then(function (projects) {
                    c.getProjects = projects;
                });
        }
        function loadAllProfiles() {
            ProfilesService.GetAll()
                .then(function (profiles) {
                    c.getProfiles = profiles;
                });
        }
    }
})();