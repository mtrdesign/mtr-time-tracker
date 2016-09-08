describe("Unit: Testing Controllers", function () {
    var ProfilesService, $location, $httpBackend, $scope, envService;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($injector) {
        $location = $injector.get('$location');
        envService = $injector.get('envService');
        config = $injector.get('config');
        ProfilesService = $injector.get('ProfilesService');
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

    it('get all profiles', function () {
        var profileData = [{
            "id": 1,
            "first_name": "Svetlozat",
            "last_name": "Penev",
            "full_name": "Svetlozat Penev",
            "email_address": null,
            "job_title": "Developer",
            "phone_number": "3",
            "user_entry": {"id": 1, "username": "sve", "email": "admin@admin.com", "is_superuser": true},
            "company_entry": {
                "id": 1,
                "name": "Svet",
                "email_address": "ad@ad.com",
                "phone_number": "",
                "fax_number": "",
                "website_url": "",
                "address": ""
            }
        }, {
            "id": 2,
            "first_name": "Gosho",
            "last_name": "Georgiev",
            "full_name": "Gosho Georgiev",
            "email_address": "asd@asd.asd",
            "job_title": "2",
            "phone_number": "2222",
            "user_entry": {"id": 2, "username": "sve1", "email": "asd@ad.asd", "is_superuser": true},
            "company_entry": {
                "id": 1,
                "name": "Svet",
                "email_address": "ad@ad.com",
                "phone_number": "",
                "fax_number": "",
                "website_url": "",
                "address": ""
            }
        }];
        $httpBackend.expectGET(baseUrl + "/profiles/").respond(200, profileData);
        var promices = ProfilesService.GetAll();
        $httpBackend.flush();
        promices.then(function (result) {
            expect(profileData).toEqual(result);
        }, function (err) {
            expect(profileData).notEqual(err);
        });
    });

    it('edit profile', function () {
        var id = 1;
        $scope.globals.currentUser.profile.id = id;

        var profileData = {
            "id": id,
            "first_name": "Svetlozat",
            "last_name": "Penev",
            "full_name": "Svetlozat Penev",
            "email_address": null,
            "job_title": "Developer",
            "phone_number": "3",
            "user_entry": {"id": 1, "username": "sve", "email": "admin@admin.com", "is_superuser": true},
            "company_entry": {
                "id": 1,
                "name": "Svet",
                "email_address": "ad@ad.com",
                "phone_number": "",
                "fax_number": "",
                "website_url": "",
                "address": ""
            }
        };
        $httpBackend.expectPATCH(baseUrl + '/profiles/' + id + '/').respond(200, profileData);

        ProfilesService.Edit(profileData, callback);

        $httpBackend.flush();

        function callback(result) {
            expect(profileData).toEqual(result);
        }
    });
});

