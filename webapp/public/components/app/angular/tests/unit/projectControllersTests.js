describe("Unit: Testing Controllers", function () {
    var ProjectsService, $location, $httpBackend, $scope, envService;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($injector) {
        $location = $injector.get('$location');
        envService = $injector.get('envService');
        config = $injector.get('config');
        ProjectsService = $injector.get('ProjectsService');
        $httpBackend = $injector.get('$httpBackend');

        $scope = $injector.get('$rootScope');
        $scope.globals.currentUser = {};
        $scope.globals.currentUser.profile = {};
        baseUrl = envService.read('apiUrl')
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('get all projects', function () {
        var projectData = [{"id": 2, "name": "Stage faves", "description": "a", "is_finished": false}, {
            "id": 1,
            "name": "Time tracker",
            "description": "bla bla bla bla",
            "is_finished": false
        }];
        $httpBackend.expectGET(baseUrl + "/projects/").respond(200, projectData);
        var promices = ProjectsService.GetAllProjects();
        $httpBackend.flush();
        promices.then(function (result) {
            expect(projectData).toEqual(result);
        }, function (err) {
            expect(projectData).notEqual(err);
        });
    });

});

