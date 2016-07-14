(function () {
    'use strict';
    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);
    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope'];
    function AuthenticationService($http, $cookieStore, $rootScope) {
        var service = {};
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        function Login(username, password, callback) {
            $http.post('http://127.0.0.1:8000/api/auth/jwt/new/', { username: username, password: password })
                .error(function (response) {
                    callback(response);
                })
                .success(function (response) {
                    callback(response);
                });
        }
        function SetCredentials(token) {
            $rootScope.globals = {
                currentUser: {
                    token: token
                }
            };
            $http.defaults.headers.common.Authorization = 'JWT ' + token;
            $cookieStore.put('globals', $rootScope.globals);
        }
        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'JWT';
        }
        return service;
    }
})();