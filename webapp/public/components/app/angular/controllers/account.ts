///<reference path="../_all.ts"/>

import {PageService} from "../services/page";
import {Module, IScope, IEnvConfig} from "../init";
import {FlashService} from "../services/flash";
import {ProfilesService} from "../services/profiles";
import {AuthenticationService} from "../services/authentication";
import {UsersService} from "../services/users";

export class AccountController {

    public c = this;
    public accountData:any;

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
    }

    changeProfile() {
        let messages:any = [];
        this.ProfilesService.Edit(this.c.accountData.profile, function (response:any) {
            if (typeof response.id == 'number' && response.id > 0) {
                this.$scope.globals.currentUser.profile = response;
                this.FlashService.Success(['Your account has been successfully updated.']);
            } else {
                angular.forEach(response, function (value:any, key:any) {
                    messages.push(this.c.readableKeys[key] + ': ' + value);
                });
                this.FlashService.Error(messages);
            }
        });
    };

    changePassword() {
        let messages:any = [];
        this.UsersService.Edit(this.c.accountData.user, function (response:any) {
            if (typeof response.id == 'number' && response.id > 0) {
                this.FlashService.Success(['Your account has been successfully updated.']);
            } else {
                angular.forEach(response, function (value:any, key:any) {
                    messages.push(this.c.readableKeys[key] + ': ' + value);
                });
                this.FlashService.Error(messages);
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