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
	__webpack_require__(8);
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
	module.exports = __webpack_require__(26);


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
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app', [
	            'ngRoute',
	            'ngCookies',
	            'angular-jwt',
	            'environment',
	            'angularMoment'
	        ])
	        .config(config)
	        .constant('config', {
	            appTitle: 'MTR Design Projects'
	        })
	        .run(run);
	    config.$inject = [
	        '$routeProvider',
	        '$locationProvider',
	        'envServiceProvider'
	    ];
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
	    run.$inject = [
	        '$rootScope',
	        '$location',
	        '$cookieStore',
	        '$http',
	        'config',
	        'envService',
	        'AuthenticationService',
	        'PageService'
	    ];
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

/***/ },
/* 8 */
/***/ function(module, exports) {

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

	})();

/***/ },
/* 9 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    var app = angular.module('app');

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

/***/ },
/* 10 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .factory('AuthenticationService', AuthenticationService);
	    AuthenticationService.$inject = [
	        '$http',
	        '$cookieStore',
	        '$rootScope',
	        'config',
	        'envService',
	        'jwtHelper',
	        'ProfilesService'
	    ];
	    function AuthenticationService($http, $cookieStore, $rootScope, config,
	                                   envService, jwtHelper, ProfilesService) {
	        var service = {};
	        service.Login = Login;
	        service.SetCredentials = SetCredentials;
	        service.ClearCredentials = ClearCredentials;
	        service.VerifyUser = VerifyUser;
	        service.VerifyToken = VerifyToken;
	        function Login(username, password, callback) {
	            $http.post(envService.read('apiUrl') + '/auth/jwt/new/', {
	                    username: username,
	                    password: password
	                })
	                .error(function (response) {
	                    callback(response);
	                })
	                .success(function (response) {
	                    callback(response);
	                });
	        }
	        function SetCredentials(token, callback) {
	            VerifyToken(token, function(tokenResponse) {
	                if (typeof tokenResponse == 'object'
	                    && typeof tokenResponse.token == 'string'
	                    && tokenResponse.token.length > 0) {
	                    $http.defaults.headers.common.Authorization = 'JWT ' + token;
	                    VerifyUser(token, function(userResponse) {
	                        if (typeof userResponse[0] == 'object'
	                            && typeof userResponse[0].id == 'number'
	                            && userResponse[0].id > 0) {
	                            $rootScope.globals = {
	                                currentUser: {
	                                    token: token,
	                                    profile: userResponse[0]
	                                }
	                            };
	                            $cookieStore.put('globals', $rootScope.globals);
	                            callback({'success': true});
	                        } else {
	                            ClearCredentials();
	                            callback({'success': false});
	                        }
	                    });
	                } else {
	                    ClearCredentials();
	                    callback({'success': false});
	                }
	            });
	        }
	        function ClearCredentials() {
	            $rootScope.globals = {};
	            $cookieStore.remove('globals');
	            $http.defaults.headers.common.Authorization = 'JWT';
	        }
	        function VerifyUser(token, callback) {
	            ProfilesService.GetOneByUserID(jwtHelper.decodeToken(token).user_id)
	                .then(function (profile) {
	                    callback(profile);
	                });
	        }
	        function VerifyToken(token, callback) {
	            $http.post(envService.read('apiUrl') + '/auth/jwt/verify/', {
	                    token: token
	                })
	                .error(function (response) {
	                    callback(response);
	                })
	                .success(function (response) {
	                   callback(response);
	                });
	        }
	        return service;
	    }
	})();

/***/ },
/* 11 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .factory('FlashService', FlashService);
	    FlashService.$inject = [
	        '$rootScope'
	    ];
	    function FlashService($rootScope) {
	        var service = {};
	        service.Success = Success;
	        service.Error = Error;
	        initService();
	        function initService() {
	            $rootScope.$on('$locationChangeStart', function () {
	                clearFlashMessage();
	            });
	            function clearFlashMessage() {
	                var flash = $rootScope.flash;
	                if (flash) {
	                    if (!flash.keepAfterLocationChange) {
	                        delete $rootScope.flash;
	                    } else {
	                        flash.keepAfterLocationChange = false;
	                    }
	                }
	            }
	        }
	        function Success(messages, keepAfterLocationChange) {
	            $rootScope.flash = {
	                messages: messages,
	                type: 'success',
	                keepAfterLocationChange: keepAfterLocationChange
	            };
	        }
	        function Error(messages, keepAfterLocationChange) {
	            $rootScope.flash = {
	                messages: messages,
	                type: 'error',
	                keepAfterLocationChange: keepAfterLocationChange
	            };
	        }
	        return service;
	    }
	})();

/***/ },
/* 12 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .factory('PageService', PageService);
	    PageService.$inject = [
	        '$http',
	        'config'
	    ];
	    function PageService($http, config) {
	        var service = {};
	        service.setHtmlTitle = setHtmlTitle;
	        service.setSlug = setSlug;
	        service.resetData = resetData;
	        resetData();
	        function resetData() {
	            service.website_title = config.appTitle;
	            service.html_title = config.appTitle;
	            service.slug = '';
	        }
	        function setHtmlTitle(html_title) {
	            service.html_title = html_title + ' | ' + service.html_title;
	        }
	        function setSlug(slug) {
	            service.slug = slug;
	        }
	        return service;
	    }
	})();


/***/ },
/* 13 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .factory('UsersService', UsersService);
	    UsersService.$inject = [
	        '$http',
	        'config',
	        'envService',
	        '$rootScope'
	    ];
	    function UsersService($http, config, envService, $rootScope) {
	        var service = {};
	        service.Edit = Edit;
	        function Edit(userData, callback) {
	            var user_id = $rootScope.globals.currentUser.profile.user_entry.id;
	            $http.post(envService.read('apiUrl') + '/users/' + user_id  + '/set_password/', userData)
	                .error(function (response) {
	                    callback(response);
	                })
	                .success(function (response) {
	                    callback(response);
	                });
	        }
	        function handleSuccess(res) {
	            return res.data;
	        }
	        function handleError(error) {
	            return function () {
	                return { success: false, message: error };
	            };
	        }
	        return service;
	    }
	})();


/***/ },
/* 14 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .factory('ProjectsService', ProjectsService);
	    ProjectsService.$inject = [
	        '$http',
	        'config',
	        'envService'
	    ];
	    function ProjectsService($http, config, envService) {
	        var service = {};
	        service.GetAllProjects = GetAllProjects;
	        service.GetActiveProjects = GetActiveProjects;
	        service.GetFinishedProjects = GetFinishedProjects;
	        service.GetProject = GetProject;
	        function GetAllProjects() {
	            return $http.get(envService.read('apiUrl') + '/projects/')
	                        .then(handleSuccess, handleError('Error getting all projects.'));
	        }
	        function GetActiveProjects() {
	            return $http.get(envService.read('apiUrl') + '/projects/?is_finished=3')
	                        .then(handleSuccess, handleError('Error getting active projects.'));
	        }
	        function GetFinishedProjects() {
	            return $http.get(envService.read('apiUrl') + '/projects/?is_finished=2')
	                        .then(handleSuccess, handleError('Error getting finished projects.'));
	        }
	        function GetProject(id) {
	            return $http.get(envService.read('apiUrl') + '/projects/' + id + '/')
	                        .then(handleSuccess, handleError('Error getting project.'));
	        }
	        function handleSuccess(res) {
	            return res.data;
	        }
	        function handleError(error) {
	            return function () {
	                return { success: false, message: error };
	            };
	        }
	        return service;
	    }
	})();


/***/ },
/* 15 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .factory('ProfilesService', ProfilesService);
	    ProfilesService.$inject = [
	        '$http',
	        'config',
	        'envService',
	        '$rootScope'
	    ];
	    function ProfilesService($http, config, envService, $rootScope) {
	        var service = {};
	        service.GetAll = GetAll;
	        service.GetOneByUserID = GetOneByUserID;
	        service.Edit = Edit;
	        function GetAll() {
	            return $http.get(envService.read('apiUrl') + '/profiles/')
	                        .then(handleSuccess, handleError('Error getting all profiles.'));
	        }
	        function GetOneByUserID(id) {
	            return $http.get(envService.read('apiUrl') + '/profiles/?user__id=' + id)
	                        .then(handleSuccess, handleError('Error getting this profile.'));
	        }
	        function Edit(profileData, callback) {
	            var profile_id = $rootScope.globals.currentUser.profile.id;
	            $http.patch(envService.read('apiUrl') + '/profiles/' + profile_id + '/', profileData)
	                .error(function (response) {
	                    callback(response);
	                })
	                .success(function (response) {
	                    callback(response);
	                });
	        }
	        function handleSuccess(res) {
	            return res.data;
	        }
	        function handleError(error) {
	            return function () {
	                return { success: false, message: error };
	            };
	        }
	        return service;
	    }
	})();


/***/ },
/* 16 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .factory('TimeReportsService', TimeReportsService);
	    TimeReportsService.$inject = [
	        '$http',
	        'config',
	        'envService'
	    ];
	    function TimeReportsService($http, config, envService) {
	        var service = {};
	        service.GetReportsByConditions = GetReportsByConditions;
	        service.GetReportsProfilesByConditions = GetReportsProfilesByConditions;
	        service.GetReportsProjectsByConditions = GetReportsProjectsByConditions;
	        service.GetReportsTotalHoursByConditions = GetReportsTotalHoursByConditions;
	        service.GetReports = GetReports;
	        service.Create = Create;
	        service.Update = Update;
	        service.Delete = Delete;
	        service.GetByID = GetByID;
	        function GetByID(id) {
	            return $http.get(envService.read('apiUrl') + '/time-reports/' + id + '/')
	                        .then(handleSuccess, handleError('Error getting time reports.'));
	        }
	        function GetReportsByConditions(conditions) {
	            return $http.get(envService.read('apiUrl') + '/time-reports/?' + $.param(conditions))
	                        .then(handleSuccess, handleError('Error getting time reports.'));
	        }
	        function GetReportsProfilesByConditions(conditions) {
	            return $http.get(envService.read('apiUrl') + '/time-reports/profiles/?' + $.param(conditions))
	                        .then(handleSuccess, handleError('Error getting time reports.'));
	        }
	        function GetReportsProjectsByConditions(conditions) {
	            return $http.get(envService.read('apiUrl') + '/time-reports/projects/?' + $.param(conditions))
	                        .then(handleSuccess, handleError('Error getting time reports.'));
	        }
	        function GetReportsTotalHoursByConditions(conditions) {
	            return $http.get(envService.read('apiUrl') + '/time-reports/total-hours/?' + $.param(conditions))
	                        .then(handleSuccess, handleError('Error getting time reports.'));
	        }
	        function GetReports(project_id) {
	            return $http.get(envService.read('apiUrl') + '/time-reports/?project__id=' + project_id)
	                        .then(handleSuccess, handleError('Error getting time reports.'));
	        }
	        function Create(timeReportData, callback) {
	            var seconds = 0;
	            if(moment.duration(timeReportData.seconds, "HH:mm").asSeconds()) {
	                seconds = moment.duration(timeReportData.seconds, "HH:mm");
	            } else {
	                seconds = moment.duration({'hours' : timeReportData.seconds});
	            }
	            $http.post(envService.read('apiUrl') + '/time-reports/', {
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
	        }
	        function Update(id, timeReportData, callback) {
	            var seconds = 0;
	            if(moment.duration(timeReportData.hours, "HH:mm").asSeconds()) {
	                seconds = moment.duration(timeReportData.hours, "HH:mm");
	            } else {
	                seconds = moment.duration({'hours' : timeReportData.hours});
	            }
	            $http.patch(envService.read('apiUrl') + '/time-reports/'+ id+ '/', {
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
	        }

	        function Delete(id, callback) {
	            $http.delete(envService.read('apiUrl') + '/time-reports/'+ id+ '/')
	                .error(function (response) {
	                    callback(response);
	                })
	                .success(function (response) {
	                    callback(response);
	                });
	        }
	        function handleSuccess(res) {
	            return res.data;
	        }
	        function handleError(error) {
	            return function () {
	                return { success: false, message: error };
	            };
	        }
	        return service;
	    }
	})();


/***/ },
/* 17 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('PageController', PageController);
	    PageController.$inject = [
	        '$rootScope',
	        '$cookieStore',
	        'PageService'
	    ];
	    function PageController($rootScope, $cookieStore, PageService) {
	        $rootScope.page = PageService;
	    }
	})();

/***/ },
/* 18 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('NotFoundController', NotFoundController);
	    NotFoundController.$inject = [
	        'ProjectsService',
	        '$rootScope',
	        'PageService'
	    ];
	    function NotFoundController(ProjectsService, $rootScope, PageService) {
	        var c = this;
	        (function initController() {
	            PageService.resetData();
	            PageService.setHtmlTitle('Oops! That page can\'t be found.');
	            PageService.setSlug('404');
	        })();
	    }
	})();

/***/ },
/* 19 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('HomeController', HomeController);
	    HomeController.$inject = [
	        'ProjectsService',
	        '$rootScope',
	        'PageService'
	    ];
	    function HomeController(ProjectsService, $rootScope, PageService) {
	        var c = this;
	        c.getActiveProjects = [];
	        c.getFinishedProjects = [];
	        (function initController() {
	            PageService.resetData();
	            PageService.setHtmlTitle('Home');
	            PageService.setSlug('home');
	            loadActiveProjects();
	            loadFinishedProjects();
	        })();
	        function loadActiveProjects() {
	            ProjectsService.GetActiveProjects()
	                .then(function (projects) {
	                    c.getActiveProjects = projects;
	                });
	        }
	        function loadFinishedProjects() {
	            ProjectsService.GetFinishedProjects()
	                .then(function (projects) {
	                    c.getFinishedProjects = projects;
	                });
	        }
	    }
	})();

/***/ },
/* 20 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('AccountController', AccountController);
	    AccountController.$inject = [
	        '$rootScope',
	        '$location',
	        'PageService',
	        'ProfilesService',
	        'FlashService',
	        'AuthenticationService',
	        'UsersService'
	    ];
	    function AccountController($rootScope, $location, PageService, ProfilesService, 
	                               FlashService, AuthenticationService, UsersService) {
	        var c = this;
	        c.changeProfile = changeProfile;
	        c.changePassword = changePassword;
	        c.accountData = {};
	        c.accountData.user = {};
	        c.accountData.user.current_password = '';
	        c.accountData.user.new_password = '';
	        c.accountData.user.confirm_new_password = '';
	        c.accountData.profile = {};
	        c.accountData.profile.email_address = $rootScope.globals.currentUser.profile.email_address;
	        c.accountData.profile.first_name = $rootScope.globals.currentUser.profile.first_name;
	        c.accountData.profile.last_name = $rootScope.globals.currentUser.profile.last_name;
	        c.accountData.profile.job_title = $rootScope.globals.currentUser.profile.job_title;
	        c.accountData.profile.phone_number = $rootScope.globals.currentUser.profile.phone_number;
	        c.readableKeys = {};
	        c.readableKeys.email_address = 'Email address';
	        c.readableKeys.first_name = 'First name';
	        c.readableKeys.last_name = 'Last name';
	        c.readableKeys.job_title = 'Job title';
	        c.readableKeys.phone_number = 'Phone number';
	        c.readableKeys.current_password = 'Current password';
	        c.readableKeys.new_password = 'New password';
	        c.readableKeys.confirm_new_password = 'Confirm new password';
	        (function initController() {
	            PageService.resetData();
	            PageService.setHtmlTitle('Account');
	            PageService.setSlug('account');
	        })();

	        function changeProfile() {
	            var messages = [];
	            ProfilesService.Edit(c.accountData.profile, function (response) {
	                if (typeof response.id == 'number' && response.id > 0) {
	                    $rootScope.globals.currentUser.profile = response;
	                    FlashService.Success(['Your account has been successfully updated.']);
	                } else {
	                    angular.forEach(response, function(value, key) {
	                        messages.push(c.readableKeys[key] + ': ' + value);
	                    });
	                    FlashService.Error(messages);
	                }
	            });
	        };
	        function changePassword() {
	            var messages = [];
	            UsersService.Edit(c.accountData.user, function (response) {
	                if (typeof response.id == 'number' && response.id > 0) {
	                    FlashService.Success(['Your account has been successfully updated.']);
	                } else {
	                    angular.forEach(response, function(value, key) {
	                        messages.push(c.readableKeys[key] + ': ' + value);
	                    });
	                    FlashService.Error(messages);
	                }
	            });
	        };
	    }
	})();

/***/ },
/* 21 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('ProjectController', ProjectController);
	    ProjectController.$inject = [
	        '$rootScope',
	        '$location',
	        'FlashService',
	        'PageService',
	        'ProjectsService',
	        'ProfilesService',
	        'TimeReportsService',
	        '$routeParams',
	        '$route'
	    ];
	    function ProjectController($rootScope, $location, FlashService, PageService, ProjectsService, 
	                               ProfilesService, TimeReportsService, $routeParams, $route) {
	        var search = $location.search();
	        var c = this;
	        c.filter = filter;
	        c.removeItem = removeItem;
	        c.listDateRange = [];
	        c.getProject = [];
	        c.profiles = [];
	        c.filterData = {};
	        c.filterData.profile__id = (search.profile__id) ? search.profile__id : null;
	        c.filterData.project__id = $routeParams.id;
	        c.filterData.group_by = '';
	        c.getProjectTimeReports = [];
	        c.getTimeReportsTotalHours = [];
	        c.getTimeReportsProfiles = [];
	        c.totalMonthHours = [];
	        (function initController() {
	            PageService.resetData();
	            PageService.setHtmlTitle('Projects');
	            PageService.setSlug('projects');
	            loadProject($routeParams.id);
	            listTimeReportsProfiles();
	            listTimeReportsTotalHours();
	            listProfiles();
	            getTotalHoursByRange();
	            listDataRange();
	        })();
	        function loadProject(id) {
	            ProjectsService.GetProject(id)
	                .then(function (project) {
	                    if (typeof project.id == 'number' && project.id > 0) {
	                        c.getProject = project;
	                        TimeReportsService.GetReportsByConditions(c.filterData)
	                            .then(function (response) {
	                                c.getProjectTimeReports = response;
	                            });
	                        PageService.setHtmlTitle(project.name);
	                    } else {
	                        $location.path('/404');
	                    }
	                });
	        }
	        function getTotalHoursByRange() {
	            c.filterData.group_by = "MONTH";
	            TimeReportsService.GetReportsProfilesByConditions(c.filterData)
	                .then(function (response) {
	                    c.totalMonthHours = response;
	                });
	        }
	        function listTimeReportsTotalHours() {
	            TimeReportsService.GetReportsTotalHoursByConditions(c.filterData)
	                .then(function (response) {
	                    c.getTimeReportsTotalHours = response;
	                });
	        }
	        function listTimeReportsProfiles() {
	            TimeReportsService.GetReportsProfilesByConditions(c.filterData)
	                .then(function (response) {
	                    c.getTimeReportsProfiles = response;
	                });
	        }
	        function removeItem(id) {
	            var r = confirm('Are you sure that you want to delete this item?');
	            if (r) {
	                TimeReportsService.Delete(id, function (response) {
	                    if (response.length == 0) {
	                        FlashService.Success(['Time report has been successfully deleted.']);
	                    } else {
	                        FlashService.Error(['Unexpected error']);
	                    }
	                    $route.reload();
	                });
	            }
	        }
	        function listProfiles() {
	            ProfilesService.GetAll()
	                .then(function (response) {
	                    c.profiles = response;
	                });
	        }
	        function filter() {
	            $location.url('/projects/' + $routeParams.id + '/time-reports?' + $.param(c.filterData));
	        }
	        function listDataRange() {
	            c.filterData.group_by = "MONTH";
	            TimeReportsService.GetReportsProjectsByConditions(c.filterData)
	                .then(function (response) {
	                    c.listDateRange = response;
	                });
	        }
	    }
	})();

/***/ },
/* 22 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('TimeReportNewController', TimeReportNewController);
	    TimeReportNewController.$inject = [
	        '$rootScope',
	        '$location',
	        'PageService',
	        'FlashService',
	        'ProjectsService',
	        'TimeReportsService',
	        '$routeParams'
	    ];
	    function TimeReportNewController($rootScope, $location, PageService, FlashService, 
	                                     ProjectsService, TimeReportsService, $routeParams) {
	        var c = this;
	        c.create = create;
	        c.getProject = [];
	        c.getProjectTimeReports = [];
	        c.timeReportData = {};
	        c.timeReportData.name = '';
	        c.timeReportData.seconds = '';
	        c.timeReportData.description = '';
	        c.timeReportData.date = moment().format('YYYY-MM-DD');
	        c.timeReportData.profile = $rootScope.globals.currentUser.profile.id;
	        c.timeReportData.project = $routeParams.id;
	        c.readableKeys = {};
	        c.readableKeys.name = 'Name';
	        c.readableKeys.seconds = 'Hours';
	        c.readableKeys.description = 'Description';
	        c.readableKeys.date = 'Date';
	        (function initController() {
	            PageService.resetData();
	            PageService.setHtmlTitle('Projects');
	            PageService.setSlug('projects');
	            loadProject($routeParams.id);
	            initUI();
	        })();
	        function loadProject(id) {
	            ProjectsService.GetProject(id)
	                .then(function (project) {
	                    if(typeof project.id == 'number' && project.id > 0) {
	                        c.getProject = project;
	                        PageService.setHtmlTitle(project.name);
	                    } else {
	                        $location.path('/404');
	                    }
	                });
	        }
	        function create() {
	            var messages = [];
	            TimeReportsService.Create(c.timeReportData, function (response) {
	                if (typeof response.id == 'number' && response.id > 0) {
	                    FlashService.Success(['Time report has been successfully created.']);
	                    $location.path('/projects/' + $routeParams.id + '/time-reports');
	                } else {
	                    angular.forEach(response, function(value, key) {
	                        messages.push(c.readableKeys[key] + ': ' + value);
	                    });
	                    FlashService.Error(messages);
	                }
	            });
	        };
	    }
	})();

/***/ },
/* 23 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('TimeReportListController', TimeReportListController);
	    TimeReportListController.$inject = [
	        '$location',
	        'FlashService',
	        'PageService',
	        'TimeReportsService',
	        'ProfilesService',
	        'ProjectsService',
	        '$route'
	    ];
	    function TimeReportListController($location, FlashService, PageService, TimeReportsService,
	                                      ProfilesService, ProjectsService, $route) {
	        var search = $location.search();
	        var c = this;
	        c.filter = filter;
	        c.removeItem = removeItem;
	        c.profiles = [];
	        c.projects = [];
	        c.filterData = {};
	        c.filterData.date_0 = (search.date_0) ? search.date_0 : moment().startOf('month').format('YYYY-MM-DD');
	        c.filterData.date_1 = (search.date_1) ? search.date_1 : moment().format('YYYY-MM-DD');
	        c.filterData.profile__id = (search.profile__id) ? search.profile__id : null;
	        c.filterData.project__id = (search.project__id) ? search.project__id : null;
	        c.getTimeReports = [];
	        c.getTimeReportsProfiles = [];
	        c.getTimeReportsProjects = [];
	        c.getTimeReportsTotalHours = [];
	        (function initController() {
	            PageService.resetData();
	            PageService.setHtmlTitle('Time Reports');
	            PageService.setSlug('time-reports');
	            listTimeReports();
	            listTimeReportsProfiles();
	            listTimeReportsProjects();
	            listTimeReportsTotalHours();
	            listProfiles();
	            listProjects();
	            initUI();
	        })();
	        function listTimeReports() {
	            TimeReportsService.GetReportsByConditions(c.filterData)
	                .then(function (response) {
	                    c.getTimeReports = response;
	                });
	        }
	        function listTimeReportsProfiles() {
	            TimeReportsService.GetReportsProfilesByConditions(c.filterData)
	                .then(function (response) {
	                    c.getTimeReportsProfiles = response;
	                });
	        }
	        function listTimeReportsProjects() {
	            TimeReportsService.GetReportsProjectsByConditions(c.filterData)
	                .then(function (response) {
	                    c.getTimeReportsProjects = response;
	                });
	        }
	        function listTimeReportsTotalHours() {
	            TimeReportsService.GetReportsTotalHoursByConditions(c.filterData)
	                .then(function (response) {
	                    c.getTimeReportsTotalHours = response;
	                });
	        }
	        function filter() {
	            $location.url('/time-reports?' + $.param(c.filterData));
	        }
	        function removeItem(id) {
	            var r = confirm('Are you sure that you want to delete this item?');
	            if(r){
	                TimeReportsService.Delete(id, function (response) {
	                    if(response.length  == 0){
	                        FlashService.Success(['Time report has been successfully deleted.']);
	                    } else {
	                        FlashService.Error(['Unexpected error']);
	                    }
	                    $route.reload();
	                });
	            }
	        }
	        function listProfiles() {
	            ProfilesService.GetAll()
	                .then(function (response) {
	                    c.profiles = response;
	                });
	        }
	        function listProjects() {
	            ProjectsService.GetAllProjects()
	                .then(function (response) {
	                    c.projects = response;
	                });
	        }
	    }
	})();

/***/ },
/* 24 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('TimeReportEditController', TimeReportEditController);
	    TimeReportEditController.$inject = [
	        '$rootScope', 
	        '$location', 
	        'PageService', 
	        'FlashService', 
	        'ProjectsService', 
	        'TimeReportsService', 
	        '$routeParams'
	    ];
	    function TimeReportEditController($rootScope, $location, PageService, FlashService, 
	                                      ProjectsService, TimeReportsService, $routeParams) {
	        var c = this;
	        c.edit = edit;
	        c.getProject = [];
	        c.getProjectTimeReports = [];
	        c.timeReportData = {};
	        c.timeReportData.id = '';
	        c.timeReportData.name = '';
	        c.timeReportData.seconds = '';
	        c.timeReportData.description = '';
	        c.timeReportData.date = '';
	        c.timeReportData.profile = $rootScope.globals.currentUser.profile.id;
	        c.timeReportData.project = $routeParams.id;
	        c.readableKeys = {};
	        c.readableKeys.name = 'Name';
	        c.readableKeys.seconds = 'Hours';
	        c.readableKeys.description = 'Description';
	        c.readableKeys.date = 'Date';
	        (function initController() {
	            PageService.resetData();
	            PageService.setHtmlTitle('Time Reports');
	            PageService.setSlug('time-reports');
	            loadReportData($routeParams.id);
	            loadProject($routeParams.project_id);
	            initUI();
	        })();
	        function loadProject(id) {
	            ProjectsService.GetProject(id)
	                .then(function (project) {
	                    if(typeof project.id == 'number' && project.id > 0) {
	                        c.getProject = project;
	                        PageService.setHtmlTitle(project.name);
	                    } else {
	                        $location.path('/404');
	                    }
	                });
	        }
	        function loadReportData(id) {
	            TimeReportsService.GetByID(id)
	                .then(function (timeReports) {
	                    if(typeof timeReports.id == 'number' && timeReports.id > 0) {
	                        c.timeReportData = timeReports;
	                        PageService.setHtmlTitle(timeReports.name);
	                    } else {
	                        $location.path('/404');
	                    }
	                });
	        }       
	        function edit(){
	            var messages = [];
	            TimeReportsService.Update($routeParams.id, c.timeReportData, function (response) {
	                if (typeof response.id == 'number' && response.id > 0) {
	                    FlashService.Success(['Time report has been successfully updated.']);
	                    $location.path('/projects/' + $routeParams.project_id + '/time-reports/' + $routeParams.id );
	                } else {
	                    angular.forEach(response, function(value, key) {
	                        messages.push(c.readableKeys[key] + ': ' + value);
	                    });
	                    FlashService.Error(messages);
	                }
	            });
	        }
	    }
	})();

/***/ },
/* 25 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('TimeReportViewController', TimeReportViewController);
	    TimeReportViewController.$inject = [
	        '$rootScope', 
	        '$location', 
	        'PageService', 
	        'FlashService', 
	        'ProjectsService', 
	        'TimeReportsService', 
	        '$routeParams'
	    ];
	    function TimeReportViewController($rootScope, $location, PageService, FlashService,
	                                      ProjectsService, TimeReportsService, $routeParams) {
	        var c = this;
	        c.removeItem = removeItem;
	        c.getProject = [];
	        c.getProjectTimeReports = [];
	        c.timeReportData = {};
	        c.timeReportData.id = '';
	        c.timeReportData.name = '';
	        c.timeReportData.seconds = '';
	        c.timeReportData.description = '';
	        c.timeReportData.date = '';
	        c.timeReportData.profile = $rootScope.globals.currentUser.profile.id;
	        c.timeReportData.project = $routeParams.id;
	        c.readableKeys = {};
	        c.readableKeys.name = 'Name';
	        c.readableKeys.seconds = 'Hours';
	        c.readableKeys.description = 'Description';
	        c.readableKeys.date = 'Date';
	        (function initController() {
	            PageService.resetData();
	            PageService.setHtmlTitle('Time Reports');
	            PageService.setSlug('time-reports');
	            loadReportData($routeParams.id);
	            loadProject($routeParams.project_id);
	            initUI();
	        })();
	        function loadProject(id) {
	            ProjectsService.GetProject(id)
	                .then(function (project) {
	                    if(typeof project.id == 'number' && project.id > 0) {
	                        c.getProject = project;
	                        PageService.setHtmlTitle(project.name);
	                    } else {
	                        $location.path('/404');
	                    }
	                });
	        }
	        function loadReportData(id) {
	            TimeReportsService.GetByID(id)
	                .then(function (timeReports) {
	                    if(typeof timeReports.id == 'number' && timeReports.id > 0) {
	                        c.timeReportData = timeReports;
	                        PageService.setHtmlTitle(timeReports.name);
	                    } else {
	                        $location.path('/404');
	                    }
	                });
	        }
	        function removeItem(id) {
	            var r = confirm('Are you sure that you want to delete this item?');
	            if(r){
	                TimeReportsService.Delete(id, function (response) {
	                    if(response.length  == 0){
	                        FlashService.Success(['Time report has been successfully deleted.']);
	                    } else {
	                        FlashService.Error(['Unexpected error']);
	                    }
	                    history.go(-1);
	                });
	            }
	        }
	    }
	})();

/***/ },
/* 26 */
/***/ function(module, exports) {

	(function () {
	    'use strict';
	    angular
	        .module('app')
	        .controller('LoginController', LoginController);
	    LoginController.$inject = [
	        '$location',
	        'AuthenticationService',
	        'FlashService',
	        'PageService'
	    ];
	    function LoginController($location, AuthenticationService, FlashService, PageService) {
	        var c = this;
	        c.login = login;
	        (function initController() {
	            PageService.resetData();
	            PageService.setHtmlTitle('Login');
	            PageService.setSlug('login');
	            AuthenticationService.ClearCredentials();
	        })();
	        function login() {
	            AuthenticationService.Login(c.username, c.password, function (response) {
	                if (typeof response.token == 'string' && response.token.length > 0) {
	                    AuthenticationService.SetCredentials(response.token, function(response) {
	                        if (typeof response.success == 'boolean' && response.success == true) {
	                            $location.path('/');
	                        } else {
	                            FlashService.Error(['The username and password you entered don\'t match.']);
	                        }
	                    });
	                } else {
	                    FlashService.Error(['The username and password you entered don\'t match.']);
	                }
	            });
	        };
	    }
	})();


/***/ }
/******/ ]);