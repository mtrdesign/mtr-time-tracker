(function () {
    'use strict';
    angular
        .module('app', ['ngRoute', 'ngCookies', 'angular-jwt', 'environment', 'angularMoment'])
        .config(config)
        .constant('config', {  
            appTitle: 'MTR Design Projects'
        })
        .run(run);
    config.$inject = ['$routeProvider', '$locationProvider', 'envServiceProvider'];
    function config($routeProvider, $locationProvider, envServiceProvider) {
        envServiceProvider.config({
            domains: {
                development: ['mtr-time-tracker.dev'],
                production: ['mtr-time-tracker.aws.mtrdev.com']
            },
            vars: {
                development: {
                    apiUrl: '//127.0.0.1:8000/time-tracker/api'
                },
                production: {
                    apiUrl: '//api.mtr-time-tracker.aws.mtrdev.com/time-tracker/api'
                }
            }
        });
        envServiceProvider.check();
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'components/app/angular/views/home.html',
                controllerAs: 'c'
            })
            .when('/account', {
                controller: 'AccountController',
                templateUrl: 'components/app/angular/views/account.html',
                controllerAs: 'c'
            })
            .when('/projects/:id/time-reports', {
                controller: 'ProjectController',
                templateUrl: 'components/app/angular/views/project.html',
                controllerAs: 'c'
            })
            .when('/projects/:id/time-reports/new', {
                controller: 'TimeReportNewController',
                templateUrl: 'components/app/angular/views/time-reports/new.html',
                controllerAs: 'c'
            })
            .when('/time-reports', {
                controller: 'TimeReportListController',
                templateUrl: 'components/app/angular/views/time-reports/list.html',
                controllerAs: 'c'
            })
            .when('/time-reports/:id', {
                controller: 'TimeReportEditController',
                templateUrl: 'components/app/angular/views/time-reports/edit.html',
                controllerAs: 'c'
            })
            .when('/404', {
                controller: 'NotFoundController',
                templateUrl: 'components/app/angular/views/404.html',
                controllerAs: 'c'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'components/app/angular/views/login.html',
                controllerAs: 'c'
            })
            .otherwise({ redirectTo: '/404' });
    }
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'config', 'envService', 'AuthenticationService', 'PageService'];
    function run($rootScope, $location, $cookieStore, $http, config, envService, AuthenticationService, PageService) {
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            AuthenticationService.SetCredentials($rootScope.globals.currentUser.token, function(response) {
                if (typeof response.success != 'boolean' || 
                    typeof response.success == 'boolean' && response.success == false) { 
                    $location.path('/login');
                } 
            });
            $http.defaults.headers.common.Authorization = 'JWT ' + $rootScope.globals.currentUser.token;
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login', '/404']) === -1;
            if (restrictedPage && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }
})();