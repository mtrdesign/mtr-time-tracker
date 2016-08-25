///<reference path="../_all.ts"/>

import {PageService} from "../services/page";
import {Module, IScope, IEnvConfig} from "../init";

export class PageController {
    static id = "PageController";

    constructor(private $scope:IScope, 
                private config:IEnvConfig, 
                private PageService:PageService) {
        $scope.page = PageService;
        $scope.page.resetData();
    }

}

angular.module(Module).controller("PageController", ["$rootScope", "config", "PageService", NewPageController]);
function NewPageController($scope:IScope, config:IEnvConfig, PageService:PageService) {
    return new PageController($scope, config, PageService);
}