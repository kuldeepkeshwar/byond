angular.module('myApp')
    .controller('loginCtrl', ['$scope','AuthFactory','$state', function ($scope,AuthFactory,$state) {
        $scope.phoneNumber='12345678';
        $scope.login=function(){
       alert($scope.phoneNumber,$scope.password);

            AuthFactory.getUser($scope.phoneNumber).then(function(resp){
                alert('eflkerof');
                $state.go('home');

            },function(error){
                console.log(error);

                $state.go('home');
            });
        }

    }]);
