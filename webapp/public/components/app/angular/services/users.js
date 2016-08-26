"use strict";
///<reference path="../_all.ts"/>
var init_1 = require("../init");
var UsersService = (function () {
    function UsersService($http, config, envService, $scope) {
        this.$http = $http;
        this.config = config;
        this.envService = envService;
        this.$scope = $scope;
    }
    UsersService.prototype.Edit = function (userData, callback) {
        var user_id = this.$scope.globals.currentUser.profile.user_entry.id;
        this.$http.post(this.envService.read('apiUrl') + '/users/' + user_id + '/set_password/', userData)
            .error(function (response) {
            callback(response);
        })
            .success(function (response) {
            callback(response);
        });
    };
    UsersService.prototype.handleSuccess = function (res) {
        return res.data;
    };
    UsersService.prototype.handleError = function (error) {
        return function () {
            return { success: false, message: error };
        };
    };
    return UsersService;
}());
exports.UsersService = UsersService;
angular.module(init_1.Module).factory("UsersService", ["$http", "config", "envService", "$rootScope", NewUsersService]);
function NewUsersService($http, config, envService, $scope) {
    return new UsersService($http, config, envService, $scope);
}
exports.NewUsersService = NewUsersService;
