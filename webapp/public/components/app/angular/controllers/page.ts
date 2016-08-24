///<reference path="../_all.ts"/>

import {NewPageService} from "../services/page";
import IScope = angular.IScope;
import {Module} from "../init";

export class PageController {
    static id = "PageController";

    constructor(private $scope:IScope, private config:angular.environment.Config) {
        $scope.page = NewPageService(config);
        debugger;
    }

}

angular.module(Module).controller("PageController", ["$scope", "config", NewPageController]);
function NewPageController($scope, config) {
    return new PageController($scope, config);
}