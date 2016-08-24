///<reference path="../_all.ts"/>

module App {
    'use strict';
    export class NotFoundController {
        static id = "NotFoundController";

        public title:string = 'Oops! That page can\'t be found.';
        public slug:string = "404";

        constructor(private PageService:PageService) {
            PageService.resetData();
            PageService.setHtmlTitle(this.title);
            PageService.setSlug(this.slug);
            this.projectService = _ProjectService
        }

    }

    angular.module(Module)
        .controller(NotFoundController.id, NotFoundController);

}