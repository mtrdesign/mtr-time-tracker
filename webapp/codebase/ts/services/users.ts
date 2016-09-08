///<reference path="../_all.ts"/>
import {Module} from "../init";
import {IScope, IEnvConfig} from "../interface";

export class UsersService {

    constructor(private $http:ng.IHttpService,
                private config:IEnvConfig,
                private envService:angular.environment.Service,
                private $scope:IScope) {
    }

    Edit(userData:any, callback:any) {
        var user_id = this.$scope.globals.currentUser.profile.user_entry.id;
        this.$http.post(this.envService.read('apiUrl') + '/users/' + user_id + '/set_password/', userData)
            .error(function (response:any) {
                callback(response);
            })
            .success(function (response:any) {
                callback(response);
            });
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

angular.module(Module).factory("UsersService", ["$http", "config", "envService", "$rootScope", NewUsersService]);
export function NewUsersService($http:ng.IHttpService,
                                config:IEnvConfig,
                                envService:angular.environment.Service,
                                $scope:IScope) {
    return new UsersService($http, config, envService, $scope);
}
