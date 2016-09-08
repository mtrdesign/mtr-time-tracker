describe("Unit: Testing Services", function () {
    var scope, factory, FlashService;
    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($injector) {
        FlashService = $injector.get('FlashService');
        scope = $injector.get('$rootScope');
        scope.globals.currentUser = {};
        scope.globals.currentUser.profile = {};


    }));

    it('can get an instance of FlashServices', function () {
        expect(FlashService).toBeDefined();
    });

    it('can send successfully message', function () {
        var message = "Testing successfully message!";
        FlashService.Success(message);
        expect(scope.flash.messages).toEqual(message);
    });

    it('can send error message', function () {
        var message = "Testing error message!";
        FlashService.Error(message);
        expect(scope.flash.messages).toEqual(message);
    });

    
});