
    'use strict';

    /**
     * @ngdoc service
     * @name nbAriaUiApp.AuthFactory
     * @description
     * # AuthFactory
     * Factory in the nbAriaUiApp.
     */

    angular.module('myApp').factory('AuthFactory',
        function($http,$q, httpHelper,base_url) {



            function getUser(phNumber) {
                var def = $q.defer();
                var url = base_url+'/v1/customer?phoneNumber='+phNumber;
                return httpHelper.getCall(url);
            }


            // Public API here
            return {
                getUser: function(phNumber) {
                    return getUser(phNumber);
                }
            };
        });
