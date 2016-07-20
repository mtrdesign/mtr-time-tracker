(function () {
    'use strict';
    angular
        .module('app')
        .factory('ProjectsService', ProjectsService);
    ProjectsService.$inject = ['$http', 'config', 'envService'];
    function ProjectsService($http, config, envService) {
        var service = {};
        service.GetAllProjects = GetAllProjects;
        service.GetActiveProjects = GetActiveProjects;
        service.GetFinishedProjects = GetFinishedProjects;
        service.GetProject = GetProject;
        function GetAllProjects() {
            return $http.get(envService.read('apiUrl') + '/projects/')
                        .then(handleSuccess, handleError('Error getting all projects.'));
        }
        function GetActiveProjects() {
            return $http.get(envService.read('apiUrl') + '/projects/?is_finished=3')
                        .then(handleSuccess, handleError('Error getting active projects.'));
        }
        function GetFinishedProjects() {
            return $http.get(envService.read('apiUrl') + '/projects/?is_finished=2')
                        .then(handleSuccess, handleError('Error getting finished projects.'));
        }
        function GetProject(id) {
            return $http.get(envService.read('apiUrl') + '/projects/' + id + '/')
                        .then(handleSuccess, handleError('Error getting project.'));
        }
        function handleSuccess(res) {
            return res.data;
        }
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
        return service;
    }
})();
