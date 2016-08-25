///<reference path="../_all.ts"/>
import {IEnvConfig, IScope, Module} from "../init";

export class AuthenticationService {

    constructor(private $http:ng.IHttpService,
                private $cookieStore:angular.cookies.ICookieStoreService,
                private $scope:IScope,
                private config:IEnvConfig,
                private envService:angular.environment.Service) {
    }

    public Login(username:string, password:string, callback:any) {
        this.$http.post(this.envService.read('apiUrl') + '/auth/jwt/new/', {
            username: username,
            password: password
        })
            .error(function (response) {
                callback(response);
            })
            .success(function (response) {
                callback(response);
            });
    }

    public SetCredentials(token:string, callback:any) {
        this.VerifyToken(token, function (tokenResponse:any) {
            if (typeof tokenResponse == 'object'
                && typeof tokenResponse.token == 'string'
                && tokenResponse.token.length > 0) {
                this.$http.defaults.headers.common.Authorization = 'JWT ' + token;
                this.VerifyUser(token, function (userResponse:any) {
                    if (typeof userResponse[0] == 'object'
                        && typeof userResponse[0].id == 'number'
                        && userResponse[0].id > 0) {
                        this.$rootScope.globals = {
                            currentUser: {
                                token: token,
                                profile: userResponse[0]
                            }
                        };
                        this.$cookieStore.put('globals', this.$rootScope.globals);
                        callback({'success': true});
                    } else {
                        this.ClearCredentials();
                        callback({'success': false});
                    }
                });
            } else {
                this.ClearCredentials();
                callback({'success': false});
            }
        });
    }

    public ClearCredentials() {
        this.$scope.globals = {};
        this.$cookieStore.remove('globals');
        this.$http.defaults.headers.common.Authorization = 'JWT';
    }

    public VerifyUser(token:string, callback:any) {
        // let ProfileService = NewPageService(this.config);
        // ProfilesService.GetOneByUserID(jwtHelper.decodeToken(token).user_id)
        //     .then(function (profile) {
        //         callback(profile);
        //     });
    }

    public VerifyToken(token:string, callback:any) {
        this.$http.post(this.envService.read('apiUrl') + '/auth/jwt/verify/', {
            token: token
        })
            .error(function (response:any) {
                callback(response);
            })
            .success(function (response:any) {
                callback(response);
            });
    }
}

angular.module(Module).factory("AuthenticationService", ["$http", "$cookieStore", "$rootScope", "config", "envService", NewAuthenticationService]);
export function NewAuthenticationService($http:ng.IHttpService,
                                         $cookieStore:angular.cookies.ICookieStoreService,
                                         $scope:IScope,
                                         config:IEnvConfig,
                                         envService:angular.environment.Service) {
    return new AuthenticationService($http, $cookieStore, $scope, config, envService);
}
