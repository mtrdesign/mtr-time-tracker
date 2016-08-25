"use strict";
///<reference path="../_all.ts"/>
var init_1 = require("../init");
var AuthenticationService = (function () {
    function AuthenticationService($http, $cookieStore, $scope, config, envService) {
        this.$http = $http;
        this.$cookieStore = $cookieStore;
        this.$scope = $scope;
        this.config = config;
        this.envService = envService;
    }
    AuthenticationService.prototype.Login = function (username, password, callback) {
        this.$http.post(this.envService.read('apiUrl') + '/auth/jwt/new/', {
            username: username,
            password: password
        })
            .error(function (response) {
            callback(response);
        })
            .success(function (response) {
            callback(response);
        });
    };
    AuthenticationService.prototype.SetCredentials = function (token, callback) {
        this.VerifyToken(token, function (tokenResponse) {
            if (typeof tokenResponse == 'object'
                && typeof tokenResponse.token == 'string'
                && tokenResponse.token.length > 0) {
                this.$http.defaults.headers.common.Authorization = 'JWT ' + token;
                this.VerifyUser(token, function (userResponse) {
                    if (typeof userResponse[0] == 'object'
                        && typeof userResponse[0].id == 'number'
                        && userResponse[0].id > 0) {
                        this.$rootScope.globals = {
                            currentUser: {
                                token: token,
                                profile: userResponse[0]
                            }
                        };
                        this.$cookieStore.put('globals', this.$rootScope.globals);
                        callback({ 'success': true });
                    }
                    else {
                        this.ClearCredentials();
                        callback({ 'success': false });
                    }
                });
            }
            else {
                this.ClearCredentials();
                callback({ 'success': false });
            }
        });
    };
    AuthenticationService.prototype.ClearCredentials = function () {
        this.$scope.globals = {};
        this.$cookieStore.remove('globals');
        this.$http.defaults.headers.common.Authorization = 'JWT';
    };
    AuthenticationService.prototype.VerifyUser = function (token, callback) {
        // let ProfileService = NewPageService(this.config);
        // ProfilesService.GetOneByUserID(jwtHelper.decodeToken(token).user_id)
        //     .then(function (profile) {
        //         callback(profile);
        //     });
    };
    AuthenticationService.prototype.VerifyToken = function (token, callback) {
        this.$http.post(this.envService.read('apiUrl') + '/auth/jwt/verify/', {
            token: token
        })
            .error(function (response) {
            callback(response);
        })
            .success(function (response) {
            callback(response);
        });
    };
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
angular.module(init_1.Module).factory("AuthenticationService", ["$http", "$cookieStore", "$rootScope", "config", "envService", NewAuthenticationService]);
function NewAuthenticationService($http, $cookieStore, $scope, config, envService) {
    return new AuthenticationService($http, $cookieStore, $scope, config, envService);
}
exports.NewAuthenticationService = NewAuthenticationService;
