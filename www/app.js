/**
 * Created by kuldeepkeshwar on 15/07/16.
 */
var app=angular.module('myApp',['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            controller:'MainController',
            templateUrl: 'app/views/main.html'
        })
        .state('about', {
            url: '/about',
            template: '<p>About</p>'
        });
});

 