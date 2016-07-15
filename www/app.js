/**
 * Created by kuldeepkeshwar on 15/07/16.
 */
var app=angular.module('myApp',['ui.router']);
app.config(function($stateProvider, $urlRouterProvider,pushNotificationProvider) {
    pushNotificationProvider.setPushNotificationConfig({
        android: {
            senderID: "251069557742",
            forceShow : true,
            vibrate : true,
            sound : true
        }
    });

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


 