/**
 * Created by kuldeepkeshwar on 15/07/16.
 */
var app=angular.module('myApp', []);

app.controller('MyController', ['$scope', function ($scope) {
    $scope.greetMe = 'World';
 }]);

// angular.element(document).ready(function() {
//     angular.bootstrap(document, ['myApp']);
// });