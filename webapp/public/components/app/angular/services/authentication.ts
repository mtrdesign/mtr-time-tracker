///<reference path="../_all.ts"/>
import {Module} from "../init";
import {IScope, IEnvConfig} from "../interface";
import {ProfilesService} from "./profiles";

export class AuthenticationService {

    constructor(private $http:ng.IHttpService,
                private $cookieStore:angular.cookies.ICookieStoreService,
                private $scope:IScope,
                private config:IEnvConfig,
                private jwt:angular.jwt.IJwtHelper,
                private ProfilesService:ProfilesService,
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
        this.VerifyToken(token,
            angular.bind(this,
                function (tokenResponse:any) {
                    if (typeof tokenResponse == 'object' && typeof tokenResponse.token == 'string' && tokenResponse.token.length > 0) {
                        this.$http.defaults.headers.common.Authorization = 'JWT ' + token;
                        this.VerifyUser(token,
                            angular.bind(this,
                                function (userResponse:any) {
                                    if (typeof userResponse[0] == 'object'
                                        && typeof userResponse[0].id == 'number'
                                        && userResponse[0].id > 0) {
                                        this.$scope.globals = {
                                            currentUser: {
                                                token: token,
                                                profile: userResponse[0]
                                            }
                                        };
                                        this.$cookieStore.put('globals', this.$scope.globals);
                                        callback({'success': true});
                                    } else {
                                        this.ClearCredentials();
                                        callback({'success': false});
                                    }
                                }));
                    } else {
                        this.ClearCredentials();
                        callback({'success': false});
                    }
                }));
    }

    public ClearCredentials() {
        this.$scope.globals = {};
        this.$cookieStore.remove('globals');
        this.$http.defaults.headers.common.Authorization = 'JWT';
    }

    public VerifyUser(token:string, callback:any) {
        let profile:any = this.jwt.decodeToken(token);
        this.ProfilesService.GetOneByUserID(profile.user_id)
            .then(function (profile:any) {
                callback(profile);
            });
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

angular.module(Module).factory("AuthenticationService", ["$http", "$cookieStore", "$rootScope", "config", "jwtHelper", "ProfilesService", "envService", NewAuthenticationService]);
export function NewAuthenticationService($http:ng.IHttpService,
                                         $cookieStore:angular.cookies.ICookieStoreService,
                                         $scope:IScope,
                                         config:IEnvConfig,
                                         jwt:angular.jwt.IJwtHelper,
                                         ProfilesService:ProfilesService,
                                         envService:angular.environment.Service) {
    return new AuthenticationService($http, $cookieStore, $scope, config, jwt, ProfilesService, envService);
}
