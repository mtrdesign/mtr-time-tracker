(function () {
    'use strict';
    var app = angular.module('app');
    app.filter('matchMonthAndYear', function () {
        return function (items, month, year) {
            var result = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].month == month && items[i].year == year) {
                    result.push(items[i]);
                }
            }
            return result;
        };
    });

    app.filter("dateRange", function () {
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
    });

})();