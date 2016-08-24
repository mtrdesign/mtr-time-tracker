///<reference path="_all.ts"/>
var App;
(function (App) {
    'use strict';
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
    App.matchMonthAndYear = matchMonthAndYear;
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
    App.dateRange = dateRange;
    angular.module(App.Module).filter("matchMonthAndYear", matchMonthAndYear);
    angular.module(App.Module).filter("dateRange", dateRange);
})(App || (App = {}));
//# sourceMappingURL=filters.js.map