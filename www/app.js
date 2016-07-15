/**
 * Created by kuldeepkeshwar on 15/07/16.
 */
var app=angular.module('myApp',['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('home', {
            url: '/home',
            template: '<p>home dferjfo</p>'
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

app.controller('MyController', ['$scope', function ($scope) {
    $scope.greetMe = 'World';
 }]);

