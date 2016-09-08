"use strict";
///<reference path="../_all.ts"/>
var init_1 = require("../init");
var PageService = (function () {
    function PageService(config, $scope) {
        this.config = config;
        this.$scope = $scope;
    }
    PageService.prototype.resetData = function () {
        this.$scope.page.website_title = this.config.appTitle;
        this.$scope.page.html_title = this.config.appTitle;
        this.$scope.page.slug = '';
        return '';
    };
    PageService.prototype.setHtmlTitle = function (html_title) {
        this.$scope.page.html_title = html_title + ' | ' + this.$scope.page.html_title;
        return '';
    };
    PageService.prototype.setSlug = function (slug) {
        this.$scope.page.slug = slug;
        return '';
    };
    return PageService;
}());
exports.PageService = PageService;
angular.module(init_1.Module).factory("PageService", ["config", "$rootScope", NewPageService]);
function NewPageService(config, $scope) {
    return new PageService(config, $scope);
}
exports.NewPageService = NewPageService;
//# sourceMappingURL=page.js.map