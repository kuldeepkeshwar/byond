/**
 * Created by gopaljee on 16/07/16.
 */

angular.module('myApp')
    .controller('thankUCtrl', ['$scope','thankU','$state', function ($scope,thankU,$state) {

        $scope.details={};
        (function getDetailsByTxnId(txnId) {
            thankU.getDetailsByTxnId($state.params.txnId).then(function(response){
                $scope.details = response.data;
            },function(error){

            });
        })($state.params.txnId);
    }]);


