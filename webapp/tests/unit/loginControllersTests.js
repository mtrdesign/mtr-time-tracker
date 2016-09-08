describe("Unit: Testing Controllers", function () {
    var $controller, $location, $httpBackend, $scope;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($injector) {
        $location = $injector.get('$location');
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');

        $scope = $injector.get('$rootScope');
        $scope.globals.currentUser = {};
        $scope.globals.currentUser.profile = {};

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Login controller with right credentials', function () {
        
        var respond = {'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN2ZSIsIm9yaWdfaWF0IjoxNDcwNzMxMTAxLCJ1c2VyX2lkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImV4cCI6MTQ3MzMyMzEwMX0.5isZY8FcfwwYqklvwJzRDTiKey9_78dX28aJREEvC0o'};
        spyOn($location, 'path');
        var controller = $controller('LoginController', {'$scope': $scope, '$location': $location});
        $httpBackend.expectPOST("//127.0.0.1:8000/time-tracker/api/auth/jwt/new/").respond(200, respond);
        controller.username = "success";
        controller.passsword = "success";
        controller.login();

        $httpBackend.expectPOST("//127.0.0.1:8000/time-tracker/api/auth/jwt/verify/", respond).respond(200, {"success":"true"});
        $httpBackend.flush();
    });

    it('Login controller with wrong credentials', function () {
        var controller = $controller('LoginController', {'$scope': $scope});
        $httpBackend.expectPOST("//127.0.0.1:8000/time-tracker/api/auth/jwt/new/").respond(400, {});
        controller.username = "wrong";
        controller.passsword = "wrong";
        controller.login();

        $httpBackend.flush();

        expect($scope.flash.type).toEqual("error");
    });

});

