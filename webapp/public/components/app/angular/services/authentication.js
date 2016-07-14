(function () {
    'use strict';
    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);
    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', 'config', 'jwtHelper', 'ProfilesService'];
    function AuthenticationService($http, $cookieStore, $rootScope, config, jwtHelper, ProfilesService) {
        var service = {};
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.VerifyUser = VerifyUser;
        service.VerifyToken = VerifyToken;
        function Login(username, password, callback) {
            $http.post(config.apiUrl + '/api/auth/jwt/new/', { username: username, password: password })
                .error(function (response) {
                    callback(response);
                })
                .success(function (response) {
                    callback(response);
                });
        }
        function SetCredentials(token, callback) {
            VerifyToken(token, function(response) {
                if (typeof response.token == 'string' && response.token.length > 0) {
                    $http.defaults.headers.common.Authorization = 'JWT ' + token;
                    VerifyUser(token, function(response) {
                        if (typeof response.id == 'number' && response.id > 0) {
                            $rootScope.globals = {
                                currentUser: {
                                    token: token,
                                    profile: response
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
            $http.post(config.apiUrl + '/api/auth/jwt/verify/', { token: token })
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