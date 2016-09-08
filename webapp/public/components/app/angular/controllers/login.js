///<reference path="../_all.ts"/>
"use strict";
var init_1 = require("../init");
var LoginController = (function () {
    function LoginController($location, PageService, AuthenticationService, FlashService) {
        this.$location = $location;
        this.PageService = PageService;
        this.AuthenticationService = AuthenticationService;
        this.FlashService = FlashService;
        this.c = this;
        PageService.resetData();
        PageService.setHtmlTitle('Login');
        PageService.setSlug('login');
        AuthenticationService.ClearCredentials();
    }
    LoginController.prototype.login = function () {
        var _this = this;
        this.AuthenticationService.Login(this.c.username, this.c.password, function (response) {
            var self = _this;
            if (typeof response.token == 'string' && response.token.length > 0) {
                _this.AuthenticationService.SetCredentials(response.token, function (response) {
                    var self = _this;
                    if (typeof response.success == 'boolean' && response.success == true) {
                        self.$location.path('/');
                    }
                    else {
                        self.FlashService.Error(['The username and password you entered don\'t match.']);
                    }
                });
            }
            else {
                self.FlashService.Error(['The username and password you entered don\'t match.']);
            }
        });
    };
    ;
    return LoginController;
}());
exports.LoginController = LoginController;
angular.module(init_1.Module).controller("LoginController", [
    "$location",
    "PageService",
    "AuthenticationService",
    "FlashService",
    NewLoginController]);
function NewLoginController($location, PageService, AuthenticationService, FlashService) {
    return new LoginController($location, PageService, AuthenticationService, FlashService);
}
exports.NewLoginController = NewLoginController;
//# sourceMappingURL=login.js.map