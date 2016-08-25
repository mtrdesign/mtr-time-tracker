///<reference path="../_all.ts"/>
import {IScope, Module} from "../init";

export class FlashService {

    constructor(private $scope:IScope) {
        this.init();
    }

    protected init() {
        this.$scope.$on('$locationChangeStart', function () {
            let flash = this.$scope.flash;
            if (flash) {
                if (!flash.keepAfterLocationChange) {
                    delete this.$scope.flash;
                } else {
                    flash.keepAfterLocationChange = false;
                }
            }
        });
    }

    public Success(messages:string, keepAfterLocationChange:any) {
        this.$scope.flash = {
            messages: messages,
            type: 'success',
            keepAfterLocationChange: keepAfterLocationChange
        };
    }

    public Error(messages:string, keepAfterLocationChange:any) {
        this.$scope.flash = {
            messages: messages,
            type: 'error',
            keepAfterLocationChange: keepAfterLocationChange
        };
    }

}

angular.module(Module).factory("FlashService", ["$rootScope", NewFlashService]);
export function NewFlashService($scope:IScope) {
    return new FlashService($scope);
}
