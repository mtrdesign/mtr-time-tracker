(function () {
    'use strict';
    angular
        .module('app')
        .factory('FlashService', FlashService);
    FlashService.$inject = ['$rootScope'];
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