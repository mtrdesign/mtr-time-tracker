///<reference path="../_all.ts"/>
module App {
    'use strict';
    export class PageController {
        static id = "PageController";

        constructor(private scope:globalScope) {
            scope.page = PageService;
        }
    }

    angular.module(Module)
        .controller(PageController.id, PageController);
}