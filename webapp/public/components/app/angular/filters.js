(function () {
    'use strict';
    var app = angular.module('app')

    app.filter("dateRange", function () {
        return function (items, from, to) {
            var df = new Date(from);
            var dt = new Date(to);
            var result = [];
            for (var i = 0; i < items.length; i++) {
                if(typeof(items[i].date) !== 'undefined') {
                    var tf = new Date(items[i].date)
                }

                if(typeof(items[i].max_date) !== 'undefined') {
                    var tf = new Date(items[i].max_date);
                }

                if (tf >= df && tf <= dt) {
                    result.push(items[i]);
                }
            }
            return result;
        };
    });

})();