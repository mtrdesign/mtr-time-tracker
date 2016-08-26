///<reference path="../_all.ts"/>

'use strict';
import {Module} from "../init";
import {PageService} from "../services/page";
export class NotFoundController {

    public title:string = 'Oops! That page can\'t be found.';
    public slug:string = "404";

    constructor(private PageService:PageService) {
        PageService.resetData();
        PageService.setHtmlTitle(this.title);
        PageService.setSlug(this.slug);
    }

}

angular.module(Module).controller("NotFoundController", ["PageService", NewNotFoundController]);
export function NewNotFoundController(PageService:PageService) {
    return new NotFoundController(PageService);
}
