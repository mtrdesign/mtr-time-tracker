// describe("Unit: Testing Controllers", function () {
//     var $controller, $location, scope;
//
//     beforeEach(angular.mock.module('app'));
//
//     beforeEach(inject(function ($injector) {
//         scope = $injector.get('$rootScope');
//         $location = $injector.get('$location');
//         $controller = $injector.get('$controller');
//         scope.globals.currentUser = {};
//         scope.globals.currentUser.profile = {};
//     }));
//
//     /* Check controllers */
//     it('should have a HomeController controller', function () {
//         var controller = $controller('HomeController', {$scope: scope});
//         expect(controller).toBeDefined();
//     });
//
//     it('should have a AccountController controller', function () {
//         var controller = $controller('AccountController', {scope: scope});
//         expect(controller).toBeDefined();
//     });
//
//     it('should have a LoginController controller', function () {
//         var controller = $controller('LoginController', {scope: scope});
//         expect(controller).toBeDefined();
//     });
//
//     it('Login url', function () {
//         $location.path("/login");
//         expect($location.path()).toBe('/login');
//     });
// });
//
