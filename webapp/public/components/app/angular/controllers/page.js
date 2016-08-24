///<reference path="../_all.ts"/>
"use strict";
var page_1 = require("../services/page");
var init_1 = require("../init");
var PageController = (function () {
    function PageController($scope, config) {
        this.$scope = $scope;
        this.config = config;
        $scope.page = page_1.NewPageService(config);
        debugger;
    }
    PageController.id = "PageController";
    return PageController;
}());
exports.PageController = PageController;
angular.module(init_1.Module).controller("PageController", ["$scope", "config", NewPageController]);
function NewPageController($scope, config) {
    return new PageController($scope, config);
}
//# sourceMappingURL=page.js.map