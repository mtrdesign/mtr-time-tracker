(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProjectController', ProjectController);
    ProjectController.$inject = ['$rootScope', '$location', 'FlashService', 'PageService', 'ProjectsService', 'TimeReportsService', '$routeParams'];
    function ProjectController($rootScope, $location, FlashService, PageService, ProjectsService, TimeReportsService, $routeParams) {
        var c = this;
        c.removeItem = removeItem;
        c.getProject = [];
        c.getProjectTimeReports = [];
        (function initController() {
            PageService.resetData();
            PageService.setHtmlTitle('Projects');
            PageService.setSlug('projects');
            loadProject($routeParams.id);
        })();
        function loadProject(id) {
            ProjectsService.GetProject(id)
                .then(function (project) {
                    if(typeof project.id == 'number' && project.id > 0) {
                        c.getProject = project;
                        TimeReportsService.GetReports(id)
                            .then(function (response) {
                                c.getProjectTimeReports = response;
                            });
                        PageService.setHtmlTitle(project.name);
                    } else {
                        $location.path('/404');
                    }
                });
        }

         function removeItem(id) {
            var r = confirm("Are you sure that you want to delete this item?");
            if(r){
                TimeReportsService.Delete(id, function (response) {
                    if(response.length  == 0){
                        FlashService.Success(['Time report has been successfully deleted.']);
                    }else{
                        FlashService.Error(["Unexpected error"]);
                    }
                   loadProject($routeParams.id);
                });
            }
        }
    }
})();