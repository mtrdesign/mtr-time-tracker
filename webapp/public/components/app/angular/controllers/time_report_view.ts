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

export class TimeReportViewController {
    public c = this;
    public search:any;
    public filterData:any;
    public readableKeys:any;
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

    removeItem(id:number) {
        let r = confirm('Are you sure that you want to delete this item?');
        if (r) {
            this.TimeReportsService.Delete(id, (response:any) => {
                if (response.length == 0) {
                    this.FlashService.Success(['Time report has been successfully deleted.'],false);
                } else {
                    this.FlashService.Error(['Unexpected error'],false);
                }
                history.go(-1);
            });
        }
    }

}

angular.module(Module).controller("TimeReportViewController", ['$rootScope',
    '$location',
    'PageService',
    'FlashService',
    'ProjectsService',
    'TimeReportsService',
    '$routeParams', NewTimeReportViewController]);
function NewTimeReportViewController($scope:IScope,
                                     $location:ng.ILocationService,
                                     PageService:PageService,
                                     FlashService:FlashService,
                                     ProjectsService:ProjectsService,
                                     TimeReportsService:TimeReportsService,
                                     $routeParams:IProjectRouteParam) {
    return new TimeReportViewController($scope,
        $location,
        PageService,
        FlashService,
        ProjectsService,
        TimeReportsService,
        $routeParams
    );
}