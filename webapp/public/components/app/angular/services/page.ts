///<reference path="../_all.ts"/>
import {Module, IEnvConfig, IScope} from "../init";

export interface IPageService {
    resetData(text:string):string;
    setHtmlTitle(text:string):string
    setSlug(text:string):string
}

export class PageService implements IPageService {
    public website_title:string;
    public html_title:string;
    public slug:string;

    constructor(private config:IEnvConfig, 
                private $scope:IScope) {

    }

    public resetData() {
        this.$scope.page.website_title = this.config.appTitle;
        this.$scope.page.html_title = this.config.appTitle;
        this.$scope.page.slug = '';
        return '';
    }

    public setHtmlTitle(html_title:string) {
        this.$scope.page.html_title = html_title + ' | ' + this.$scope.page.html_title;
        return '';
    }

    public setSlug(slug:string) {
        this.$scope.page.slug = slug;
        return '';
    }
}

angular.module(Module).factory("PageService", ["config", "$rootScope", NewPageService]);
export function NewPageService(config:IEnvConfig, $scope:IScope) {
    return new PageService(config, $scope);
}
