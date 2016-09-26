///<reference path="./_all.ts"/>
import {Module} from "./init";
import IScope = angular.IScope;
var app = angular.module(Module);

app.factory('httpLoaderInterceptor', ['$rootScope', function ($rootScope:IScope) {
    // Active request count
    let requestCount = 0;

    function startRequest(config:any) {
        // If no request ongoing, then broadcast start event
        if (!requestCount) {
            $rootScope.$broadcast('httpLoaderStart');
        }

        requestCount++;
        return config;
    }

    function endRequest(arg:any) {
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

app.config(['$httpProvider', function ($httpProvider:ng.IHttpProvider) {
     $httpProvider.interceptors.push('httpLoaderInterceptor');
}]);

app.directive('httpLoader', function () {
    return {
        restrict: 'EA',
        link: function (scope:IScope, element:any) {
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