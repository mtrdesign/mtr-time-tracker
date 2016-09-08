"use strict";
///<reference path="../_all.ts"/>
var init_1 = require("../init");
var ProfilesService = (function () {
    function ProfilesService($http, config, envService, $scope) {
        this.$http = $http;
        this.config = config;
        this.envService = envService;
        this.$scope = $scope;
    }
    ProfilesService.prototype.GetAll = function () {
        return this.$http.get(this.envService.read('apiUrl') + '/profiles/')
            .then(this.handleSuccess, this.handleError('Error getting all profiles.'));
    };
    ProfilesService.prototype.GetOneByUserID = function (id) {
        return this.$http.get(this.envService.read('apiUrl') + '/profiles/?user__id=' + id)
            .then(this.handleSuccess, this.handleError('Error getting this profile.'));
    };
    ProfilesService.prototype.Edit = function (profileData, callback) {
        var profile_id = this.$scope.globals.currentUser.profile.id;
        this.$http.patch(this.envService.read('apiUrl') + '/profiles/' + profile_id + '/', profileData)
            .error(function (response) {
            callback(response);
        })
            .success(function (response) {
            callback(response);
        });
    };
    ProfilesService.prototype.handleSuccess = function (res) {
        return res.data;
    };
    ProfilesService.prototype.handleError = function (error) {
        return function () {
            return { success: false, message: error };
        };
    };
    return ProfilesService;
}());
exports.ProfilesService = ProfilesService;
angular.module(init_1.Module).factory("ProfilesService", ["$http", "config", "envService", "$rootScope", NewProfilesService]);
function NewProfilesService($http, config, envService, $scope) {
    return new ProfilesService($http, config, envService, $scope);
}
exports.NewProfilesService = NewProfilesService;
//# sourceMappingURL=profiles.js.map