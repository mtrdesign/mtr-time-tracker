(function () {
    'use strict';
    angular
        .module('app')
        .controller('PageController', PageController);
    PageController.$inject = [
        '$rootScope',
        '$cookieStore',
        'PageService'
    ];
    function PageController($rootScope, $cookieStore, PageService) {
        $rootScope.page = PageService;
    }
})();