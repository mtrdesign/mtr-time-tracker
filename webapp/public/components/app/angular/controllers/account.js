///<reference path="../_all.ts"/>
"use strict";
var init_1 = require("../init");
var AccountController = (function () {
    function AccountController($scope, $location, PageService, ProfilesService, FlashService, AuthenticationService, UsersService) {
        this.$scope = $scope;
        this.$location = $location;
        this.PageService = PageService;
        this.ProfilesService = ProfilesService;
        this.FlashService = FlashService;
        this.AuthenticationService = AuthenticationService;
        this.UsersService = UsersService;
        this.c = this;
        PageService.resetData();
        PageService.setHtmlTitle('Account');
        PageService.setSlug('account');
    }
    AccountController.prototype.changeProfile = function () {
        var messages = [];
        this.ProfilesService.Edit(this.c.accountData.profile, function (response) {
            if (typeof response.id == 'number' && response.id > 0) {
                this.$scope.globals.currentUser.profile = response;
                this.FlashService.Success(['Your account has been successfully updated.']);
            }
            else {
                angular.forEach(response, function (value, key) {
                    messages.push(this.c.readableKeys[key] + ': ' + value);
                });
                this.FlashService.Error(messages);
            }
        });
    };
    ;
    AccountController.prototype.changePassword = function () {
        var messages = [];
        this.UsersService.Edit(this.c.accountData.user, function (response) {
            if (typeof response.id == 'number' && response.id > 0) {
                this.FlashService.Success(['Your account has been successfully updated.']);
            }
            else {
                angular.forEach(response, function (value, key) {
                    messages.push(this.c.readableKeys[key] + ': ' + value);
                });
                this.FlashService.Error(messages);
            }
        });
    };
    ;
    return AccountController;
}());
exports.AccountController = AccountController;
angular.module(init_1.Module).controller("AccountController", ['$rootScope',
    '$location',
    'PageService',
    'ProfilesService',
    'FlashService',
    'AuthenticationService',
    'UsersService', NewAccountController]);
function NewAccountController($scope, $location, PageService, ProfilesService, FlashService, AuthenticationService, UsersService) {
    return new AccountController($scope, $location, PageService, ProfilesService, FlashService, AuthenticationService, UsersService);
}
