///<reference path="../_all.ts"/>
"use strict";
var init_1 = require("../init");
var PageController = (function () {
    function PageController($scope, config, PageService) {
        this.$scope = $scope;
        this.config = config;
        this.PageService = PageService;
        $scope.page = PageService;
        $scope.page.resetData();
    }
    PageController.id = "PageController";
    return PageController;
}());
exports.PageController = PageController;
angular.module(init_1.Module).controller("PageController", ["$rootScope", "config", "PageService", NewPageController]);
function NewPageController($scope, config, PageService) {
    return new PageController($scope, config, PageService);
}
//# sourceMappingURL=page.js.map