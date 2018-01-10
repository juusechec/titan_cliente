'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:AprobacionCoordinadorCtrl
 * @description
 * # AprobacionCoordinadorCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('AprobacionCoordinadorCtrl', function (oikosRequest, $http, uiGridConstants, contratoRequest, $translate, administrativaCrudService, administrativaAmazonService) {
    //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
    var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

    //Se utiliza la variable self estandarizada
    var self = this;
    self.contratistas = [];

    /*
      Creación tabla que tendrá todos los contratistas relacionados al supervisor
    */
    self.gridOptions1 = {
      enableSorting: true,
      enableFiltering: true,
      resizable: true,
      rowHeight: 40,
      columnDefs: [
        {
          field: 'Persona',
          cellTemplate: tmpl,
          displayName: $translate.instant('DOCUMENTO'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
          width: "15%"
        },
        {
          field: 'nombre',
          cellTemplate: tmpl,
          displayName: $translate.instant('NAME_TEACHER'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },

        {
          field: 'num_vinculacion',
          cellTemplate: tmpl,
          displayName: $translate.instant('DEPENDENCIA'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },
        {
          field: 'Mes',
          cellTemplate: tmpl,
          displayName: $translate.instant('MES'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },
        {
          field: 'Ano',
          cellTemplate: tmpl,
          displayName: $translate.instant('ANO'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },
        {
          field: 'Acciones',
          displayName: $translate.instant('ACC'),
          cellTemplate: '<a type="button" title="Ver soportes" type="button" class="fa fa-eye fa-lg  faa-shake animated-hover"' +
          'ng-click="grid.appScope.aprobacionDocumentos.verInformacionContrato(row.entity)" data-toggle="modal" data-target="#modal_visualizar_documentos"></a>',
          width: "10%"
        }
      ]
    };



    self.gridOptions1.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };


    //Petición para obtener el Id de la relación de acuerdo a los campos
    administrativaCrudService.get('pago_mensual', $.param({
      limit: 0,
      query:'Responsable:prueba'
    })).then(function(response) {
      console.log(response.data);
      self.gridOptions1.data = response.data


    });


  });
