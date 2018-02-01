'use strict';

/**
 * @ngdoc service
 * @name titanClienteV2App.administrativaMidService
 * @description
 * # administrativaMidService
 * Factory in the titanClienteV2App.
 */
angular.module('titanClienteV2App')
  .factory('administrativaMidService', function ($http) {
    // Service logic
    // ...
    var path = "http://10.20.0.254/administrativa_mid_api/v1/";
    // Public API here
    return {
      get: function (tabla,params) {
        return $http.get(path+tabla+"/"+params);
      },
      post: function (tabla,elemento) {
        return $http.post(path+tabla,elemento);
      },
      put: function (tabla,id,elemento) {
        return $http.put(path+tabla+"/"+id,elemento);
      },
      delete: function (tabla,id) {
        return $http.delete(path+tabla+"/"+id);
      }
    };
  });
