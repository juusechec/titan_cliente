'use strict';

/**
 * @ngdoc service
 * @name titanClienteV2App.contratoRequest
 * @description
 * # contratoRequest
 * Factory in the titanClienteV2App.
 */
angular.module('titanClienteV2App')
  .factory('contratoRequest', function () {
    // Service logic
    var path = "http://jbpm.udistritaloas.edu.co:8280/services/contrato_suscrito_DataService.HTTPEndpoint/";
    // Public API here
    return {
      get: function (tabla,params) {
        return $http.get(path+tabla+"/?"+params);
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
