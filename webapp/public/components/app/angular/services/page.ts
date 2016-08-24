///<reference path="../_all.ts"/>
import {Module} from "../init";

export interface IService {
    website_title:string;
    html_title:string;
    slug:string;
}

export interface IPageService {
    resetData(text:string):string;
    setHtmlTitle(text:string):string
    setSlug(text:string):string
}

export class PageService implements IPageService {
    static id = "PageService";
    static $inject = ['config'];

    public website_title:string;
    public html_title:string;
    public slug:string;

    constructor(private config:angular.environment.Config) {
    }

    public resetData() {
        this.website_title = this.config.appTitle;
        this.html_title = this.config.appTitle;
        this.slug = '';
        return '';
    }

    public setHtmlTitle(html_title:string) {
        this.service.html_title = html_title + ' | ' + this.service.html_title;
        return '';
    }

    public setSlug(slug:string) {
        this.slug = slug;
        return '';
    }
}

angular.module(Module).controller("PageService", ["config", NewPageService]);
export function NewPageService(config) {
    return new PageService(config);
}
