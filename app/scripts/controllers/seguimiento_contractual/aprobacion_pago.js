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


  });
