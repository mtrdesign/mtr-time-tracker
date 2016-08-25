///<reference path="../_all.ts"/>
'use strict';
var init_1 = require("../init");
var HomeController = (function () {
    function HomeController(PageService) {
        this.PageService = PageService;
        this.title = "Home";
        this.slug = "home";
        PageService.resetData();
        PageService.setHtmlTitle(this.title);
        PageService.setSlug(this.slug);
        // this.projectService = ProjectService
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
exports.HomeController = HomeController;
angular.module(init_1.Module)
    .controller("HomeController", ["PageService", "ProjectService", HomeController]);
angular.module(init_1.Module).controller("HomeController", [
    "PageService",
    // "ProjectService",
    NewHomeController]);
function NewHomeController(PageService) {
    return new HomeController(PageService);
}
exports.NewHomeController = NewHomeController;
