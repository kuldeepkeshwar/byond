/**
 * Created by gopaljee on 16/07/16.
 */


angular.module('myApp').service('thankU',['$q','httpHelper',function ($q,httpHelper) {

    function getDetailsByTxnId(txnId) {
        var def = $q.defer();
        var data={'txnId':txnId};
        var url = 'http://172.16.83.130:8080/v1/byond/payment/update';
        httpHelper._$http({
            method: 'post', url: url, def: def, data: data,
        }, function (resp) {
            def.resolve(resp);
        });
        return def.promise;
    }

    // Public API here
    return {
        getDetailsByTxnId: getDetailsByTxnId
    };


}]);