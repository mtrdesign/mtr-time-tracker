///<reference path="../_all.ts"/>

import {PageService} from "../services/page";
import {Module} from "../init";
import {IScope} from "../interface";
import {FlashService} from "../services/flash";
import {ProjectsService} from "../services/projects";
import {TimeReportsService} from "../services/time_reports";

interface IProjectRouteParam extends angular.route.IRouteParamsService {
    id:number;
    project_id:number;
}

export class TimeReportNewController {
    public c = this;
    public search:any;
    public filterData:any = {};
    public getProject:any;
    public timeReportData:any = {};
    public readableKeys = {
        name: 'Name',
        seconds: 'Hours',
        description: 'Name',
        date: 'Date',
    };

    constructor(private $scope:IScope,
                private $location:ng.ILocationService,
                private PageService:PageService,
                private FlashService:FlashService,
                private ProjectsService:ProjectsService,
                private TimeReportsService:TimeReportsService,
                private $routeParams:IProjectRouteParam) {

        PageService.resetData();
        PageService.setHtmlTitle('Projects');
        PageService.setSlug('projects');

        this.c.timeReportData.name = '';
        this.c.timeReportData.seconds = '';
        this.c.timeReportData.description = '';
        this.c.timeReportData.date = moment().format('YYYY-MM-DD');
        this.c.timeReportData.profile = $scope.globals.currentUser.profile.id;
        this.c.timeReportData.project = $routeParams.id;

        this.loadProject($routeParams.id);
        initUI();
    }

    loadProject(id:number) {
        this.ProjectsService.GetProject(id)
            .then((project) => {
                if (typeof project.id == 'number' && project.id > 0) {
                    this.c.getProject = project;
                    this.PageService.setHtmlTitle(project.name);
                } else {
                    this.$location.path('/404');
                }
            });
    }

    create() {
        let messages:any = [];
        this.TimeReportsService.Create(this.c.timeReportData, (response:any) => {
            if (typeof response.id == 'number' && response.id > 0) {
                this.FlashService.Success(['Time report has been successfully created.'], false);
                this.$location.path('/projects/' + this.$routeParams.id + '/time-reports');
            } else {
                let self:any = this;
                angular.forEach(response, function (value, key) {
                    messages.push(self.c.readableKeys[key] + ': ' + value);
                });
                this.FlashService.Error(messages, false);
            }
        });
    };
}

angular.module(Module).controller("TimeReportNewController", ['$rootScope',
    '$location',
    'PageService',
    'FlashService',
    'ProjectsService',
    'TimeReportsService',
    '$routeParams', NewTimeReportNewController]);
function NewTimeReportNewController($scope:IScope,
                                    $location:ng.ILocationService,
                                    PageService:PageService,
                                    FlashService:FlashService,
                                    ProjectsService:ProjectsService,
                                    TimeReportsService:TimeReportsService,
                                    $routeParams:IProjectRouteParam) {
    return new TimeReportNewController($scope,
        $location,
        PageService,
        FlashService,
        ProjectsService,
        TimeReportsService,
        $routeParams
    );
}