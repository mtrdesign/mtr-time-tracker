///<reference path="../_all.ts"/>

import {PageService} from "../services/page";
import {Module} from "../init";
import {FlashService} from "../services/flash";
import {ProjectsService} from "../services/projects";
import {TimeReportsService} from "../services/time_reports";
import {IScope} from "../interface";

interface IProjectRouteParam extends angular.route.IRouteParamsService {
    id:number;
    project_id:number;
}

export class TimeReportEditController {
    public c = this;
    public search:any;
    public filterData:any;
    public readableKeys = {
        name: 'Name',
        seconds: 'Hours',
        description: 'Name',
        date: 'Date',
    };
    public getProject:any;
    public timeReportData:any;

    constructor(private $scope:IScope,
                private $location:ng.ILocationService,
                private PageService:PageService,
                private FlashService:FlashService,
                private ProjectsService:ProjectsService,
                private TimeReportsService:TimeReportsService,
                private $routeParams:IProjectRouteParam) {

        PageService.resetData();
        PageService.setHtmlTitle('Time Reports');
        PageService.setSlug('time-reports');
        this.loadReportData($routeParams.id);
        this.loadProject($routeParams.project_id);
    }

    loadProject(id:number) {

        this.ProjectsService.GetProject(id)
            .then((project:any) => {
                if (typeof project.id == 'number' && project.id > 0) {
                    this.c.getProject = project;
                    this.PageService.setHtmlTitle(project.name);
                } else {
                    this.$location.path('/404');
                }
            });
    }

    loadReportData(id:number) {
        this.TimeReportsService.GetByID(id)
            .then((timeReports) => {
                if (typeof timeReports.id == 'number' && timeReports.id > 0) {
                    this.c.timeReportData = timeReports;
                    this.PageService.setHtmlTitle(timeReports.name);
                } else {
                    this.$location.path('/404');
                }
            });
    }

    edit() {
        let messages:any = [];
        this.TimeReportsService.Update(this.$routeParams.id, this.c.timeReportData, (response:any) => {
            if (typeof response.id == 'number' && response.id > 0) {
                this.FlashService.Success(['Time report has been successfully updated.'], false);
                this.$location.path('/time-reports').search({project__id: this.$routeParams.project_id});
            } else {
                let self:any = this;
                angular.forEach(response, function (value, key) {
                    messages.push(self.c.readableKeys[key] + ': ' + value);
                });
                this.FlashService.Error(messages, false);
            }
        });
    }

}

angular.module(Module).controller("TimeReportEditController", ['$rootScope',
    '$location',
    'PageService',
    'FlashService',
    'ProjectsService',
    'TimeReportsService',
    '$routeParams', NewTimeReportEditController]);
function NewTimeReportEditController($scope:IScope,
                                     $location:ng.ILocationService,
                                     PageService:PageService,
                                     FlashService:FlashService,
                                     ProjectsService:ProjectsService,
                                     TimeReportsService:TimeReportsService,
                                     $routeParams:IProjectRouteParam) {
    return new TimeReportEditController($scope,
        $location,
        PageService,
        FlashService,
        ProjectsService,
        TimeReportsService,
        $routeParams
    );
}