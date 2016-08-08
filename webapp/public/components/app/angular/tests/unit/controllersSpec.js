describe("Unit: Testing Controllers", function () {
    var $controller, $rootScope;

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function (_$controller_,  _$rootScope_) {
        $controller = _$controller_;
        /* Set profile */
        $rootScope = _$rootScope_.$new();
        $rootScope.globals.currentUser = {};
        $rootScope.globals.currentUser.profile = {};
    }));

    /* Check controllers */
    it('should have a HomeController controller', function () {
        var controller = $controller('HomeController', {$scope: $rootScope});
        expect(controller).toBeDefined();
    });

    it('should have a AccountController controller', function () {
        var controller = $controller('AccountController', {$scope: $rootScope});
        expect(controller).toBeDefined();
    });

});

