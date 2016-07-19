(function () {
    'use strict';
    angular
        .module('app')
        .controller('AccountController', AccountController);
    AccountController.$inject = ['$rootScope', '$location', 'PageService', 'ProfilesService', 'FlashService', 'AuthenticationService', 'UsersService'];
    function AccountController($rootScope, $location, PageService, ProfilesService, FlashService, AuthenticationService, UsersService) {
        var c = this;
        c.change = change;
        c.accountData = {};
        c.accountData.user = {};
        c.accountData.user.username = $rootScope.globals.currentUser.profile.user.username;
        c.accountData.profile = {};
        c.accountData.profile.email_address = $rootScope.globals.currentUser.profile.email_address;
        c.accountData.profile.first_name = $rootScope.globals.currentUser.profile.first_name;
        c.accountData.profile.last_name = $rootScope.globals.currentUser.profile.last_name;
        c.accountData.profile.job_title = $rootScope.globals.currentUser.profile.job_title;
        c.accountData.profile.phone_number = $rootScope.globals.currentUser.profile.phone_number;
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Account');
            PageService.setSlug('account');
        })();
        function change() {
            ProfilesService.Edit(c.accountData.profile, function (response) {
                if (typeof response.id == 'number' && response.id > 0) {
                    AuthenticationService.SetCredentials($rootScope.globals.currentUser.token, function(response) {});
                    UsersService.Edit(c.accountData.user, function (response) {
                        if (typeof response.id == 'number' && response.id > 0) {
                            AuthenticationService.SetCredentials($rootScope.globals.currentUser.token, function(response) {});
                            FlashService.Success('Your account has been successfully updated.');
                        } else {
                            var error = [];
                            angular.forEach(response, function(value1, key1) {
                                error.push(key1 + ': ' + value1);
                            });
                            FlashService.Error(error.join('<br>'));
                        }
                    });
                } else {
                    var error = [];
                    angular.forEach(response, function(value1, key1) {
                        error.push(key1 + ': ' + value1);
                    });
                    FlashService.Error(error.join('<br>'));
                }
            });
        };
    }
})();