///<reference path="../_all.ts"/>
var App;
(function (App) {
    'use strict';
    var NotFoundController = (function () {
        function NotFoundController(PageService) {
            this.PageService = PageService;
            this.title = 'Oops! That page can\'t be found.';
            this.slug = "404";
            PageService.resetData();
            PageService.setHtmlTitle(this.title);
            PageService.setSlug(this.slug);
            this.projectService = _ProjectService;
        }
        NotFoundController.id = "NotFoundController";
        return NotFoundController;
    }());
    App.NotFoundController = NotFoundController;
    angular.module(App.Module)
        .controller(NotFoundController.id, NotFoundController);
})(App || (App = {}));
//# sourceMappingURL=404.js.map