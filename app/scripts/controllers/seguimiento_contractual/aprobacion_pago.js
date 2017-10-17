'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:AprobacionPagoCtrl
 * @description
 * # AprobacionPagoCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('AprobacionPagoCtrl', function (oikosRequest, $http, uiGridConstants) {


    //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
    var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

    //Se utiliza la variable self estandarizada
    var self = this;

    /*
      Creación tabla que tendrá todos los contratistas relacionados al supervisor
    */
    self.gridOptions1 = {
      enableSorting: true,
      enableFiltering: true,
      resizable: true,
      columnDefs: [
        {
          field: 'Nombre',
          cellTemplate: tmpl,
          displayName: 'Nombre contratista',
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },

        },
        {
          field: 'Acciones',
          cellTemplate: '<button title="Aprobar pago" type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.consultarDependencia.abrir_modal_editar(row)" data-toggle="modal" data-target="#editarDependencia">' +
          '<i class="glyphicon glyphicon-ok"></i></button>&nbsp;' + '<button title="Rechazar pago" type="button" class="btn btn-danger btn-circle"' +
          'ng-click="grid.appScope.consultarDependencia.vincular_espacios(row)" data-toggle="modal" data-target="#vincularEspacios"><i class="glyphicon glyphicon-remove"></i></button>',
          width: "20%"
        }
      ]
    };


    /*
      Datos de prueba
    */
    self.gridOptions1.data = [
      { //Pensionados
        "Id": 1,
        "Nombre": "Juan Perez"
      },
      { //Ingresar beneficiarios
        "Id": 1,
        "Nombre": "Kike Zambrano"
      },
      { //Ingresar sustitutos
            "Id": 1,
            "Nombre": "Eusebio Pele"
      }
    ];

    /*
      Función para consultar los datos del supervisor del contrato y los contratistas asociados a este
    */
    self.obtener_informacion_supervisor = function() {
      //Petición para obtener la información del supervisor del contrato
      $http.get('http://jbpm.udistritaloas.edu.co:8280/services/contratoSuscritoProxyService/supervisor_contratistas/' + self.Documento + '', {
        headers: {
          'Accept': 'application/json'
        }
      }).then(function(response) {
        //Variable que contiene la información de la respuesta de la petición
        self.respuesta_supervisor_contratistas = response.data;

        console.log(self.respuesta_supervisor_contratistas.supervisores.supervisor_contratista[0].supervisor.nombre);

        console.log(self.respuesta_supervisor_contratistas.supervisores.supervisor_contratista[0].supervisor.cargo);

        //Variable que contiene la información de contrato persona
        self.supervisor = self.respuesta_contratos_persona.contratos_personas.contrato_persona[0];

        self.gridOptions1.data = self.respuesta_supervisor_contratistas.supervisores.supervisor_contratista[0]

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


  });
