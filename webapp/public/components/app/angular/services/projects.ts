///<reference path="../_all.ts"/>

module App {
    'use strict';

    export class ProjectService {
        public $http:any;
        public envService:any;

        constructor(private _$http:ng.IHttpBackendService,
                    private _envService:angular.environment.Service) {
            this.$http = _$http;
            this.envService = _envService;
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
        GetProject(id :number) {
            return this.$http.get(this.envService.read('apiUrl') + '/projects/' + id + '/')
                        .then(this.handleSuccess, this.handleError('Error getting project.'));
        }

        handleSuccess(res:any) {
            return res.data;
        }
        
        handleError(error:any) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
}