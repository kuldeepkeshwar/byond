/**
 * Created by kuldeepkeshwar on 16/07/16.
 */
angular.module('myApp').service('deals',['httpHelper','$q'/*,'base_url'*/,function (httpHelper,$q/*,base_url*/) {
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
    this.createEvent=function (data) {
      var def=$q.defer();
        var url='http://172.16.83.130:8080/v1/byond/event';
        httpHelper._$http({
            method: 'post', url: url, def: def, data: data,
        }, function (resp) {
            def.resolve(resp);
        });
        return def.promise;
    };
}]);