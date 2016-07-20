(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'PageService'];
    function LoginController($location, AuthenticationService, FlashService, PageService) {
        var c = this;
        c.login = login;
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Login');
            PageService.setSlug('login');
            AuthenticationService.ClearCredentials();
        })();
        function login() {
            AuthenticationService.Login(c.username, c.password, function (response) {
                if (typeof response.token == 'string' && response.token.length > 0) {
                    AuthenticationService.SetCredentials(response.token, function(response) {
                        if (typeof response.success == 'boolean' && response.success == true) {
                            $location.path('/');
                        } else {
                            FlashService.Error(['The username and password you entered don\'t match.']);  
                        }
                    });
                } else {
                    FlashService.Error(['The username and password you entered don\'t match.']);
                }
            });
        };
    }
})();
