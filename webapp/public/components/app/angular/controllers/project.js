(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProjectController', ProjectController);
    ProjectController.$inject = ['$rootScope', 'PageService'];
    function ProjectController($rootScope, PageService) {
        var c = this;
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Projects');
            PageService.setSlug('projects');
        })();
    }
})();