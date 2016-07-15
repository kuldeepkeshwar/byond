
    'use strict';

    /**
     * @ngdoc service
     * @name nbAriaUiApp.AuthFactory
     * @description
     * # AuthFactory
     * Factory in the nbAriaUiApp.
     */

    angular.module('myApp').factory('AuthFactory',
        function($http,$q, httpHelper) {



            function getUser(phNumber) {
                var def = $q.defer();
                var url = 'http://customerprofile.iwanto.in/customerplatform/api/v2/customers/search';
                var data={
                    "conditionalOperator": "or",
                    "criterias": [
                        {
                            "fieldName": "primaryPhoneNumber",
                            "term": phNumber,
                            "typeOfSearch": "exactMatch"
                        }
                    ]
                };
                httpHelper._$http({
                    method: 'post', url: url,data:data, def: def
                }, function (resp) {
                    def.resolve(resp);
                   alert(resp);
                });
                return def.promise;
            }

            // Public API here
            return {
                getUser: function(phNumber) {
                    return getUser(phNumber);
                }
            };
        });
