"use strict";
///<reference path="../_all.ts"/>
var init_1 = require("../init");
var AuthenticationService = (function () {
    function AuthenticationService($http, $cookieStore, $scope, config, jwt, ProfilesService, envService) {
        this.$http = $http;
        this.$cookieStore = $cookieStore;
        this.$scope = $scope;
        this.config = config;
        this.jwt = jwt;
        this.ProfilesService = ProfilesService;
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
        var _this = this;
        this.VerifyToken(token, function (tokenResponse) {
            if (typeof tokenResponse == 'object' && typeof tokenResponse.token == 'string' && tokenResponse.token.length > 0) {
                _this.$http.defaults.headers.common.Authorization = 'JWT ' + token;
                _this.VerifyUser(token, function (userResponse) {
                    if (typeof userResponse[0] == 'object'
                        && typeof userResponse[0].id == 'number'
                        && userResponse[0].id > 0) {
                        _this.$scope.globals = {
                            currentUser: {
                                token: token,
                                profile: userResponse[0]
                            }
                        };
                        _this.$cookieStore.put('globals', _this.$scope.globals);
                        callback({ 'success': true });
                    }
                    else {
                        _this.ClearCredentials();
                        callback({ 'success': false });
                    }
                });
            }
            else {
                _this.ClearCredentials();
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
        var profile = this.jwt.decodeToken(token);
        this.ProfilesService.GetOneByUserID(profile.user_id)
            .then(function (profile) {
            callback(profile);
        });
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
angular.module(init_1.Module).factory("AuthenticationService", ["$http", "$cookieStore", "$rootScope", "config", "jwtHelper", "ProfilesService", "envService", NewAuthenticationService]);
function NewAuthenticationService($http, $cookieStore, $scope, config, jwt, ProfilesService, envService) {
    return new AuthenticationService($http, $cookieStore, $scope, config, jwt, ProfilesService, envService);
}
exports.NewAuthenticationService = NewAuthenticationService;
//# sourceMappingURL=authentication.js.map