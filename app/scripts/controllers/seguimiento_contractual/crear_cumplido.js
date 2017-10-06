'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CrearCumplidoCtrl
 * @description
 * # CrearCumplidoCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('CrearCumplidoCtrl', function(oikosRequest, coreRequest, contratoRequest, $http) {

    //Variable self
    var self = this;

    //Variable que contiene la información del cumplido
    self.cumplido = {};

    /*
      Función que obtiene el número de contrato y la vigencia de acuerdo al número de identidad
    */
    self.obtener_informacion_cumplido = function() {
      //Petición para obtener el número del contrato y la vigencia de los contratos en ejecución de la persona del identificador de la cedula
      $http.get('http://jbpm.udistritaloas.edu.co:8280/services/contratoSuscritoProxyService/contratos_persona/' + self.Documento + '', {
        headers: {
          'Accept': 'application/json'
        }
      }).then(function(response) {
        //Variable que contiene la información de la respuesta de la petición
        self.respuesta_contratos_persona = response.data;
        //Variable que contiene la información de contrato persona
        self.cumplido = self.respuesta_contratos_persona.contratos_personas.contrato_persona[0];

        console.log(self.cumplido);

        //Consumo de servicio para obtener la información del contratista
        $http.get('http://jbpm.udistritaloas.edu.co:8280/services/contratoSuscritoProxyService/informacion_contrato_contratista/' + self.cumplido.numero_contrato + '/' + self.cumplido.vigencia + '', {
          headers: {
            'Accept': 'application/json'
          }
        }).then(function(response) {
          //Variable que contiene la respuesta del servicio informacion_contrato_contratista
          self.respuesta_cumplido_informacion = response.data;

          //Variable que contiene la informacion del cumplido_informacion
          self.cumplido_informacion = self.respuesta_cumplido_informacion.informacion_contratista;

          console.log(self.cumplido_informacion);
        });
      });
    };


    /*
      Función que obtiene el valor a cobrar por los días laborados
    */
    self.obtener_pago = function(){

      console.log(self.cumplido_informacion.valor_contrato);

      self.valor_contrato_int = parseInt(self.cumplido_informacion.valor_contrato);
      self.valor_tiempo_dias_int = parseInt(self.cumplido_informacion.tiempo.valor);

      self.valor_dia_contrato = (self.valor_contrato_int/self.valor_tiempo_dias_int);

      self.dias_laborados = (self.cumplido_informacion.dia_final - (self.cumplido_informacion.dia_inicial - 1));

      self.cumplido_informacion.valor_cobro = (self.valor_dia_contrato * self.dias_laborados);

      console.log(self.dias_laborados);
      console.log(self.cumplido_informacion.valor_cobro);
      console.log(self.cumplido_informacion.dia_inicial);
      console.log(self.cumplido_informacion.dia_final);
      console.log(self.valor_contrato_int);
      console.log(self.valor_tiempo_dias_int);
      console.log(self.valor_dia_contrato);

    }









  });
