var webpack = require('webpack');
var path = require("path");

module.exports = {
     entry: [
         './public/components/app/angular/init.js',
         './public/components/app/angular/filters.js',
         './public/components/app/angular/http_loader.js',
         './public/components/app/angular/services/authentication.js',
         './public/components/app/angular/services/flash.js',
         './public/components/app/angular/services/page.js',
         './public/components/app/angular/services/users.js',
         './public/components/app/angular/services/projects.js',
         './public/components/app/angular/services/profiles.js',
         './public/components/app/angular/services/time_reports.js',
         './public/components/app/angular/controllers/page.js',
         './public/components/app/angular/controllers/404.js',
         './public/components/app/angular/controllers/home.js',
         './public/components/app/angular/controllers/account.js',
         './public/components/app/angular/controllers/project.js',
         './public/components/app/angular/controllers/time_report_new.js',
         './public/components/app/angular/controllers/time_report_list.js',
         './public/components/app/angular/controllers/time_report_edit.js',
         './public/components/app/angular/controllers/time_report_view.js',
         './public/components/app/angular/controllers/login.js',
         './public/components/app/js/base.js',
     ],
     output: {
         path: './public/components/app/js',
         filename: 'app.bundle.js'
     },
     plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
 };