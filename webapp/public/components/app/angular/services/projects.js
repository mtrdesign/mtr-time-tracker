///<reference path="../_all.ts"/>
var App;
(function (App) {
    'use strict';
    var ProjectService = (function () {
        function ProjectService(_$http, _envService) {
            this._$http = _$http;
            this._envService = _envService;
            this.$http = _$http;
            this.envService = _envService;
        }
        ProjectService.prototype.GetAllProjects = function () {
            return this.$http.get(this.envService.read('apiUrl') + '/projects/')
                .then(this.handleSuccess, this.handleError('Error getting all projects.'));
        };
        ProjectService.prototype.GetActiveProjects = function () {
            return this.$http.get(this.envService.read('apiUrl') + '/projects/?is_finished=3')
                .then(this.handleSuccess, this.handleError('Error getting active projects.'));
        };
        ProjectService.prototype.GetFinishedProjects = function () {
            return this.$http.get(this.envService.read('apiUrl') + '/projects/?is_finished=2')
                .then(this.handleSuccess, this.handleError('Error getting finished projects.'));
        };
        ProjectService.prototype.GetProject = function (id) {
            return this.$http.get(this.envService.read('apiUrl') + '/projects/' + id + '/')
                .then(this.handleSuccess, this.handleError('Error getting project.'));
        };
        ProjectService.prototype.handleSuccess = function (res) {
            return res.data;
        };
        ProjectService.prototype.handleError = function (error) {
            return function () {
                return { success: false, message: error };
            };
        };
        return ProjectService;
    }());
    App.ProjectService = ProjectService;
})(App || (App = {}));
