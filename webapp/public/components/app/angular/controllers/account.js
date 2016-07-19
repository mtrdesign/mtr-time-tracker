(function () {
    'use strict';
    angular
        .module('app')
        .controller('AccountController', AccountController);
    AccountController.$inject = ['$rootScope', 'PageService'];
    function AccountController($rootScope, PageService) {
        var c = this;
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Account');
            PageService.setSlug('account');
        })();
    }
})();