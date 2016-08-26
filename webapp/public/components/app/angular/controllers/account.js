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
        this.accountData = {};
        this.profile = {};
        this.user = {};
        this.readableKeys = {
            email_address: 'Email address',
            first_name: 'First name',
            last_name: 'Last name',
            job_title: 'Job title',
            phone_number: 'Phone number',
            current_password: 'Current password',
            new_password: 'New password',
            confirm_new_password: 'Confirm new password'
        };
        PageService.resetData();
        PageService.setHtmlTitle('Account');
        PageService.setSlug('account');
        this.c.accountData.profile = {};
        this.c.accountData.profile.email_address = $scope.globals.currentUser.profile.email_address;
        this.c.accountData.profile.first_name = $scope.globals.currentUser.profile.first_name;
        this.c.accountData.profile.last_name = $scope.globals.currentUser.profile.last_name;
        this.c.accountData.profile.job_title = $scope.globals.currentUser.profile.job_title;
        this.c.accountData.profile.phone_number = $scope.globals.currentUser.profile.phone_number;
    }
    AccountController.prototype.changeProfile = function () {
        var _this = this;
        var messages = [];
        this.ProfilesService.Edit(this.c.accountData.profile, function (response) {
            if (typeof response.id == 'number' && response.id > 0) {
                _this.$scope.globals.currentUser.profile = response;
                _this.FlashService.Success(['Your account has been successfully updated.'], false);
            }
            else {
                var self = _this;
                angular.forEach(response, function (value, key) {
                    messages.push(self.c.readableKeys[key] + ': ' + value);
                });
                _this.FlashService.Error(messages, false);
            }
        });
    };
    AccountController.prototype.changePassword = function () {
        var _this = this;
        var messages = [];
        this.UsersService.Edit(this.c.accountData.user, function (response) {
            if (typeof response.id == 'number' && response.id > 0) {
                _this.FlashService.Success(['Your account has been successfully updated.'], false);
            }
            else {
                var self = _this;
                angular.forEach(response, function (value, key) {
                    messages.push(self.c.readableKeys[key] + ': ' + value);
                });
                _this.FlashService.Error(messages, false);
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
