(function () {
    'use strict';
    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'components/app/angular/views/home.html',
                controllerAs: 'c'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'components/app/angular/views/login.html',
                controllerAs: 'c'
            })
            .otherwise({ redirectTo: '/login' });
    }
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common.Authorization = 'JWT ' + $rootScope.globals.currentUser.token;
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            if (restrictedPage && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }
})();