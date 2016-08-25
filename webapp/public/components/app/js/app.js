/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	module.exports = __webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["App"] = __webpack_require__(8);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	exports.Module = "app";
	angular.module(exports.Module, [
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
	    function ($routeProvider, $locationProvider, envServiceProvider) {
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
	            .otherwise({ redirectTo: '/404' });
	    }])
	    .run([
	    '$location',
	    '$cookieStore',
	    '$http',
	    'config',
	    'envService',
	    '$rootScope',
	    'AuthenticationService',
	    function ($location, $cookieStore, $http, config, envService, $scope, AuthenticationService) {
	        $scope.globals = $cookieStore.get('globals') || {};
	        if ($scope.globals.currentUser) {
	            AuthenticationService.SetCredentials($scope.globals.currentUser.token, function (response) {
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="./_all.ts"/>
	var init_1 = __webpack_require__(7);
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../_all.ts"/>
	var init_1 = __webpack_require__(7);
	var AuthenticationService = (function () {
	    function AuthenticationService($http, $cookieStore, $scope, config, envService) {
	        this.$http = $http;
	        this.$cookieStore = $cookieStore;
	        this.$scope = $scope;
	        this.config = config;
	        this.envService = envService;
	    }
	    AuthenticationService.prototype.Login = function (username, password, callback) {
	        this.$http.post(this.envService.read('apiUrl') + '/auth/jwt/new/', {
	            username: username,
	            password: password
	        })
	            .error(function (response) {
	            callback(response);
	        })
	            .success(function (response) {
	            callback(response);
	        });
	    };
	    AuthenticationService.prototype.SetCredentials = function (token, callback) {
	        this.VerifyToken(token, function (tokenResponse) {
	            if (typeof tokenResponse == 'object'
	                && typeof tokenResponse.token == 'string'
	                && tokenResponse.token.length > 0) {
	                this.$http.defaults.headers.common.Authorization = 'JWT ' + token;
	                this.VerifyUser(token, function (userResponse) {
	                    if (typeof userResponse[0] == 'object'
	                        && typeof userResponse[0].id == 'number'
	                        && userResponse[0].id > 0) {
	                        this.$rootScope.globals = {
	                            currentUser: {
	                                token: token,
	                                profile: userResponse[0]
	                            }
	                        };
	                        this.$cookieStore.put('globals', this.$rootScope.globals);
	                        callback({ 'success': true });
	                    }
	                    else {
	                        this.ClearCredentials();
	                        callback({ 'success': false });
	                    }
	                });
	            }
	            else {
	                this.ClearCredentials();
	                callback({ 'success': false });
	            }
	        });
	    };
	    AuthenticationService.prototype.ClearCredentials = function () {
	        this.$scope.globals = {};
	        this.$cookieStore.remove('globals');
	        this.$http.defaults.headers.common.Authorization = 'JWT';
	    };
	    AuthenticationService.prototype.VerifyUser = function (token, callback) {
	        // let ProfileService = NewPageService(this.config);
	        // ProfilesService.GetOneByUserID(jwtHelper.decodeToken(token).user_id)
	        //     .then(function (profile) {
	        //         callback(profile);
	        //     });
	    };
	    AuthenticationService.prototype.VerifyToken = function (token, callback) {
	        this.$http.post(this.envService.read('apiUrl') + '/auth/jwt/verify/', {
	            token: token
	        })
	            .error(function (response) {
	            callback(response);
	        })
	            .success(function (response) {
	            callback(response);
	        });
	    };
	    return AuthenticationService;
	}());
	exports.AuthenticationService = AuthenticationService;
	angular.module(init_1.Module).factory("AuthenticationService", ["$http", "$cookieStore", "$rootScope", "config", "envService", NewAuthenticationService]);
	function NewAuthenticationService($http, $cookieStore, $scope, config, envService) {
	    return new AuthenticationService($http, $cookieStore, $scope, config, envService);
	}
	exports.NewAuthenticationService = NewAuthenticationService;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../_all.ts"/>
	var init_1 = __webpack_require__(7);
	var FlashService = (function () {
	    function FlashService($scope) {
	        this.$scope = $scope;
	        this.init();
	    }
	    FlashService.prototype.init = function () {
	        this.$scope.$on('$locationChangeStart', function () {
	            var flash = this.$scope.flash;
	            if (flash) {
	                if (!flash.keepAfterLocationChange) {
	                    delete this.$scope.flash;
	                }
	                else {
	                    flash.keepAfterLocationChange = false;
	                }
	            }
	        });
	    };
	    FlashService.prototype.Success = function (messages, keepAfterLocationChange) {
	        this.$scope.flash = {
	            messages: messages,
	            type: 'success',
	            keepAfterLocationChange: keepAfterLocationChange
	        };
	    };
	    FlashService.prototype.Error = function (messages, keepAfterLocationChange) {
	        this.$scope.flash = {
	            messages: messages,
	            type: 'error',
	            keepAfterLocationChange: keepAfterLocationChange
	        };
	    };
	    return FlashService;
	}());
	exports.FlashService = FlashService;
	angular.module(init_1.Module).factory("FlashService", ["$rootScope", NewFlashService]);
	function NewFlashService($scope) {
	    return new FlashService($scope);
	}
	exports.NewFlashService = NewFlashService;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../_all.ts"/>
	var init_1 = __webpack_require__(7);
	var PageService = (function () {
	    function PageService(config, $scope) {
	        this.config = config;
	        this.$scope = $scope;
	    }
	    PageService.prototype.resetData = function () {
	        this.$scope.page.website_title = this.config.appTitle;
	        this.$scope.page.html_title = this.config.appTitle;
	        this.$scope.page.slug = '';
	        return '';
	    };
	    PageService.prototype.setHtmlTitle = function (html_title) {
	        this.$scope.page.html_title = html_title + ' | ' + this.$scope.page.html_title;
	        return '';
	    };
	    PageService.prototype.setSlug = function (slug) {
	        this.$scope.page.slug = slug;
	        return '';
	    };
	    return PageService;
	}());
	exports.PageService = PageService;
	angular.module(init_1.Module).factory("PageService", ["config", "$rootScope", NewPageService]);
	function NewPageService(config, $scope) {
	    return new PageService(config, $scope);
	}
	exports.NewPageService = NewPageService;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	"use strict";
	var init_1 = __webpack_require__(7);
	var PageController = (function () {
	    function PageController($scope, config, PageService) {
	        this.$scope = $scope;
	        this.config = config;
	        this.PageService = PageService;
	        $scope.page = PageService;
	        $scope.page.resetData();
	    }
	    PageController.id = "PageController";
	    return PageController;
	}());
	exports.PageController = PageController;
	angular.module(init_1.Module).controller("PageController", ["$rootScope", "config", "PageService", NewPageController]);
	function NewPageController($scope, config, PageService) {
	    return new PageController($scope, config, PageService);
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	"use strict";
	var init_1 = __webpack_require__(7);
	var LoginController = (function () {
	    function LoginController($location, PageService, AuthenticationService, FlashService) {
	        this.$location = $location;
	        this.PageService = PageService;
	        this.AuthenticationService = AuthenticationService;
	        this.FlashService = FlashService;
	        this.c = this;
	        PageService.resetData();
	        PageService.setHtmlTitle('Login');
	        PageService.setSlug('login');
	        AuthenticationService.ClearCredentials();
	    }
	    LoginController.prototype.login = function () {
	        this.AuthenticationService.Login(this.c.username, this.c.password, function (response) {
	            if (typeof response.token == 'string' && response.token.length > 0) {
	                this.AuthenticationService.SetCredentials(response.token, function (response) {
	                    if (typeof response.success == 'boolean' && response.success == true) {
	                        this.$location.path('/');
	                    }
	                    else {
	                        this.FlashService.Error(['The username and password you entered don\'t match.']);
	                    }
	                });
	            }
	            else {
	                this.FlashService.Error(['The username and password you entered don\'t match.']);
	            }
	        });
	    };
	    ;
	    return LoginController;
	}());
	exports.LoginController = LoginController;
	angular.module(init_1.Module).controller("LoginController", [
	    "$location",
	    "PageService",
	    "AuthenticationService",
	    "FlashService",
	    NewLoginController]);
	function NewLoginController($location, PageService, AuthenticationService, FlashService) {
	    return new LoginController($location, PageService, AuthenticationService, FlashService);
	}
	exports.NewLoginController = NewLoginController;


/***/ }
/******/ ]);