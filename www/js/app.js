/**
 * Created by kuldeepkeshwar on 15/07/16.
 */
var app=angular.module('myApp',['ui.router']);

app.controller('MyController', ['$scope', function ($scope) {
    $scope.greetMe = 'World';
 }]);

 