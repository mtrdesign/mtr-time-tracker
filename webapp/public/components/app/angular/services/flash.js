"use strict";
///<reference path="../_all.ts"/>
var init_1 = require("../init");
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
//# sourceMappingURL=flash.js.map