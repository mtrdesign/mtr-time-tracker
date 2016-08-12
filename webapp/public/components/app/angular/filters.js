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

    app.factory('httpLoaderInterceptor', ['$rootScope', function ($rootScope) {
        // Active request count
        var requestCount = 0;

        function startRequest(config) {
            // If no request ongoing, then broadcast start event
            if (!requestCount) {
                $rootScope.$broadcast('httpLoaderStart');
            }

            requestCount++;
            return config;
        }

        function endRequest(arg) {
            // No request ongoing, so make sure we don’t go to negative count
            if (!requestCount)
                return;

            requestCount--;
            // If it was last ongoing request, broadcast event
            if (!requestCount) {
                $rootScope.$broadcast('httpLoaderEnd');
            }

            return arg;
        }

        // Return interceptor configuration object
        return {
            'request': startRequest,
            'requestError': endRequest,
            'response': endRequest,
            'responseError': endRequest
        };
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpLoaderInterceptor');
    }]);

    app.directive('httpLoader', function () {
        return {
            restrict: 'EA',
            link: function (scope, element) {
                // Store original display mode of element
                var shownType = element.css('display');
                console.log(element);
                function hideElement() {
                    element.css('display', 'none');
                }

                scope.$on('httpLoaderStart', function () {
                    element.css('display', shownType);
                });

                scope.$on('httpLoaderEnd', hideElement);

                // Initially hidden
                hideElement();
            }
        };
    });

})();