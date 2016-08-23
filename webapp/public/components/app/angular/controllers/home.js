///<reference path="../_all.ts"/>
var App;
(function (App) {
    'use strict';
    var HomeController = (function () {
        function HomeController(PageService, _ProjectService) {
            this.PageService = PageService;
            this._ProjectService = _ProjectService;
            this.title = "Home";
            this.slug = "home";
            PageService.resetData();
            PageService.setHtmlTitle(this.title);
            PageService.setSlug(this.slug);
            this.projectService = _ProjectService;
        }
        HomeController.prototype.loadActiveProjects = function () {
            this.projectService.GetActiveProjects()
                .then(function (projects) {
                this.c.getActiveProjects = projects;
            });
        };
        HomeController.prototype.loadFinishedProjects = function () {
            this.projectService.GetFinishedProjects()
                .then(function (projects) {
                this.c.getFinishedProjects = projects;
            });
        };
        HomeController.id = "HomeController";
        return HomeController;
    }());
    App.HomeController = HomeController;
    angular.module(App.Module)
        .controller(HomeController.id, HomeController);
})(App || (App = {}));
//# sourceMappingURL=home.js.map