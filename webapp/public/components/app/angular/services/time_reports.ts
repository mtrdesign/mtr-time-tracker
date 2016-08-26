///<reference path="../_all.ts"/>
import {Module, IEnvConfig, IScope} from "../init";

export class TimeReportsService {

    constructor(private $http:ng.IHttpService,
                private config:IEnvConfig,
                private envService:angular.environment.Service) {
    }


    GetByID(id:number) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/' + id + '/')
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    }

    GetReportsByConditions(conditions:any) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/?' + this.getParams(conditions))
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    }

    GetReportsProfilesByConditions(conditions:any) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/profiles/?' + this.getParams(conditions))
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    }

    GetReportsProjectsByConditions(conditions:any) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/projects/?' + this.getParams(conditions))
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    }

    GetReportsTotalHoursByConditions(conditions:any) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/total-hours/?' + this.getParams(conditions))
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    }

    GetReports(project_id:number) {
        return this.$http.get(this.envService.read('apiUrl') + '/time-reports/?project__id=' + project_id)
            .then(this.handleSuccess, this.handleError('Error getting time reports.'));
    }

    Create(timeReportData:any, callback:any) {
        var seconds = 0;
        if (moment.duration(timeReportData.seconds, "HH:mm").asSeconds()) {
            seconds = moment.duration(timeReportData.seconds, "HH:mm");
        } else {
            seconds = moment.duration({'hours': timeReportData.seconds});
        }
        this.$http.post(this.envService.read('apiUrl') + '/time-reports/', {
            'name': timeReportData.name,
            'seconds': seconds.asSeconds(),
            'description': timeReportData.description,
            'date': timeReportData.date,
            'profile': timeReportData.profile,
            'project': timeReportData.project
        })
            .error(function (response:any) {
                callback(response);
            })
            .success(function (response:any) {
                callback(response);
            });
    }

    Update(id:number, timeReportData:any, callback:any) {
        var seconds = 0;
        if (moment.duration(timeReportData.hours, "HH:mm").asSeconds()) {
            seconds = moment.duration(timeReportData.hours, "HH:mm");
        } else {
            seconds = moment.duration({'hours': timeReportData.hours});
        }
        this.$http.patch(this.envService.read('apiUrl') + '/time-reports/' + id + '/', {
            'name': timeReportData.name,
            'seconds': seconds.asSeconds(),
            'description': timeReportData.description,
            'date': timeReportData.date
        })
            .error(function (response:any) {
                callback(response);
            })
            .success(function (response:any) {
                callback(response);
            });
    }

    Delete(id:number, callback:any) {
        this.$http.delete(this.envService.read('apiUrl') + '/time-reports/' + id + '/')
            .error(function (response:any) {
                callback(response);
            })
            .success(function (response:any) {
                callback(response);
            });
    }

    handleSuccess(res:any) {
        return res.data;
    }

    handleError(error:any) {
        return function () {
            return {success: false, message: error};
        };
    }

    protected getParams(conditions:any) {
        let params = '';
        if (conditions)
            params = $.param(conditions);
        return params;
    }
}

angular.module(Module).factory("TimeReportsService", ['$http', 'config', 'envService', NewTimeReportsService]);
export function NewTimeReportsService($http:ng.IHttpService,
                                      config:IEnvConfig,
                                      envService:angular.environment.Service) {
    return new TimeReportsService($http, config, envService);

}
