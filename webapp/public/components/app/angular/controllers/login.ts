///<reference path="../_all.ts"/>

import {Module} from "../init";
import {PageService} from "../services/page";
import {AuthenticationService} from "../services/authentication";
import {FlashService} from "../services/flash";
import {IScope} from "../interface";

export class LoginController {
    public c = this;
    public username:string;
    public password:string;
    scope:IScope;

    constructor(public $location:angular.ILocationService,
                public PageService:PageService,
                public AuthenticationService:AuthenticationService,
                public FlashService:FlashService) {
        PageService.resetData();
        PageService.setHtmlTitle('Login');
        PageService.setSlug('login');
        AuthenticationService.ClearCredentials();
    }

    login() {
        this.AuthenticationService.Login(this.c.username, this.c.password, (response:any) => {
            let self:any = this;
            if (typeof response.token == 'string' && response.token.length > 0) {
                this.AuthenticationService.SetCredentials(response.token, (response:any) => {
                    let self:any = this;
                    if (typeof response.success == 'boolean' && response.success == true) {
                        self.$location.path('/');
                    } else {
                        self.FlashService.Error(['The username and password you entered don\'t match.']);
                    }
                });
            } else {
                self.FlashService.Error(['The username and password you entered don\'t match.']);
            }
        });
    };
}

angular.module(Module).controller("LoginController", [
    "$location",
    "PageService",
    "AuthenticationService",
    "FlashService",
    NewLoginController]);
export function NewLoginController($location:angular.ILocationService,
                                   PageService:PageService,
                                   AuthenticationService:AuthenticationService,
                                   FlashService:FlashService) {
    return new LoginController($location, PageService, AuthenticationService, FlashService);
}