///<reference path="../../../../../typings/angularjs/angular.d.ts"/>

module PageService {

    interface IService {
        website_title: string;
        html_title: string;
        slug: string;
    }

    export class Page {
        public service :IService;
        public config: any;
        static $inject = ["config", "$http"];

        constructor(config: ng.IAngularBootstrapConfig) {
            this.config = config;
        }

        resetData() {
            this.service.website_title = this.config.appTitle;
            this.service.html_title = this.config.appTitle;
            this.service.slug = '';
        }
    }
}

(function () {
    'use strict';
    angular
        .module('app')
        .factory('PageService', PageService);
    PageService.$inject = [
        '$http',
        'config'
    ];
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
