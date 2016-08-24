///<reference path="../_all.ts"/>
'use strict';
var Module = App.Module;
var HomeController = (function () {
    function HomeController(PageService, ProjectService) {
        this.PageService = PageService;
        this.ProjectService = ProjectService;
        this.title = "Home";
        this.slug = "home";
        PageService.resetData();
        PageService.setHtmlTitle(this.title);
        PageService.setSlug(this.slug);
        this.projectService = ProjectService;
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
angular.module(Module)
    .controller(HomeController.id, ["PageService", "ProjectService", HomeController]);
//# sourceMappingURL=home.js.map