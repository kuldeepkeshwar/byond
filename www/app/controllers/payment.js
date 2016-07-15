/**
 * Created by gopaljee on 16/07/16.
 */


angular.module('myApp')
    .controller('paymentCtrl', ['$scope','$state', function ($scope,$state) {
alert($state.params.txnId);
        $scope.payNow = function () {
              $state.go('thankU',{'txnId':$state.params.txnId});
        }
    }]);