///<reference path="../_all.ts"/>
'use strict';
var init_1 = require("../init");
var HomeController = (function () {
    function HomeController(PageService, ProjectsService) {
        this.PageService = PageService;
        this.ProjectsService = ProjectsService;
        this.c = this;
        PageService.resetData();
        PageService.setHtmlTitle("Home");
        PageService.setSlug("home");
        this.loadActiveProjects();
        this.loadFinishedProjects();
    }
    HomeController.prototype.loadActiveProjects = function () {
        var _this = this;
        this.ProjectsService.GetActiveProjects()
            .then(function (projects) {
            _this.c.getActiveProjects = projects;
        });
    };
    HomeController.prototype.loadFinishedProjects = function () {
        var _this = this;
        this.ProjectsService.GetFinishedProjects()
            .then(function (projects) {
            _this.c.getFinishedProjects = projects;
        });
    };
    return HomeController;
}());
exports.HomeController = HomeController;
angular.module(init_1.Module).controller("HomeController", [
    "PageService",
    "ProjectsService",
    NewHomeController]);
function NewHomeController(PageService, ProjectsService) {
    return new HomeController(PageService, ProjectsService);
}
exports.NewHomeController = NewHomeController;
//# sourceMappingURL=home.js.map