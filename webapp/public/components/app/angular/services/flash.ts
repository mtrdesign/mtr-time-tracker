///<reference path="../_all.ts"/>
import {Module} from "../init";
import {IScope, IEnvConfig} from "../interface";

export class FlashService {

    constructor(private $scope:IScope) {
        this.init();
    }

    protected init() {
        this.$scope.$on('$locationChangeStart', () => {
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

    public Success(messages:any, keepAfterLocationChange:any) {
        this.$scope.flash = {
            messages: messages,
            type: 'success',
            keepAfterLocationChange: keepAfterLocationChange
        };
    }

    public Error(messages:any, keepAfterLocationChange:any) {
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
