angular.module('myApp')
    .controller('loginCtrl', ['$scope','AuthFactory','$state', function ($scope,AuthFactory,$state) {
        $scope.phoneNumber='12345678';
        $scope.login=function(){
       alert($scope.phoneNumber,$scope.password);

            AuthFactory.getUser($scope.phoneNumber).then(function(resp){
                $state.go('home');

            },function(error){

                $state.go('home');
            });
        }

    }]);
