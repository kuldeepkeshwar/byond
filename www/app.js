/**
 * Created by kuldeepkeshwar on 15/07/16.
 */
var app=angular.module('myApp',['ui.router']);
angular.module('myApp').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('home', {
            url: '/home',
            controller:'MainController',
            templateUrl: 'app/views/main.html',params:{type:0}
        })
        .state('about', {
            url: '/about',
            template: '<p>About</p>'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller:'loginCtrl'
        });
});


