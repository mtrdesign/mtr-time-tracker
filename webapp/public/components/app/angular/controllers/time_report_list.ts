///<reference path="../_all.ts"/>

import {PageService} from "../services/page";
import {Module, IScope, IEnvConfig} from "../init";
import {FlashService} from "../services/flash";
import {ProjectsService} from "../services/projects";
import {ProfilesService} from "../services/profiles";
import {TimeReportsService} from "../services/time_reports";
import IRoute = angular.route.IRoute;

interface IProjectRouteParam extends angular.route.IRouteParamsService {
    id:number;
    project_id:number;
}

export class TimeReportListController {
    public c = this;
    public search:any;
    public filterData:any = {};
    public readableKeys:any;
    public profiles:any;
    public projects:any;
    public getProject:any;
    public timeReportData:any;
    public loadReportData:any;
    public loadProject:any;
    public getTimeReports:any;
    public getTimeReportsProjects:any;
    public getTimeReportsProfiles:any;
    public getTimeReportsTotalHours:any;

    constructor(private $scope:IScope,
                private $location:ng.ILocationService,
                private PageService:PageService,
                private FlashService:FlashService,
                private ProjectsService:ProjectsService,
                private ProfilesService:ProfilesService,
                private TimeReportsService:TimeReportsService,
                private $route:angular.route.IRouteService,
                private $routeParams:IProjectRouteParam) {

        PageService.resetData();
        PageService.setHtmlTitle('Time Reports');
        PageService.setSlug('time-reports');

        this.search = $location.search();
        this.c.filterData.date_0 = (this.search.date_0) ? this.search.date_0 : moment().startOf('month').format('YYYY-MM-DD');
        this.c.filterData.date_1 = (this.search.date_1) ? this.search.date_1 : moment().format('YYYY-MM-DD');
        this.c.filterData.profile__id = (this.search.profile__id) ? this.search.profile__id : null;
        this.c.filterData.project__id = (this.search.project__id) ? this.search.project__id : null;

        this.listTimeReports();
        this.listTimeReportsProfiles();
        this.listTimeReportsProjects();
        this.listTimeReportsTotalHours();
        this.listProfiles();
        this.listProjects();
        initUI();
    }

    listTimeReports() {
        this.TimeReportsService.GetReportsByConditions(this.c.filterData)
            .then((response:any) => {
                this.c.getTimeReports = response;
            });
    }

    listTimeReportsProfiles() {
        this.TimeReportsService.GetReportsProfilesByConditions(this.c.filterData)
            .then((response:any) => {
                this.c.getTimeReportsProfiles = response;
            });
    }

    listTimeReportsProjects() {
        this.TimeReportsService.GetReportsProjectsByConditions(this.c.filterData)
            .then((response:any) => {
                this.c.getTimeReportsProjects = response;
            });
    }

    listTimeReportsTotalHours() {
        this.TimeReportsService.GetReportsTotalHoursByConditions(this.c.filterData)
            .then((response:any) => {
                this.c.getTimeReportsTotalHours = response;
            });
    }

    filter() {
        this.$location.url('/time-reports?' + $.param(this.c.filterData));
    }

    removeItem(id:number) {
        let r = confirm('Are you sure that you want to delete this item?');
        if (r) {
            this.TimeReportsService.Delete(id, (response:any) => {
                if (response.length == 0) {
                    this.FlashService.Success(['Time report has been successfully deleted.'], false);
                } else {
                    this.FlashService.Error(['Unexpected error'], false);
                }
                this.$route.reload();
            });
        }
    }

    listProfiles() {
        this.ProfilesService.GetAll()
            .then((response:any) => {
                this.c.profiles = response;
            });
    }

    listProjects() {
        this.ProjectsService.GetAllProjects()
            .then((response) => {
                this.c.projects = response;
            });
    }
}

angular.module(Module).controller("TimeReportListController", ['$rootScope',
    '$location',
    'PageService',
    'FlashService',
    'ProjectsService',
    'ProfilesService',
    'TimeReportsService',
    '$route',
    '$routeParams', NewTimeReportListController]);
function NewTimeReportListController($scope:IScope,
                                     $location:ng.ILocationService,
                                     PageService:PageService,
                                     FlashService:FlashService,
                                     ProjectsService:ProjectsService,
                                     ProfilesService:ProfilesService,
                                     TimeReportsService:TimeReportsService,
                                     $route:angular.route.IRouteService,
                                     $routeParams:IProjectRouteParam) {
    return new TimeReportListController($scope,
        $location,
        PageService,
        FlashService,
        ProjectsService,
        ProfilesService,
        TimeReportsService,
        $route,
        $routeParams
    );
}