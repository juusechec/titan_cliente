'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CrearCumplidoCtrl
 * @description
 * # CrearCumplidoCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('CrearCumplidoCtrl', function (oikosRequest, coreRequest, contratoRequest, $http) {

    //Variable self
    var self = this;

    self.prueba = {};

    //
    $http.get('http://jbpm.udistritaloas.edu.co:8280/services/contratoSuscritoProxyService/contratos_persona/1030619892', {
      headers: {'Accept':'application/json'}
    }).then(function(response){
      self.prueba = response.data;
      console.log(self.prueba.contratos_personas.contrato_persona[0]);
      console.log(self.prueba);
    });
    //contratos_persona.Object.numero_contrato


    //$sce.trustAsResourceUrl('http://jbpm.udistritaloas.edu.co:8280/services/contrato_suscrito_DataService.HTTPEndpoint/contratos_persona/');

    //Función que obtiene todas las dependencias
    oikosRequest.get('dependencia', $.param({
        limit: -1
      }))
      .then(function(response) {
        self.dependencias = response.data;
        console.log(self.dependencias);
      });















  });
