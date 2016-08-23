///<reference path="../_all.ts"/>

module App {
    'use strict';
    export class HomeController {
        static id = "HomeController";

        public title:string = "Home";
        public slug:string = "home";
        public c:any;
        public projectService:any;

        constructor(private PageService:PageService, private _ProjectService:ProjectService) {
            PageService.resetData();
            PageService.setHtmlTitle(this.title);
            PageService.setSlug(this.slug);
            this.projectService = _ProjectService
        }

        public loadActiveProjects():any {
            this.projectService.GetActiveProjects()
                .then(function (projects: any) {
                    this.c.getActiveProjects = projects;
                });
        }

        public loadFinishedProjects():any {
            this.projectService.GetFinishedProjects()
                .then(function (projects: any) {
                    this.c.getFinishedProjects = projects;
                });
        }

    }

    angular.module(Module)
        .controller(HomeController.id, HomeController);

}