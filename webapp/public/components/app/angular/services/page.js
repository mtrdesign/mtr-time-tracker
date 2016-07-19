(function () {
    'use strict';
    angular
        .module('app')
        .factory('PageService', PageService);
    PageService.$inject = ['$http', 'config'];
    function PageService($http, config) {
        var service = {};
        service.setHtmlTitle = setHtmlTitle;
        service.setSlug = setSlug;
        service.resetData = resetData;
        resetData();
        function resetData() {
            service.website_title = config.appTitle;
            service.html_title = config.appTitle;
            service.slug = '';
        }
        function setHtmlTitle(html_title) {
            service.html_title = html_title + ' | ' + service.html_title;
        }
        function setSlug(slug) {
            service.slug = slug;
        }
        return service;
    }
})();
