(function () {
    'use strict';
    angular
        .module('app')
        .controller('NotFoundController', NotFoundController);
    NotFoundController.$inject = ['ProjectsService', '$rootScope', 'PageService'];
    function NotFoundController(ProjectsService, $rootScope, PageService) {
        var c = this;
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Oops! That page can’t be found.');
            PageService.setSlug('404');
        })();
    }
})();