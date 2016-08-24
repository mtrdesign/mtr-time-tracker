///<reference path="../_all.ts"/>

'use strict';
import PageService = App.PageService;
import ProjectService = App.ProjectService;
import Module = App.Module;

export class HomeController {
    static id = "HomeController";

    public title:string = "Home";
    public slug:string = "home";
    public c:any;
    public projectService:any;

    constructor(private PageService:PageService, private ProjectService:ProjectService) {
        PageService.resetData();
        PageService.setHtmlTitle(this.title);
        PageService.setSlug(this.slug);
        this.projectService = ProjectService
    }

    public loadActiveProjects():any {
        this.projectService.GetActiveProjects()
            .then(function (projects:any) {
                this.c.getActiveProjects = projects;
            });
    }

    public loadFinishedProjects():any {
        this.projectService.GetFinishedProjects()
            .then(function (projects:any) {
                this.c.getFinishedProjects = projects;
            });
    }

}

angular.module(Module)
    .controller(HomeController.id, ["PageService", "ProjectService", HomeController]);
