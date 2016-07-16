'use strict';

/**
 * @ngdoc service
 * @name account.manager.httpHelper
 * @description
 * # httpHelper
 * Service in the account.manager.
 */
angular.module('myApp')
    .service('httpHelper', function ($http,$log,$q) {
        var service={};
        service._$http=function (config, sbCb) {
            $http[config.method](config.url, config.data).success(function (resp) {
                sbCb(resp);
            }).error(function (error) {
                $log.error(error);
                config.def.reject(error);
            });
        };
        service.updateCall=function (url,_data) {
            var def = $q.defer();

            service._$http({
                method: 'put', url: url, def: def, data: _data
            }, function (resp) {
                def.resolve(resp);
            });
            return def.promise;
        };
        service.getCall=function (url) {
            var def = $q.defer();
            service._$http({
                method: 'get', url: url, def: def
            }, function (resp) {
                def.resolve(resp);
            });
            return def.promise;
        };
        return service;
    });
