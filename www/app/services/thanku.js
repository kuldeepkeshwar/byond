/**
 * Created by gopaljee on 16/07/16.
 */


angular.module('myApp').service('thankU',['$q','httpHelper',function ($q,httpHelper) {

    function getDetailsByTxnId(txnId) {
        var def = $q.defer();
        var data={'txnId':txnId};
        var url = 'http://172.16.80.177:8080/v1/customer?phoneNumber=';
        httpHelper._$http({
            method:'post',
            url:url,
            data:data
        }, function (response) {
            def.resolve(response.data);
        });
        return def.promise;
    }

    // Public API here
    return {
        getDetailsByTxnId: getDetailsByTxnId
    };


}]);