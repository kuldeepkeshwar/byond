/**
 * Created by kuldeepkeshwar on 16/07/16.
 */
angular.module('myApp').service('deals',['httpHelper'/*,'base_url'*/,function (httpHelper/*,base_url*/) {
    this.getDeals=function (what,when,location) {
        var params=[];
        if(what){
            params.push('what='+what);
        }
        if(when){
            params.push('when='+when);
        }
        if(location){
            params.push('location='+location);
        }
        var url='http://172.16.83.130:8080/v1/byond/deals?'+params.join('&');
        return httpHelper.getCall(url);
    };



    this.getDealsDataByEvent =function (eventId) {
        var def = $q.defer();
        var url = base_url+'/v1/byond/event/'+eventId;
        return httpHelper.getCall(url);
    };




}]);