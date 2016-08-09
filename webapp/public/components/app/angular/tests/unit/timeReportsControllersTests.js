describe("Unit: Testing Controllers", function () {
    var TimeReportsService, $location, $httpBackend, $scope, envService;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($injector) {
        $location = $injector.get('$location');
        envService = $injector.get('envService');
        config = $injector.get('config');
        TimeReportsService = $injector.get('TimeReportsService');
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

    it('get all time reports', function () {
        var reportData = [{
            "id": 7,
            "name": "asdas",
            "date": "2016-07-01",
            "description": "asdasdas",
            "hours": "01:00",
            "seconds": 3600,
            "profile_entry": {
                "id": 1,
                "first_name": "Svetlozar",
                "last_name": "Penev",
                "full_name": "Svetlozar Penev",
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
            },
            "project_entry": {"id": 2, "name": "Stage faves", "description": "a", "is_finished": false},
            "profile": 1,
            "project": 2
        }];

        $httpBackend.expectGET(baseUrl + "/time-reports/?").respond(200, reportData);
        var promices = TimeReportsService.GetReportsByConditions([]);
        $httpBackend.flush();
        promices.then(function (result) {
            expect(reportData).toEqual(result);
        }, function (err) {
            expect(reportData).notEqual(err);
        });
    });

    it('get time report by id', function () {
        var id = 8;
        var reportData = {
            "id": id,
            "name": "213321321321",
            "date": "2016-08-03",
            "description": "asdsad",
            "hours": "23:00",
            "seconds": 82800,
            "profile_entry": {
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
            },
            "project_entry": {"id": 1, "name": "Time tracker", "description": "bla bla bla bla", "is_finished": false},
            "profile": 1,
            "project": 1
        };

        $httpBackend.expectGET(baseUrl + "/time-reports/" + id + "/").respond(200, reportData);
        var promices = TimeReportsService.GetByID(id);
        $httpBackend.flush();
        promices.then(function (result) {
            expect(reportData).toEqual(result);
        }, function (err) {
            expect(reportData).notEqual(err);
        });
    });

    it('get time report profiles', function () {
        var reportData = [{
            "year": 2016,
            "month": 8,
            "total_seconds": 82800,
            "total_hours": "23:00",
            "profile": {
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
            }
        }, {
            "year": 2016,
            "month": 5,
            "total_seconds": 82800,
            "total_hours": "23:00",
            "profile": {
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
            }
        }, {
            "year": 2015,
            "month": 11,
            "total_seconds": 7200,
            "total_hours": "2:00",
            "profile": {
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
            }
        }, {
            "year": 2014,
            "month": 12,
            "total_seconds": 82800,
            "total_hours": "23:00",
            "profile": {
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
            }
        }]

        $httpBackend.expectGET(baseUrl + "/time-reports/profiles/?").respond(200, reportData);
        var promices = TimeReportsService.GetReportsProfilesByConditions([]);
        $httpBackend.flush();
        promices.then(function (result) {
            expect(reportData).toEqual(result);
        }, function (err) {
            expect(reportData).notEqual(err);
        });
    });

    it('get time report projects', function () {
        var reportData = [{
            "year": 2016,
            "month": 8,
            "total_seconds": 82800,
            "total_hours": "23:00",
            "project": {"id": 1, "name": "Time tracker", "description": "bla bla bla bla", "is_finished": false}
        }, {
            "year": 2016,
            "month": 5,
            "total_seconds": 82800,
            "total_hours": "23:00",
            "project": {"id": 1, "name": "Time tracker", "description": "bla bla bla bla", "is_finished": false}
        }, {
            "year": 2015,
            "month": 11,
            "total_seconds": 7200,
            "total_hours": "2:00",
            "project": {"id": 1, "name": "Time tracker", "description": "bla bla bla bla", "is_finished": false}
        }, {
            "year": 2014,
            "month": 12,
            "total_seconds": 82800,
            "total_hours": "23:00",
            "project": {"id": 1, "name": "Time tracker", "description": "bla bla bla bla", "is_finished": false}
        }];

        $httpBackend.expectGET(baseUrl + "/time-reports/projects/?").respond(200, reportData);
        var promices = TimeReportsService.GetReportsProjectsByConditions([]);
        $httpBackend.flush();
        promices.then(function (result) {
            expect(reportData).toEqual(result);
        }, function (err) {
            expect(reportData).notEqual(err);
        });
    });


});

