///<reference path="_all.ts"/>
'use strict';
var init_1 = require("./init");
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
exports.matchMonthAndYear = matchMonthAndYear;
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
exports.dateRange = dateRange;
angular.module(init_1.Module).filter("matchMonthAndYear", matchMonthAndYear);
angular.module(init_1.Module).filter("dateRange", dateRange);
//# sourceMappingURL=filters.js.map