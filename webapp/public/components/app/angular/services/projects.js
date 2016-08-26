///<reference path="../_all.ts"/>
'use strict';
var init_1 = require("../init");
var ProjectsService = (function () {
    function ProjectsService($http, envService) {
        this.$http = $http;
        this.envService = envService;
    }
    ProjectsService.prototype.GetAllProjects = function () {
        return this.$http.get(this.envService.read('apiUrl') + '/projects/')
            .then(this.handleSuccess, this.handleError('Error getting all projects.'));
    };
    ProjectsService.prototype.GetActiveProjects = function () {
        return this.$http.get(this.envService.read('apiUrl') + '/projects/?is_finished=3')
            .then(this.handleSuccess, this.handleError('Error getting active projects.'));
    };
    ProjectsService.prototype.GetFinishedProjects = function () {
        return this.$http.get(this.envService.read('apiUrl') + '/projects/?is_finished=2')
            .then(this.handleSuccess, this.handleError('Error getting finished projects.'));
    };
    ProjectsService.prototype.GetProject = function (id) {
        return this.$http.get(this.envService.read('apiUrl') + '/projects/' + id + '/')
            .then(this.handleSuccess, this.handleError('Error getting project.'));
    };
    ProjectsService.prototype.handleSuccess = function (res) {
        return res.data;
    };
    ProjectsService.prototype.handleError = function (error) {
        return function () {
            return { success: false, message: error };
        };
    };
    return ProjectsService;
}());
exports.ProjectsService = ProjectsService;
angular.module(init_1.Module).factory("ProjectsService", ["$http", "envService", NewProjectsService]);
function NewProjectsService($http, envService) {
    return new ProjectsService($http, envService);
}
