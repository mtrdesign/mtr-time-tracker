///<reference path="_all.ts"/>
export interface IScope extends ng.IScope {
    globals:any,
    page:any,
    flash:any
}

export interface IEnvConfig extends angular.environment.Config {
    appTitle:string
}