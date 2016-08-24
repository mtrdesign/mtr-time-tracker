"use strict";
///<reference path="../_all.ts"/>
var init_1 = require("../init");
var PageService = (function () {
    function PageService(config) {
        this.config = config;
    }
    PageService.prototype.resetData = function () {
        this.website_title = this.config.appTitle;
        this.html_title = this.config.appTitle;
        this.slug = '';
        return '';
    };
    PageService.prototype.setHtmlTitle = function (html_title) {
        this.service.html_title = html_title + ' | ' + this.service.html_title;
        return '';
    };
    PageService.prototype.setSlug = function (slug) {
        this.slug = slug;
        return '';
    };
    PageService.id = "PageService";
    PageService.$inject = ['config'];
    return PageService;
}());
exports.PageService = PageService;
angular.module(init_1.Module).controller("PageService", ["config", NewPageService]);
function NewPageService(config) {
    return new PageService(config);
}
exports.NewPageService = NewPageService;
//# sourceMappingURL=page.js.map