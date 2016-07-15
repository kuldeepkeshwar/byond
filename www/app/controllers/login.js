angular.module('myApp')
    .controller('loginCtrl', ['$scope','AuthFactory', function ($scope,AuthFactory) {
        $scope.phoneNumber='12345678';
        $scope.login=function(){
       alert($scope.phoneNumber,$scope.password);

            AuthFactory.getUser($scope.phoneNumber).then(function(resp){
                alert('eflkerof');

            },function(error){
                console.log(error);
            });
        }

    }]);
