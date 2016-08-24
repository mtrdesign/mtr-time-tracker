///<reference path="../_all.ts"/>
var App;
(function (App) {
    'use strict';
    var PageController = (function () {
        function PageController(scope) {
            this.scope = scope;
            scope.page = App.PageService;
        }
        PageController.id = "PageController";
        return PageController;
    }());
    App.PageController = PageController;
    angular.module(App.Module)
        .controller(PageController.id, PageController);
})(App || (App = {}));
//# sourceMappingURL=page.js.map