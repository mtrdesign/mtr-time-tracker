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
