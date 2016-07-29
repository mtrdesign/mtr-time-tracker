(function () {
    'use strict';
    angular
        .module('app')
        .controller('AccountController', AccountController);
    AccountController.$inject = ['$rootScope', '$location', 'PageService', 'ProfilesService', 'FlashService', 'AuthenticationService', 'UsersService'];
    function AccountController($rootScope, $location, PageService, ProfilesService, FlashService, AuthenticationService, UsersService) {
        var c = this;
        c.changeProfile = changeProfile;
        c.changePassword = changePassword;
        c.accountData = {};
        c.accountData.user = {};
        c.accountData.user.current_password = '';
        c.accountData.user.new_password = '';
        c.accountData.user.confirm_new_password = '';
        c.accountData.profile = {};
        c.accountData.profile.email_address = $rootScope.globals.currentUser.profile.email_address;
        c.accountData.profile.first_name = $rootScope.globals.currentUser.profile.first_name;
        c.accountData.profile.last_name = $rootScope.globals.currentUser.profile.last_name;
        c.accountData.profile.job_title = $rootScope.globals.currentUser.profile.job_title;
        c.accountData.profile.phone_number = $rootScope.globals.currentUser.profile.phone_number;
        c.readableKeys = {};
        c.readableKeys.email_address = 'Email address';
        c.readableKeys.first_name = 'First name';
        c.readableKeys.last_name = 'Last name';
        c.readableKeys.job_title = 'Job title';
        c.readableKeys.phone_number = 'Phone number';
        c.readableKeys.current_password = 'Current password';
        c.readableKeys.new_password = 'New password';
        c.readableKeys.confirm_new_password = 'Confirm new password';
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Account');
            PageService.setSlug('account');
        })();
        function changeProfile() {
            var messages = [];
            ProfilesService.Edit(c.accountData.profile, function (response) {
                if (typeof response.id == 'number' && response.id > 0) {
                    FlashService.Success(['Your account has been successfully updated.']);
                } else {
                    angular.forEach(response, function(value, key) {
                        messages.push(c.readableKeys[key] + ': ' + value);
                    });
                    FlashService.Error(messages);
                }
            });
        };
        function changePassword() {
            var messages = [];
            UsersService.Edit(c.accountData.user, function (response) {
                if (typeof response.id == 'number' && response.id > 0) {
                    FlashService.Success(['Your account has been successfully updated.']);
                } else {
                    angular.forEach(response, function(value, key) {
                        messages.push(c.readableKeys[key] + ': ' + value);
                    });
                    FlashService.Error(messages);
                }
            });
        };
    }
})();