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
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	module.exports = __webpack_require__(27);


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
	            .when('/', {
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

	///<reference path="_all.ts"/>
	'use strict';
	var init_1 = __webpack_require__(7);
	function matchMonthAndYear() {
	    return function (items, month, year) {
	        var result = [];
	        for (var i = 0; i < items.length; i++) {
	            if (items[i].month == month && items[i].year == year) {
	                result.push(items[i]);
	            }
	        }
	        return result;
	    };
	}
	exports.matchMonthAndYear = matchMonthAndYear;
	function dateRange() {
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
	}
	exports.dateRange = dateRange;
	angular.module(init_1.Module).filter("matchMonthAndYear", matchMonthAndYear);
	angular.module(init_1.Module).filter("dateRange", dateRange);


/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../_all.ts"/>
	var init_1 = __webpack_require__(7);
	var AuthenticationService = (function () {
	    function AuthenticationService($http, $cookieStore, $scope, config, jwt, ProfilesService, envService) {
	        this.$http = $http;
	        this.$cookieStore = $cookieStore;
	        this.$scope = $scope;
	        this.config = config;
	        this.jwt = jwt;
	        this.ProfilesService = ProfilesService;
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
	        this.VerifyToken(token, angular.bind(this, function (tokenResponse) {
	            if (typeof tokenResponse == 'object' && typeof tokenResponse.token == 'string' && tokenResponse.token.length > 0) {
	                this.$http.defaults.headers.common.Authorization = 'JWT ' + token;
	                this.VerifyUser(token, angular.bind(this, function (userResponse) {
	                    if (typeof userResponse[0] == 'object'
	                        && typeof userResponse[0].id == 'number'
	                        && userResponse[0].id > 0) {
	                        this.$scope.globals = {
	                            currentUser: {
	                                token: token,
	                                profile: userResponse[0]
	                            }
	                        };
	                        this.$cookieStore.put('globals', this.$scope.globals);
	                        callback({ 'success': true });
	                    }
	                    else {
	                        this.ClearCredentials();
	                        callback({ 'success': false });
	                    }
	                }));
	            }
	            else {
	                this.ClearCredentials();
	                callback({ 'success': false });
	            }
	        }));
	    };
	    AuthenticationService.prototype.ClearCredentials = function () {
	        this.$scope.globals = {};
	        this.$cookieStore.remove('globals');
	        this.$http.defaults.headers.common.Authorization = 'JWT';
	    };
	    AuthenticationService.prototype.VerifyUser = function (token, callback) {
	        var profile = this.jwt.decodeToken(token);
	        this.ProfilesService.GetOneByUserID(profile.user_id)
	            .then(function (profile) {
	            callback(profile);
	        });
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
	angular.module(init_1.Module).factory("AuthenticationService", ["$http", "$cookieStore", "$rootScope", "config", "jwtHelper", "ProfilesService", "envService", NewAuthenticationService]);
	function NewAuthenticationService($http, $cookieStore, $scope, config, jwt, ProfilesService, envService) {
	    return new AuthenticationService($http, $cookieStore, $scope, config, jwt, ProfilesService, envService);
	}
	exports.NewAuthenticationService = NewAuthenticationService;


/***/ },
/* 12 */
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
	        var _this = this;
	        this.$scope.$on('$locationChangeStart', function () {
	            var flash = _this.$scope.flash;
	            if (flash) {
	                if (!flash.keepAfterLocationChange) {
	                    delete _this.$scope.flash;
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../_all.ts"/>
	var init_1 = __webpack_require__(7);
	var UsersService = (function () {
	    function UsersService($http, config, envService, $scope) {
	        this.$http = $http;
	        this.config = config;
	        this.envService = envService;
	        this.$scope = $scope;
	    }
	    UsersService.prototype.Edit = function (userData, callback) {
	        var user_id = this.$scope.globals.currentUser.profile.user_entry.id;
	        this.$http.post(this.envService.read('apiUrl') + '/users/' + user_id + '/set_password/', userData)
	            .error(function (response) {
	            callback(response);
	        })
	            .success(function (response) {
	            callback(response);
	        });
	    };
	    UsersService.prototype.handleSuccess = function (res) {
	        return res.data;
	    };
	    UsersService.prototype.handleError = function (error) {
	        return function () {
	            return { success: false, message: error };
	        };
	    };
	    return UsersService;
	}());
	exports.UsersService = UsersService;
	angular.module(init_1.Module).factory("UsersService", ["$http", "config", "envService", "$rootScope", NewUsersService]);
	function NewUsersService($http, config, envService, $scope) {
	    return new UsersService($http, config, envService, $scope);
	}
	exports.NewUsersService = NewUsersService;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	'use strict';
	var init_1 = __webpack_require__(7);
	var ProjectsService = (function () {
	    function ProjectsService($http, envService) {
	        this.$http = $http;
	        this.envService = envService;
	    }
	    ProjectsService.prototype.GetAllProjects = function () {
	        return this.$http.get(this.envService.read('apiUrl') + '/projects/')
	            .then(this.handleSuccess, this.handleError('Error getting all projects.'));
	    };
	    ProjectsService.prototype.GetActiveProjects = function () {
	        return this.$http.get(this.envService.read('apiUrl') + '/projects/?is_finished=3')
	            .then(this.handleSuccess, this.handleError('Error getting active projects.'));
	    };
	    ProjectsService.prototype.GetFinishedProjects = function () {
	        return this.$http.get(this.envService.read('apiUrl') + '/projects/?is_finished=2')
	            .then(this.handleSuccess, this.handleError('Error getting finished projects.'));
	    };
	    ProjectsService.prototype.GetProject = function (id) {
	        return this.$http.get(this.envService.read('apiUrl') + '/projects/' + id + '/')
	            .then(this.handleSuccess, this.handleError('Error getting project.'));
	    };
	    ProjectsService.prototype.handleSuccess = function (res) {
	        return res.data;
	    };
	    ProjectsService.prototype.handleError = function (error) {
	        return function () {
	            return { success: false, message: error };
	        };
	    };
	    return ProjectsService;
	}());
	exports.ProjectsService = ProjectsService;
	angular.module(init_1.Module).factory("ProjectsService", ["$http", "envService", NewProjectsService]);
	function NewProjectsService($http, envService) {
	    return new ProjectsService($http, envService);
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../_all.ts"/>
	var init_1 = __webpack_require__(7);
	var ProfilesService = (function () {
	    function ProfilesService($http, config, envService, $scope) {
	        this.$http = $http;
	        this.config = config;
	        this.envService = envService;
	        this.$scope = $scope;
	    }
	    ProfilesService.prototype.GetAll = function () {
	        return this.$http.get(this.envService.read('apiUrl') + '/profiles/')
	            .then(this.handleSuccess, this.handleError('Error getting all profiles.'));
	    };
	    ProfilesService.prototype.GetOneByUserID = function (id) {
	        return this.$http.get(this.envService.read('apiUrl') + '/profiles/?user__id=' + id)
	            .then(this.handleSuccess, this.handleError('Error getting this profile.'));
	    };
	    ProfilesService.prototype.Edit = function (profileData, callback) {
	        var profile_id = this.$scope.globals.currentUser.profile.id;
	        this.$http.patch(this.envService.read('apiUrl') + '/profiles/' + profile_id + '/', profileData)
	            .error(function (response) {
	            callback(response);
	        })
	            .success(function (response) {
	            callback(response);
	        });
	    };
	    ProfilesService.prototype.handleSuccess = function (res) {
	        return res.data;
	    };
	    ProfilesService.prototype.handleError = function (error) {
	        return function () {
	            return { success: false, message: error };
	        };
	    };
	    return ProfilesService;
	}());
	exports.ProfilesService = ProfilesService;
	angular.module(init_1.Module).factory("ProfilesService", ["$http", "config", "envService", "$rootScope", NewProfilesService]);
	function NewProfilesService($http, config, envService, $scope) {
	    return new ProfilesService($http, config, envService, $scope);
	}
	exports.NewProfilesService = NewProfilesService;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../_all.ts"/>
	var init_1 = __webpack_require__(7);
	var TimeReportsService = (function () {
	    function TimeReportsService($http, config, envService) {
	        this.$http = $http;
	        this.config = config;
	        this.envService = envService;
	    }
	    TimeReportsService.prototype.GetByID = function (id) {
	        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/' + id + '/')
	            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
	    };
	    TimeReportsService.prototype.GetReportsByConditions = function (conditions) {
	        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/?' + this.getParams(conditions))
	            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
	    };
	    TimeReportsService.prototype.GetReportsProfilesByConditions = function (conditions) {
	        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/profiles/?' + this.getParams(conditions))
	            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
	    };
	    TimeReportsService.prototype.GetReportsProjectsByConditions = function (conditions) {
	        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/projects/?' + this.getParams(conditions))
	            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
	    };
	    TimeReportsService.prototype.GetReportsTotalHoursByConditions = function (conditions) {
	        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/total-hours/?' + this.getParams(conditions))
	            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
	    };
	    TimeReportsService.prototype.GetReports = function (project_id) {
	        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/?project__id=' + project_id)
	            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
	    };
	    TimeReportsService.prototype.Create = function (timeReportData, callback) {
	        var seconds = 0;
	        if (moment.duration(timeReportData.seconds, "HH:mm").asSeconds()) {
	            seconds = moment.duration(timeReportData.seconds, "HH:mm");
	        }
	        else {
	            seconds = moment.duration({ 'hours': timeReportData.seconds });
	        }
	        this.$http.post(this.envService.read('apiUrl') + '/time-reports/', {
	            'name': timeReportData.name,
	            'seconds': seconds.asSeconds(),
	            'description': timeReportData.description,
	            'date': timeReportData.date,
	            'profile': timeReportData.profile,
	            'project': timeReportData.project
	        })
	            .error(function (response) {
	            callback(response);
	        })
	            .success(function (response) {
	            callback(response);
	        });
	    };
	    TimeReportsService.prototype.Update = function (id, timeReportData, callback) {
	        var seconds = 0;
	        if (moment.duration(timeReportData.hours, "HH:mm").asSeconds()) {
	            seconds = moment.duration(timeReportData.hours, "HH:mm");
	        }
	        else {
	            seconds = moment.duration({ 'hours': timeReportData.hours });
	        }
	        this.$http.patch(this.envService.read('apiUrl') + '/time-reports/' + id + '/', {
	            'name': timeReportData.name,
	            'seconds': seconds.asSeconds(),
	            'description': timeReportData.description,
	            'date': timeReportData.date
	        })
	            .error(function (response) {
	            callback(response);
	        })
	            .success(function (response) {
	            callback(response);
	        });
	    };
	    TimeReportsService.prototype.Delete = function (id, callback) {
	        this.$http.delete(this.envService.read('apiUrl') + '/time-reports/' + id + '/')
	            .error(function (response) {
	            callback(response);
	        })
	            .success(function (response) {
	            callback(response);
	        });
	    };
	    TimeReportsService.prototype.handleSuccess = function (res) {
	        return res.data;
	    };
	    TimeReportsService.prototype.handleError = function (error) {
	        return function () {
	            return { success: false, message: error };
	        };
	    };
	    TimeReportsService.prototype.getParams = function (conditions) {
	        var params = '';
	        if (conditions)
	            params = $.param(conditions);
	        return params;
	    };
	    return TimeReportsService;
	}());
	exports.TimeReportsService = TimeReportsService;
	angular.module(init_1.Module).factory("TimeReportsService", ['$http', 'config', 'envService', NewTimeReportsService]);
	function NewTimeReportsService($http, config, envService) {
	    return new TimeReportsService($http, config, envService);
	}
	exports.NewTimeReportsService = NewTimeReportsService;


/***/ },
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	'use strict';
	var init_1 = __webpack_require__(7);
	var NotFoundController = (function () {
	    function NotFoundController(PageService) {
	        this.PageService = PageService;
	        this.title = 'Oops! That page can\'t be found.';
	        this.slug = "404";
	        PageService.resetData();
	        PageService.setHtmlTitle(this.title);
	        PageService.setSlug(this.slug);
	    }
	    return NotFoundController;
	}());
	exports.NotFoundController = NotFoundController;
	angular.module(init_1.Module).controller("NotFoundController", ["PageService", NewNotFoundController]);
	function NewNotFoundController(PageService) {
	    return new NotFoundController(PageService);
	}
	exports.NewNotFoundController = NewNotFoundController;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	'use strict';
	var init_1 = __webpack_require__(7);
	var HomeController = (function () {
	    function HomeController(PageService, ProjectsService) {
	        this.PageService = PageService;
	        this.ProjectsService = ProjectsService;
	        this.c = this;
	        PageService.resetData();
	        PageService.setHtmlTitle("Home");
	        PageService.setSlug("home");
	        this.loadActiveProjects();
	        this.loadFinishedProjects();
	    }
	    HomeController.prototype.loadActiveProjects = function () {
	        var _this = this;
	        this.ProjectsService.GetActiveProjects()
	            .then(function (projects) {
	            _this.c.getActiveProjects = projects;
	        });
	    };
	    HomeController.prototype.loadFinishedProjects = function () {
	        var _this = this;
	        this.ProjectsService.GetFinishedProjects()
	            .then(function (projects) {
	            _this.c.getFinishedProjects = projects;
	        });
	    };
	    return HomeController;
	}());
	exports.HomeController = HomeController;
	angular.module(init_1.Module).controller("HomeController", [
	    "PageService",
	    "ProjectsService",
	    NewHomeController]);
	function NewHomeController(PageService, ProjectsService) {
	    return new HomeController(PageService, ProjectsService);
	}
	exports.NewHomeController = NewHomeController;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	"use strict";
	var init_1 = __webpack_require__(7);
	var AccountController = (function () {
	    function AccountController($scope, $location, PageService, ProfilesService, FlashService, AuthenticationService, UsersService) {
	        this.$scope = $scope;
	        this.$location = $location;
	        this.PageService = PageService;
	        this.ProfilesService = ProfilesService;
	        this.FlashService = FlashService;
	        this.AuthenticationService = AuthenticationService;
	        this.UsersService = UsersService;
	        this.c = this;
	        this.accountData = {};
	        this.profile = {};
	        this.user = {};
	        this.readableKeys = {
	            email_address: 'Email address',
	            first_name: 'First name',
	            last_name: 'Last name',
	            job_title: 'Job title',
	            phone_number: 'Phone number',
	            current_password: 'Current password',
	            new_password: 'New password',
	            confirm_new_password: 'Confirm new password'
	        };
	        PageService.resetData();
	        PageService.setHtmlTitle('Account');
	        PageService.setSlug('account');
	        this.c.accountData.profile = {};
	        this.c.accountData.profile.email_address = $scope.globals.currentUser.profile.email_address;
	        this.c.accountData.profile.first_name = $scope.globals.currentUser.profile.first_name;
	        this.c.accountData.profile.last_name = $scope.globals.currentUser.profile.last_name;
	        this.c.accountData.profile.job_title = $scope.globals.currentUser.profile.job_title;
	        this.c.accountData.profile.phone_number = $scope.globals.currentUser.profile.phone_number;
	    }
	    AccountController.prototype.changeProfile = function () {
	        var _this = this;
	        var messages = [];
	        this.ProfilesService.Edit(this.c.accountData.profile, function (response) {
	            if (typeof response.id == 'number' && response.id > 0) {
	                _this.$scope.globals.currentUser.profile = response;
	                _this.FlashService.Success(['Your account has been successfully updated.'], false);
	            }
	            else {
	                var self = _this;
	                angular.forEach(response, function (value, key) {
	                    messages.push(self.c.readableKeys[key] + ': ' + value);
	                });
	                _this.FlashService.Error(messages, false);
	            }
	        });
	    };
	    AccountController.prototype.changePassword = function () {
	        var _this = this;
	        var messages = [];
	        this.UsersService.Edit(this.c.accountData.user, function (response) {
	            if (typeof response.id == 'number' && response.id > 0) {
	                _this.FlashService.Success(['Your account has been successfully updated.'], false);
	            }
	            else {
	                var self = _this;
	                angular.forEach(response, function (value, key) {
	                    messages.push(self.c.readableKeys[key] + ': ' + value);
	                });
	                _this.FlashService.Error(messages, false);
	            }
	        });
	    };
	    ;
	    return AccountController;
	}());
	exports.AccountController = AccountController;
	angular.module(init_1.Module).controller("AccountController", ['$rootScope',
	    '$location',
	    'PageService',
	    'ProfilesService',
	    'FlashService',
	    'AuthenticationService',
	    'UsersService', NewAccountController]);
	function NewAccountController($scope, $location, PageService, ProfilesService, FlashService, AuthenticationService, UsersService) {
	    return new AccountController($scope, $location, PageService, ProfilesService, FlashService, AuthenticationService, UsersService);
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	"use strict";
	var init_1 = __webpack_require__(7);
	var ProjectController = (function () {
	    function ProjectController($scope, $location, FlashService, PageService, ProjectsService, ProfilesService, TimeReportsService, $routeParams, $route) {
	        this.$scope = $scope;
	        this.$location = $location;
	        this.FlashService = FlashService;
	        this.PageService = PageService;
	        this.ProjectsService = ProjectsService;
	        this.ProfilesService = ProfilesService;
	        this.TimeReportsService = TimeReportsService;
	        this.$routeParams = $routeParams;
	        this.$route = $route;
	        this.c = this;
	        this.filterData = {};
	        PageService.resetData();
	        PageService.setHtmlTitle('Projects');
	        PageService.setSlug('projects');
	        this.search = $location.search();
	        this.c.filterData.profile__id = (this.search.profile__id) ? this.search.profile__id : null;
	        this.c.filterData.project__id = $routeParams.id;
	        this.loadProject($routeParams.id);
	        this.listTimeReportsProfiles();
	        this.listTimeReportsTotalHours();
	        this.listProfiles();
	        this.getTotalHoursByRange();
	        this.listDataRange();
	    }
	    ProjectController.prototype.loadProject = function (id) {
	        var _this = this;
	        this.ProjectsService.GetProject(id)
	            .then(function (project) {
	            if (typeof project.id == 'number' && project.id > 0) {
	                _this.c.getProject = project;
	                _this.TimeReportsService.GetReportsByConditions(_this.c.filterData)
	                    .then(function (response) {
	                    _this.c.getProjectTimeReports = response;
	                });
	                _this.PageService.setHtmlTitle(project.name);
	            }
	            else {
	                _this.$location.path('/404');
	            }
	        });
	    };
	    ProjectController.prototype.getTotalHoursByRange = function () {
	        var _this = this;
	        if (this.c.filterData == undefined)
	            this.c.filterData = {};
	        this.c.filterData.group_by = "MONTH";
	        this.TimeReportsService.GetReportsProfilesByConditions(this.c.filterData)
	            .then(function (response) {
	            _this.c.totalMonthHours = response;
	        });
	    };
	    ProjectController.prototype.listTimeReportsTotalHours = function () {
	        var _this = this;
	        this.TimeReportsService.GetReportsTotalHoursByConditions(this.c.filterData)
	            .then(function (response) {
	            _this.c.getTimeReportsTotalHours = response;
	        });
	    };
	    ProjectController.prototype.listTimeReportsProfiles = function () {
	        var _this = this;
	        this.TimeReportsService.GetReportsProfilesByConditions(this.c.filterData)
	            .then(function (response) {
	            _this.c.getTimeReportsProfiles = response;
	        });
	    };
	    ProjectController.prototype.removeItem = function (id) {
	        var _this = this;
	        var r = confirm('Are you sure that you want to delete this item?');
	        if (r) {
	            this.TimeReportsService.Delete(id, function (response) {
	                if (response.length == 0) {
	                    _this.FlashService.Success(['Time report has been successfully deleted.'], false);
	                }
	                else {
	                    _this.FlashService.Error(['Unexpected error'], false);
	                }
	                _this.$route.reload();
	            });
	        }
	    };
	    ProjectController.prototype.listProfiles = function () {
	        var _this = this;
	        this.ProfilesService.GetAll()
	            .then(function (response) {
	            _this.c.profiles = response;
	        });
	    };
	    ProjectController.prototype.filter = function () {
	        this.$location.url('/projects/' + this.$routeParams.id + '/time-reports?' + $.param(this.c.filterData));
	    };
	    ProjectController.prototype.listDataRange = function () {
	        var _this = this;
	        this.c.filterData.group_by = "MONTH";
	        this.TimeReportsService.GetReportsProjectsByConditions(this.c.filterData)
	            .then(function (response) {
	            _this.c.listDateRange = response;
	        });
	    };
	    return ProjectController;
	}());
	exports.ProjectController = ProjectController;
	angular.module(init_1.Module).controller("ProjectController", ['$rootScope',
	    '$location',
	    'FlashService',
	    'PageService',
	    'ProjectsService',
	    'ProfilesService',
	    'TimeReportsService',
	    '$routeParams',
	    '$route', NewProjectController]);
	function NewProjectController($scope, $location, FlashService, PageService, ProjectsService, ProfilesService, TimeReportsService, $routeParams, $route) {
	    return new ProjectController($scope, $location, FlashService, PageService, ProjectsService, ProfilesService, TimeReportsService, $routeParams, $route);
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	"use strict";
	var init_1 = __webpack_require__(7);
	var TimeReportNewController = (function () {
	    function TimeReportNewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
	        this.$scope = $scope;
	        this.$location = $location;
	        this.PageService = PageService;
	        this.FlashService = FlashService;
	        this.ProjectsService = ProjectsService;
	        this.TimeReportsService = TimeReportsService;
	        this.$routeParams = $routeParams;
	        this.c = this;
	        this.filterData = {};
	        this.timeReportData = {};
	        this.readableKeys = {
	            name: 'Name',
	            seconds: 'Hours',
	            description: 'Name',
	            date: 'Date',
	        };
	        PageService.resetData();
	        PageService.setHtmlTitle('Projects');
	        PageService.setSlug('projects');
	        this.c.timeReportData.name = '';
	        this.c.timeReportData.seconds = '';
	        this.c.timeReportData.description = '';
	        this.c.timeReportData.date = moment().format('YYYY-MM-DD');
	        this.c.timeReportData.profile = $scope.globals.currentUser.profile.id;
	        this.c.timeReportData.project = $routeParams.id;
	        this.loadProject($routeParams.id);
	        initUI();
	    }
	    TimeReportNewController.prototype.loadProject = function (id) {
	        var _this = this;
	        this.ProjectsService.GetProject(id)
	            .then(function (project) {
	            if (typeof project.id == 'number' && project.id > 0) {
	                _this.c.getProject = project;
	                _this.PageService.setHtmlTitle(project.name);
	            }
	            else {
	                _this.$location.path('/404');
	            }
	        });
	    };
	    TimeReportNewController.prototype.create = function () {
	        var _this = this;
	        var messages = [];
	        this.TimeReportsService.Create(this.c.timeReportData, function (response) {
	            if (typeof response.id == 'number' && response.id > 0) {
	                _this.FlashService.Success(['Time report has been successfully created.'], false);
	                _this.$location.path('/projects/' + _this.$routeParams.id + '/time-reports');
	            }
	            else {
	                var self_1 = _this;
	                angular.forEach(response, function (value, key) {
	                    messages.push(self_1.c.readableKeys[key] + ': ' + value);
	                });
	                _this.FlashService.Error(messages, false);
	            }
	        });
	    };
	    ;
	    return TimeReportNewController;
	}());
	exports.TimeReportNewController = TimeReportNewController;
	angular.module(init_1.Module).controller("TimeReportNewController", ['$rootScope',
	    '$location',
	    'PageService',
	    'FlashService',
	    'ProjectsService',
	    'TimeReportsService',
	    '$routeParams', NewTimeReportNewController]);
	function NewTimeReportNewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
	    return new TimeReportNewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams);
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	"use strict";
	var init_1 = __webpack_require__(7);
	var TimeReportListController = (function () {
	    function TimeReportListController($scope, $location, PageService, FlashService, ProjectsService, ProfilesService, TimeReportsService, $route, $routeParams) {
	        this.$scope = $scope;
	        this.$location = $location;
	        this.PageService = PageService;
	        this.FlashService = FlashService;
	        this.ProjectsService = ProjectsService;
	        this.ProfilesService = ProfilesService;
	        this.TimeReportsService = TimeReportsService;
	        this.$route = $route;
	        this.$routeParams = $routeParams;
	        this.c = this;
	        this.filterData = {};
	        PageService.resetData();
	        PageService.setHtmlTitle('Time Reports');
	        PageService.setSlug('time-reports');
	        this.search = $location.search();
	        this.c.filterData.date_0 = (this.search.date_0) ? this.search.date_0 : moment().startOf('month').format('YYYY-MM-DD');
	        this.c.filterData.date_1 = (this.search.date_1) ? this.search.date_1 : moment().format('YYYY-MM-DD');
	        this.c.filterData.profile__id = (this.search.profile__id) ? this.search.profile__id : null;
	        this.c.filterData.project__id = (this.search.project__id) ? this.search.project__id : null;
	        this.listTimeReports();
	        this.listTimeReportsProfiles();
	        this.listTimeReportsProjects();
	        this.listTimeReportsTotalHours();
	        this.listProfiles();
	        this.listProjects();
	        initUI();
	    }
	    TimeReportListController.prototype.listTimeReports = function () {
	        var _this = this;
	        this.TimeReportsService.GetReportsByConditions(this.c.filterData)
	            .then(function (response) {
	            _this.c.getTimeReports = response;
	        });
	    };
	    TimeReportListController.prototype.listTimeReportsProfiles = function () {
	        var _this = this;
	        this.TimeReportsService.GetReportsProfilesByConditions(this.c.filterData)
	            .then(function (response) {
	            _this.c.getTimeReportsProfiles = response;
	        });
	    };
	    TimeReportListController.prototype.listTimeReportsProjects = function () {
	        var _this = this;
	        this.TimeReportsService.GetReportsProjectsByConditions(this.c.filterData)
	            .then(function (response) {
	            _this.c.getTimeReportsProjects = response;
	        });
	    };
	    TimeReportListController.prototype.listTimeReportsTotalHours = function () {
	        var _this = this;
	        this.TimeReportsService.GetReportsTotalHoursByConditions(this.c.filterData)
	            .then(function (response) {
	            _this.c.getTimeReportsTotalHours = response;
	        });
	    };
	    TimeReportListController.prototype.filter = function () {
	        this.$location.url('/time-reports?' + $.param(this.c.filterData));
	    };
	    TimeReportListController.prototype.removeItem = function (id) {
	        var _this = this;
	        var r = confirm('Are you sure that you want to delete this item?');
	        if (r) {
	            this.TimeReportsService.Delete(id, function (response) {
	                if (response.length == 0) {
	                    _this.FlashService.Success(['Time report has been successfully deleted.'], false);
	                }
	                else {
	                    _this.FlashService.Error(['Unexpected error'], false);
	                }
	                _this.$route.reload();
	            });
	        }
	    };
	    TimeReportListController.prototype.listProfiles = function () {
	        var _this = this;
	        this.ProfilesService.GetAll()
	            .then(function (response) {
	            _this.c.profiles = response;
	        });
	    };
	    TimeReportListController.prototype.listProjects = function () {
	        var _this = this;
	        this.ProjectsService.GetAllProjects()
	            .then(function (response) {
	            _this.c.projects = response;
	        });
	    };
	    return TimeReportListController;
	}());
	exports.TimeReportListController = TimeReportListController;
	angular.module(init_1.Module).controller("TimeReportListController", ['$rootScope',
	    '$location',
	    'PageService',
	    'FlashService',
	    'ProjectsService',
	    'ProfilesService',
	    'TimeReportsService',
	    '$route',
	    '$routeParams', NewTimeReportListController]);
	function NewTimeReportListController($scope, $location, PageService, FlashService, ProjectsService, ProfilesService, TimeReportsService, $route, $routeParams) {
	    return new TimeReportListController($scope, $location, PageService, FlashService, ProjectsService, ProfilesService, TimeReportsService, $route, $routeParams);
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	"use strict";
	var init_1 = __webpack_require__(7);
	var TimeReportEditController = (function () {
	    function TimeReportEditController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
	        this.$scope = $scope;
	        this.$location = $location;
	        this.PageService = PageService;
	        this.FlashService = FlashService;
	        this.ProjectsService = ProjectsService;
	        this.TimeReportsService = TimeReportsService;
	        this.$routeParams = $routeParams;
	        this.c = this;
	        this.readableKeys = {
	            name: 'Name',
	            seconds: 'Hours',
	            description: 'Name',
	            date: 'Date',
	        };
	        PageService.resetData();
	        PageService.setHtmlTitle('Time Reports');
	        PageService.setSlug('time-reports');
	        this.loadReportData($routeParams.id);
	        this.loadProject($routeParams.project_id);
	        initUI();
	    }
	    TimeReportEditController.prototype.loadProject = function (id) {
	        var _this = this;
	        this.ProjectsService.GetProject(id)
	            .then(function (project) {
	            if (typeof project.id == 'number' && project.id > 0) {
	                _this.c.getProject = project;
	                _this.PageService.setHtmlTitle(project.name);
	            }
	            else {
	                _this.$location.path('/404');
	            }
	        });
	    };
	    TimeReportEditController.prototype.loadReportData = function (id) {
	        var _this = this;
	        this.TimeReportsService.GetByID(id)
	            .then(function (timeReports) {
	            if (typeof timeReports.id == 'number' && timeReports.id > 0) {
	                _this.c.timeReportData = timeReports;
	                _this.PageService.setHtmlTitle(timeReports.name);
	            }
	            else {
	                _this.$location.path('/404');
	            }
	        });
	    };
	    TimeReportEditController.prototype.edit = function () {
	        var _this = this;
	        var messages = [];
	        this.TimeReportsService.Update(this.$routeParams.id, this.c.timeReportData, function (response) {
	            if (typeof response.id == 'number' && response.id > 0) {
	                _this.FlashService.Success(['Time report has been successfully updated.'], false);
	                _this.$location.path('/projects/' + _this.$routeParams.project_id + '/time-reports/' + _this.$routeParams.id);
	            }
	            else {
	                var self_1 = _this;
	                angular.forEach(response, function (value, key) {
	                    messages.push(self_1.c.readableKeys[key] + ': ' + value);
	                });
	                _this.FlashService.Error(messages, false);
	            }
	        });
	    };
	    return TimeReportEditController;
	}());
	exports.TimeReportEditController = TimeReportEditController;
	angular.module(init_1.Module).controller("TimeReportEditController", ['$rootScope',
	    '$location',
	    'PageService',
	    'FlashService',
	    'ProjectsService',
	    'TimeReportsService',
	    '$routeParams', NewTimeReportEditController]);
	function NewTimeReportEditController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
	    return new TimeReportEditController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams);
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../_all.ts"/>
	"use strict";
	var init_1 = __webpack_require__(7);
	var TimeReportViewController = (function () {
	    function TimeReportViewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
	        this.$scope = $scope;
	        this.$location = $location;
	        this.PageService = PageService;
	        this.FlashService = FlashService;
	        this.ProjectsService = ProjectsService;
	        this.TimeReportsService = TimeReportsService;
	        this.$routeParams = $routeParams;
	        this.c = this;
	        PageService.resetData();
	        PageService.setHtmlTitle('Time Reports');
	        PageService.setSlug('time-reports');
	        this.loadReportData($routeParams.id);
	        this.loadProject($routeParams.project_id);
	        initUI();
	    }
	    TimeReportViewController.prototype.loadProject = function (id) {
	        var _this = this;
	        this.ProjectsService.GetProject(id)
	            .then(function (project) {
	            if (typeof project.id == 'number' && project.id > 0) {
	                _this.c.getProject = project;
	                _this.PageService.setHtmlTitle(project.name);
	            }
	            else {
	                _this.$location.path('/404');
	            }
	        });
	    };
	    TimeReportViewController.prototype.loadReportData = function (id) {
	        var _this = this;
	        this.TimeReportsService.GetByID(id)
	            .then(function (timeReports) {
	            if (typeof timeReports.id == 'number' && timeReports.id > 0) {
	                _this.c.timeReportData = timeReports;
	                _this.PageService.setHtmlTitle(timeReports.name);
	            }
	            else {
	                _this.$location.path('/404');
	            }
	        });
	    };
	    TimeReportViewController.prototype.removeItem = function (id) {
	        var _this = this;
	        var r = confirm('Are you sure that you want to delete this item?');
	        if (r) {
	            this.TimeReportsService.Delete(id, function (response) {
	                if (response.length == 0) {
	                    _this.FlashService.Success(['Time report has been successfully deleted.'], false);
	                }
	                else {
	                    _this.FlashService.Error(['Unexpected error'], false);
	                }
	                history.go(-1);
	            });
	        }
	    };
	    return TimeReportViewController;
	}());
	exports.TimeReportViewController = TimeReportViewController;
	angular.module(init_1.Module).controller("TimeReportViewController", ['$rootScope',
	    '$location',
	    'PageService',
	    'FlashService',
	    'ProjectsService',
	    'TimeReportsService',
	    '$routeParams', NewTimeReportViewController]);
	function NewTimeReportViewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams) {
	    return new TimeReportViewController($scope, $location, PageService, FlashService, ProjectsService, TimeReportsService, $routeParams);
	}


/***/ },
/* 27 */
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
	        this.AuthenticationService.Login(this.c.username, this.c.password, angular.bind(this, function (response) {
	            if (typeof response.token == 'string' && response.token.length > 0) {
	                this.AuthenticationService.SetCredentials(response.token, angular.bind(this, function (response) {
	                    if (typeof response.success == 'boolean' && response.success == true) {
	                        this.$location.path('/');
	                    }
	                    else {
	                        this.FlashService.Error(['The username and password you entered don\'t match.']);
	                    }
	                }));
	            }
	            else {
	                this.FlashService.Error(['The username and password you entered don\'t match.']);
	            }
	        }));
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