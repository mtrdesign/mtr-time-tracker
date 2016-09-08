///<reference path="../_all.ts"/>
'use strict';
var init_1 = require("../init");
var NotFoundController = (function () {
    function NotFoundController(PageService) {
        this.PageService = PageService;
        this.title = 'Oops! That page can\'t be found.';
        this.slug = "404";
        PageService.resetData();
        PageService.setHtmlTitle(this.title);
        PageService.setSlug(this.slug);
    }
    return NotFoundController;
}());
exports.NotFoundController = NotFoundController;
angular.module(init_1.Module).controller("NotFoundController", ["PageService", NewNotFoundController]);
function NewNotFoundController(PageService) {
    return new NotFoundController(PageService);
}
exports.NewNotFoundController = NewNotFoundController;
//# sourceMappingURL=404.js.map