'use strict';

/**
 * @ngdoc service
 * @name titanClienteV2App.academicaService
 * @description
 * # academicaService
 * Factory in the titanClienteV2App.
 */
angular.module('titanClienteV2App')
  .factory('academicaService', function ($http) {
    // Service logic
    var path = "https://jbpm.udistritaloas.edu.co:8243/services/academicaProxy/";
    var cabecera = {
      headers: {
        'Accept': 'application/json'
      }
    };
    // Public API here
    return {
      get: function (tabla, params) {
        return $http.get(path + tabla + "/" + params, cabecera);
      },
      post: function (tabla, elemento) {
        return $http.post(path + tabla, elemento);
      },
      put: function (tabla, id, elemento) {
        return $http.put(path + tabla + "/" + id, elemento);
      },
      delete: function (tabla, id) {
        return $http.delete(path + tabla + "/" + id);
      }
    };
  });
