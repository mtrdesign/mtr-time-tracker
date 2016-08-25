"use strict";
///<reference path="./_all.ts"/>
var init_1 = require("./init");
var app = angular.module(init_1.Module);
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
// app.config(['$httpProvider', function ($httpProvider:ng.IHttpProvider) {
//     $httpProvider.interceptors.push('httpLoaderInterceptor');
// }]);
app.directive('httpLoader', function () {
    return {
        restrict: 'EA',
        link: function (scope, element) {
            // Store original display mode of element
            var shownType = element.css('display');
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
