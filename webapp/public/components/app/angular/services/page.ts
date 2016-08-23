///<reference path="../_all.ts"/>

module App {
    'use strict';
    interface IPageService {
        website_title:string;
        html_title:string;
        slug:string;
    }

    export class PageService {
        static id = "PageService";

        public service:IPageService;
        public config:any;
        public static $inject = [
            "config",
            "$http"
        ];

        constructor(config:angular.environment.Config) {
            this.config = config;
        }

        resetData() {
            this.service.website_title = this.config.appTitle;
            this.service.html_title = this.config.appTitle;
            this.service.slug = '';
        }

        setHtmlTitle(html_title:string) {
            this.service.html_title = html_title + ' | ' + this.service.html_title;
        }

        setSlug(slug:string) {
            this.service.slug = slug;
        }

    }

    angular.module(Module)
        .factory(PageService.id, PageService);
}

