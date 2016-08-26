///<reference path="../_all.ts"/>
import {Module, IEnvConfig, IScope} from "../init";

export class ProfilesService {

    constructor(private $http:ng.IHttpService,
                private config:IEnvConfig,
                private envService:angular.environment.Service,
                private $scope:IScope) {
    }

    GetAll() {
        return this.$http.get(this.envService.read('apiUrl') + '/profiles/')
            .then(this.handleSuccess, this.handleError('Error getting all profiles.'));
    }

    GetOneByUserID(id:number) {
        return this.$http.get(this.envService.read('apiUrl') + '/profiles/?user__id=' + id)
            .then(this.handleSuccess, this.handleError('Error getting this profile.'));
    }

    Edit(profileData:any, callback:any) {
        var profile_id = this.$scope.globals.currentUser.profile.id;
        this.$http.patch(this.envService.read('apiUrl') + '/profiles/' + profile_id + '/', profileData)
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

angular.module(Module).factory("ProfilesService", ["$http", "config", "envService", "$rootScope", NewProfilesService]);
export function NewProfilesService($http:ng.IHttpService,
                                   config:IEnvConfig,
                                   envService:angular.environment.Service,
                                   $scope:IScope) {
    return new ProfilesService($http, config, envService, $scope);
}
