angular.module('myApp')
    .controller('loginCtrl', ['$scope','AuthFactory','$state','$rootScope', function ($scope,AuthFactory,$state,$rootScope) {
        $scope.phoneNumber='12345678';
        $scope.login=function(){
       alert($scope.phoneNumber,$scope.password);

            AuthFactory.getUser($scope.phoneNumber).then(function(resp){
                $state.go('home');
                $rootScope.customerId=resp.customerId;
                $rootScope.customerName=resp.name;

            },function(error){

                $state.go('home');
            });
        }

    }]);
