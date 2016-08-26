///<reference path="../_all.ts"/>

'use strict';
import {Module} from "../init";
import IHttpService = angular.IHttpService;

export class ProjectsService {

    constructor(private $http:ng.IHttpService,
                private envService:angular.environment.Service) {
    }

    GetAllProjects() {
        return this.$http.get(this.envService.read('apiUrl') + '/projects/')
            .then(this.handleSuccess, this.handleError('Error getting all projects.'));
    }

    GetActiveProjects() {
        return this.$http.get(this.envService.read('apiUrl') + '/projects/?is_finished=3')
            .then(this.handleSuccess, this.handleError('Error getting active projects.'));
    }

    GetFinishedProjects() {
        return this.$http.get(this.envService.read('apiUrl') + '/projects/?is_finished=2')
            .then(this.handleSuccess, this.handleError('Error getting finished projects.'));
    }

    GetProject(id:number) {
        return this.$http.get(this.envService.read('apiUrl') + '/projects/' + id + '/')
            .then(this.handleSuccess, this.handleError('Error getting project.'));
    }

    handleSuccess(res:any) {
        return res.data;
    }

    handleError(error:any) {
        return function () {
            return {success: false, message: error};
        };
    }
}

angular.module(Module).factory("ProjectsService", ["$http", "envService", NewProjectsService]);
function NewProjectsService($http: IHttpService, envService:angular.environment.Service) {
    return new ProjectsService($http, envService);
}