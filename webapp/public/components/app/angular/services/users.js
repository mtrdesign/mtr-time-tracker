(function () {
    'use strict';
    angular
        .module('app')
        .factory('UsersService', UsersService);
    UsersService.$inject = ['$http', 'config', '$rootScope'];
    function UsersService($http, config, $rootScope) {
        var service = {};
        service.Edit = Edit;
        function Edit(userData, callback) {
            $http.patch(config.apiUrl + '/users/' + $rootScope.globals.currentUser.profile.user.id + '/', userData)
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
