///<reference path="../_all.ts"/>

import {PageService} from "../services/page";
import {Module} from "../init";
import {FlashService} from "../services/flash";
import {ProfilesService} from "../services/profiles";
import {AuthenticationService} from "../services/authentication";
import {UsersService} from "../services/users";
import {IScope} from "../interface";

export class AccountController {

    public c = this;
    public accountData:any = {};
    public profile:any = {};
    public user:any = {};
    public readableKeys = {
        email_address: 'Email address',
        first_name: 'First name',
        last_name: 'Last name',
        job_title: 'Job title',
        phone_number: 'Phone number',
        current_password: 'Current password',
        new_password: 'New password',
        confirm_new_password: 'Confirm new password'
    };

    constructor(private $scope:IScope,
                private $location:ng.ILocationService,
                private PageService:PageService,
                private ProfilesService:ProfilesService,
                private FlashService:FlashService,
                private AuthenticationService:AuthenticationService,
                private UsersService:UsersService) {
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

    changeProfile() {
        let messages:any = [];
        this.ProfilesService.Edit(this.c.accountData.profile, (response:any) => {
            if (typeof response.id == 'number' && response.id > 0) {
                this.$scope.globals.currentUser.profile = response;
                this.FlashService.Success(['Your account has been successfully updated.'], false);
            } else {
                var self:any = this;
                angular.forEach(response, function (value:any, key:any) {
                    messages.push(self.c.readableKeys[key] + ': ' + value);
                });
                this.FlashService.Error(messages, false);
            }
        });
    }

    changePassword() {
        let messages:any = [];
        this.UsersService.Edit(this.c.accountData.user, (response:any) => {
            if (typeof response.id == 'number' && response.id > 0) {
                this.FlashService.Success(['Your account has been successfully updated.'], false);
            } else {
                var self:any = this;
                angular.forEach(response, function (value:any, key:any) {
                    messages.push(self.c.readableKeys[key] + ': ' + value);
                });
                this.FlashService.Error(messages, false);
            }
        });
    };
}

angular.module(Module).controller("AccountController", ['$rootScope',
    '$location',
    'PageService',
    'ProfilesService',
    'FlashService',
    'AuthenticationService',
    'UsersService', NewAccountController]);
function NewAccountController($scope:IScope,
                              $location:ng.ILocationService,
                              PageService:PageService,
                              ProfilesService:ProfilesService,
                              FlashService:FlashService,
                              AuthenticationService:AuthenticationService,
                              UsersService:UsersService) {
    return new AccountController($scope, $location, PageService, ProfilesService, FlashService, AuthenticationService, UsersService);
}