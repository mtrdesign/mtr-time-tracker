///<reference path="../../../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    function matchMonthAndYear() {
        return function (items, month, year) {
            var result = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].month == month && items[i].year == year) {
                    result.push(items[i]);
                }
            }
            return result;
        };
    }
    app.matchMonthAndYear = matchMonthAndYear;
    function dateRange() {
        return function (items, month, year) {
            var d = new Date();
            d.setFullYear(year, month - 1, 1);
            var df = d.setHours(0, 0);
            d.setFullYear(year, month, 0);
            var dt = d.setHours(23, 59);
            var result = [];
            for (var i = 0; i < items.length; i++) {
                var tf = new Date(items[i].date);
                if (tf >= df && tf <= dt) {
                    result.push(items[i]);
                }
            }
            return result;
        };
    }
    app.dateRange = dateRange;
})(app || (app = {}));
(function () {
    'use strict';
    angular.module(Module).filter("matchMonthAndYear", app.matchMonthAndYear);
    angular.module(Module).filter("dateRange", app.dateRange);
})();
//# sourceMappingURL=filters.js.map