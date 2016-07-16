/**
 * Created by kuldeepkeshwar on 16/07/16.
 */
angular.module('myApp').service('deals',['httpHelper','$q'/*,'base_url'*/,function (httpHelper,$q/*,base_url*/) {
    this.getDeals=function (what,when,location,dealIds) {
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
        if(dealIds){
            params.push('dealIds='+dealIds.toString());
        }
        var url='http://172.16.83.130:8080/v1/byond/deals?'+params.join('&');

        console.log(url);
        return httpHelper.getCall(url);
    };
    this.getSuggestions=function(what,when,key){
        var def = $q.defer();
        var url = 'http://172.16.83.130:8080/v1/byond/autosuggest?suggestion='+key+'&what='+what +'&when='+when;
        return httpHelper.getCall(url);
    }
}]);
