var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
    entry: [
        './public/components/app/css/loading.css',
        './public/components/app/css/base.css',


        // './public/components/bower/jquery/dist/jquery.min.js',
        // './public/components/bower/bootstrap/dist/js/bootstrap.min.js',
        // './public/components/bower/moment/min/moment.min.js',
        // './public/components/bower/datetimepicker/build/jquery.datetimepicker.full.min.js',
        // './public/components/bower/jquery-mask-plugin/dist/jquery.mask.min.js',

        // './public/components/bower/angular/angular.min.js',
        // './public/components/bower/angular-environment/dist/angular-environment.min.js',
        // './public/components/bower/angular-cookies/angular-cookies.js',
        // './public/components/bower/angular-route/angular-route.js',
        // './public/components/bower/angular-jwt/dist/angular-jwt.min.js',
        // './public/components/bower/angular-moment/angular-moment.min.js',

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
    ],
    output: {
        path: './public/components/app/js',
        filename: 'app.min.js'
    },
    resolve: {
        modulesDirectories: ["./public/components/bower/"],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin("../css/app.min.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
                loader: "file-loader?name=[name].[ext]"
            },
            {
                test: /[\/]angular\.js$/,
                loader: "exports?angular"
            }
        ]
    }
};