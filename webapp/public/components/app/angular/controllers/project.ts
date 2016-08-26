///<reference path="../_all.ts"/>

import {PageService} from "../services/page";
import {Module} from "../init";
import {FlashService} from "../services/flash";
import {ProjectsService} from "../services/projects";
import {ProfilesService} from "../services/profiles";
import {TimeReportsService} from "../services/time_reports";
import {IScope} from "../interface";


interface IProjectRouteParam extends angular.route.IRouteParamsService {
    id:number;
}

export class ProjectController {
    public c = this;
    public search:any;
    public filterData:any = {};
    public group_by:any;
    public getProject:any;
    public getProjectTimeReports:any;
    public totalMonthHours:any;
    public getTimeReportsTotalHours:any;
    public getTimeReportsProfiles:any;
    public profiles:any;
    public listDateRange:any;

    constructor(private $scope:IScope,
                private $location:ng.ILocationService,
                private FlashService:FlashService,
                private PageService:PageService,
                private ProjectsService:ProjectsService,
                private ProfilesService:ProfilesService,
                private TimeReportsService:TimeReportsService,
                private $routeParams:IProjectRouteParam,
                private $route:angular.route.IRouteService) {
        PageService.resetData();
        PageService.setHtmlTitle('Projects');
        PageService.setSlug('projects');

        this.search = $location.search();
        this.c.filterData.profile__id = (this.search.profile__id) ? this.search.profile__id : null;
        this.c.filterData.project__id = $routeParams.id;
        
        this.loadProject($routeParams.id);
        this.listTimeReportsProfiles();
        this.listTimeReportsTotalHours();
        this.listProfiles();
        this.getTotalHoursByRange();
        this.listDataRange();
    }

    loadProject(id:number) {
        this.ProjectsService.GetProject(id)
            .then((project:any) => {
                if (typeof project.id == 'number' && project.id > 0) {
                    this.c.getProject = project;
                    this.TimeReportsService.GetReportsByConditions(this.c.filterData)
                        .then((response:any) => {
                            this.c.getProjectTimeReports = response;
                        });
                    this.PageService.setHtmlTitle(project.name);
                } else {
                    this.$location.path('/404');
                }
            });
    }

    getTotalHoursByRange() {
        if (this.c.filterData == undefined)
            this.c.filterData = {};
        this.c.filterData.group_by = "MONTH";
        this.TimeReportsService.GetReportsProfilesByConditions(this.c.filterData)
            .then((response:any) => {
                this.c.totalMonthHours = response;
            });
    }

    listTimeReportsTotalHours() {
        this.TimeReportsService.GetReportsTotalHoursByConditions(this.c.filterData)
            .then((response:any) => {
                this.c.getTimeReportsTotalHours = response;
            });
    }

    listTimeReportsProfiles() {
        this.TimeReportsService.GetReportsProfilesByConditions(this.c.filterData)
            .then((response:any) => {
                this.c.getTimeReportsProfiles = response;
            });
    }

    removeItem(id:number) {
        let r:any = confirm('Are you sure that you want to delete this item?');
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

    filter() {
        this.$location.url('/projects/' + this.$routeParams.id + '/time-reports?' + $.param(this.c.filterData));
    }

    listDataRange() {
        this.c.filterData.group_by = "MONTH";
        this.TimeReportsService.GetReportsProjectsByConditions(this.c.filterData)
            .then((response:any) => {
                this.c.listDateRange = response;
            });
    }

}

angular.module(Module).controller("ProjectController", ['$rootScope',
    '$location',
    'FlashService',
    'PageService',
    'ProjectsService',
    'ProfilesService',
    'TimeReportsService',
    '$routeParams',
    '$route', NewProjectController]);
function NewProjectController($scope:IScope,
                              $location:ng.ILocationService,
                              FlashService:FlashService,
                              PageService:PageService,
                              ProjectsService:ProjectsService,
                              ProfilesService:ProfilesService,
                              TimeReportsService:TimeReportsService,
                              $routeParams:IProjectRouteParam,
                              $route:angular.route.IRouteService) {
    return new ProjectController($scope,
        $location,
        FlashService,
        PageService,
        ProjectsService,
        ProfilesService,
        TimeReportsService,
        $routeParams,
        $route
    );
}