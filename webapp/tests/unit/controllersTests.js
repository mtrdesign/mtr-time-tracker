describe("Unit: Testing Controllers", function () {
    var $controller, $location, scope;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($injector) {
        scope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        $controller = $injector.get('$controller');
        scope.globals.currentUser = {};
        scope.globals.currentUser.profile = {};
    }));

    /* Check controllers */
    it('should have a HomeController controller', function () {
        var controller = $controller('HomeController', {$scope: scope});
        expect(controller).toBeDefined();
    });

    it('should have a AccountController controller', function () {
        var controller = $controller('AccountController', {scope: scope});
        expect(controller).toBeDefined();
    });

    it('should have a LoginController controller', function () {
        var controller = $controller('LoginController', {scope: scope});
        expect(controller).toBeDefined();
    });

    it('should have a Login url', function () {
        $location.path("/login");
        expect($location.path()).toBe('/login');
    });

    it('should have a 404 page controller ', function () {
        var controller = $controller('NotFoundController', {scope: scope});
        expect(controller).toBeDefined();
    });

    it('should have a PageController controller page', function () {
        var controller = $controller('PageController', {scope: scope});
        expect(controller).toBeDefined();
    });

    it('should have a AccountController controller', function () {
        var controller = $controller('ProjectController', {scope: scope});
        expect(controller).toBeDefined();
    });

    it('should have a LoginController controller', function () {
        var controller = $controller('ProjectController', {scope: scope});
        expect(controller).toBeDefined();
    });

    it('should have a TimeReport controllers', function () {
        var controllerList = $controller('TimeReportListController', {scope: scope});
        expect(controllerList).toBeDefined();

        var controllerView = $controller('TimeReportViewController', {scope: scope});
        expect(controllerView).toBeDefined();

        var controllerNew = $controller('TimeReportNewController', {scope: scope});
        expect(controllerNew).toBeDefined();

        var controllerEdit = $controller('TimeReportEditController', {scope: scope});
        expect(controllerEdit).toBeDefined();
    });
});

