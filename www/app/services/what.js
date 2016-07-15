angular.module('myApp').factory('WhatService',
    function($http,$q, httpHelper,base_url) {



        function getWhatAndWhen() {
            var def = $q.defer();
            var url = base_url+'/v1/byond/whatAndWhen';
            return httpHelper.getCall(url);
        }


        // Public API here
        return {
            getWhatAndWhen: function(phNumber) {
                return getWhatAndWhen();
            }
        };
    });
