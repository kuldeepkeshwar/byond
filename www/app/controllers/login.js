angular.module('myApp')
    .controller('loginCtrl', ['$scope','AuthFactory','$state','$rootScope', function ($scope,AuthFactory,$state,$rootScope) {
        $scope.phoneNumber='12345678';
        $scope.login=function(){
            AuthFactory.getUser($scope.phoneNumber).then(function(resp){


                $rootScope.customerId=resp.customerId;
                $rootScope.customerName=resp.name;
                $rootScope.phoneNumber=$scope.phoneNumber;
                $state.go('home',{type:0});

            },function(error){

                $state.go('home',{type:0});
            });
        }

    }]);
