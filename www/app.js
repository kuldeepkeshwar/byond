/**
 * Created by kuldeepkeshwar on 15/07/16.
 */
var app=angular.module('myApp',['ui.router']);


app.config(function($stateProvider, $urlRouterProvider,pushNotificationProvider) {
    $urlRouterProvider.otherwise('/login');
    pushNotificationProvider.setPushNotificationConfig({
        android: {
            senderID: "251069557742",
            forceShow : true,
            vibrate : true,
            sound : true
        }
    });

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

app.run(
    function ($state,pushNotification) {
        pushNotification.getPushNotification(function (data) {
            $state.go('about')
        })
    });



