///<reference path="../_all.ts"/>
var App;
(function (App) {
    'use strict';
    var PageService = (function () {
        function PageService(config) {
            this.config = config;
        }
        PageService.prototype.resetData = function () {
            this.service.website_title = this.config.appTitle;
            this.service.html_title = this.config.appTitle;
            this.service.slug = '';
        };
        PageService.prototype.setHtmlTitle = function (html_title) {
            this.service.html_title = html_title + ' | ' + this.service.html_title;
        };
        PageService.prototype.setSlug = function (slug) {
            this.service.slug = slug;
        };
        PageService.id = "PageService";
        PageService.$inject = [
            "config",
            "$http"
        ];
        return PageService;
    }());
    App.PageService = PageService;
    angular.module(App.Module)
        .factory(PageService.id, PageService);
})(App || (App = {}));
//# sourceMappingURL=page.js.map