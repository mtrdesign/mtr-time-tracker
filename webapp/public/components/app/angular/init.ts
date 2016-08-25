///<reference path="_all.ts"/>
import {AuthenticationService} from "./services/authentication";
export let Module = "app";

angular.module(Module, [
    'ngRoute',
    'ngCookies',
    'angular-jwt',
    'environment',
    'angularMoment'
])
    .constant('config', {
        appTitle: 'MTR Design Projects'
    })
    .config([
        '$routeProvider',
        '$locationProvider',
        'envServiceProvider',
        ($routeProvider:angular.route.IRouteProvider,
         $locationProvider:ng.ILocationProvider,
         envServiceProvider:angular.environment.ServiceProvider) => {
            'use strict';

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
                .when('/account', {
                    controller: "HomeController",
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
                .when('/projects/:project_id/time-reports/:id', {
                    controller: 'TimeReportEditController',
                    templateUrl: 'components/app/angular/views/time-reports/edit.html',
                    controllerAs: 'c'
                })
                .when('/projects/:project_id/time-reports/:id/view', {
                    controller: 'TimeReportViewController',
                    templateUrl: 'components/app/angular/views/time-reports/view.html',
                    controllerAs: 'c'
                })
                .when('/time-reports', {
                    controller: 'TimeReportListController',
                    templateUrl: 'components/app/angular/views/time-reports/list.html',
                    controllerAs: 'c'
                })
                .when('/time-reports?from&to', {
                    controller: 'TimeReportListController',
                    templateUrl: 'components/app/angular/views/time-reports/list.html',
                    controllerAs: 'c'
                })
                .when('/404', {
                    controller: "NotFoundController",
                    templateUrl: 'components/app/angular/views/404.html',
                    controllerAs: 'c'
                })
                .when('/login', {
                    controller: 'LoginController',
                    templateUrl: 'components/app/angular/views/login.html',
                    controllerAs: 'c'
                })
                .otherwise({redirectTo: '/404'});
        }])
    .run([
        '$location',
        '$cookieStore',
        '$http',
        'config',
        'envService',
        '$rootScope',
        'AuthenticationService',
        ($location:ng.ILocationService,
         $cookieStore:angular.cookies.ICookieStoreService,
         $http:ng.IHttpService,
         config:IEnvConfig,
         envService:angular.environment.Service,
         $scope:IScope,
         AuthenticationService:AuthenticationService) => {
            $scope.globals = $cookieStore.get('globals') || {};
            if ($scope.globals.currentUser) {
                AuthenticationService.SetCredentials($scope.globals.currentUser.token, function (response:any) {
                    if (typeof response.success != 'boolean' ||
                        typeof response.success == 'boolean' && response.success == false) {
                        $location.path('/login');
                    }
                });
                $http.defaults.headers.common.Authorization = 'JWT ' + $scope.globals.currentUser.token;
            }
            $scope.$on('$locationChangeStart', function (event, next, current) {
                var restrictedPage = $.inArray($location.path(), ['/login', '/404']) === -1;
                if (restrictedPage && !$scope.globals.currentUser) {
                    $location.path('/login');
                }
            });
        }
    ]);

export interface IScope extends ng.IScope {
    globals:any,
    page:any,
    flash:any
}

export interface IEnvConfig extends angular.environment.Config {
    appTitle:string
}