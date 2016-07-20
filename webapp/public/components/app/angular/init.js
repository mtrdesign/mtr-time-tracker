(function () {
    'use strict';
    angular
        .module('app', ['ngRoute', 'ngCookies', 'angular-jwt'])
        .config(config)
        .constant('config', {  
          appTitle: 'MTR Design Projects',
          apiUrl: 'http://127.0.0.1:8000',
        })
        .run(run);
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
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
            .when('/projects/:id', {
                controller: 'ProjectController',
                templateUrl: 'components/app/angular/views/project.html',
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
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'config', 'AuthenticationService', 'PageService'];
    function run($rootScope, $location, $cookieStore, $http, config, AuthenticationService, PageService) {
        config.apiUrl = config.apiUrl + '/time-tracker/api';
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