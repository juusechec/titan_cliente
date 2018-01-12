'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:AprobacionCoordinadorCtrl
 * @description
 * # AprobacionCoordinadorCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('AprobacionCoordinadorCtrl', function(oikosRequest, $http, uiGridConstants, contratoRequest, $translate, administrativaCrudService, administrativaAmazonService, academicaService) {
    //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
    var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

    //Se utiliza la variable self estandarizada
    var self = this;
    self.objeto_docente = [];
    /*
      Creación tabla que tendrá todos los docentes relacionados al coordinador
    */
    self.gridOptions1 = {
      enableSorting: true,
      enableFiltering: true,
      resizable: true,
      rowHeight: 40,
      columnDefs: [{
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
          field: 'Nombre',
          cellTemplate: tmpl,
          displayName: $translate.instant('NAME_TEACHER'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },

        {
          field: 'NumeroContrato',
          cellTemplate: tmpl,
          displayName: $translate.instant('NUM_VIN'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },
        {
          field: 'Mes',
          cellTemplate: tmpl,
          displayName: $translate.instant('MES_SOLICITUD'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },
        {
          field: 'Ano',
          cellTemplate: tmpl,
          displayName: $translate.instant('ANO_SOLICITUD'),
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


    /*
      Función que permite obtener la data de la fila seleccionada
    */
    self.gridOptions1.onRegisterApi = function(gridApi) {
      self.gridApi = gridApi;
    };

    /*
    Función que al recibir el número de documento del coordinador cargue los correspondientes
    */
    self.obtener_docentes_coordinador = function() {

      self.obtener_informacion_coordinador(self.Documento);
      //Petición para obtener el Id de la relación de acuerdo a los campos
      administrativaCrudService.get('pago_mensual', $.param({
        limit: 0,
        query: 'Responsable:' + self.Documento
      })).then(function(response) {
        self.documentos = response.data;
        //self.obtener_informacion_docente();
        angular.forEach(self.documentos, function(value) {
          console.log(value);
          contratoRequest.get('informacion_contrato_elaborado_contratista', value.NumeroContrato + '/' + value.VigenciaContrato).
          then(function(response) {
            value.Nombre = response.data.informacion_contratista.nombre_completo;
          });
        });
        self.gridOptions1.data=self.documentos;
      });
    };


    /*
      Función que obtiene la información correspondiente al coordinador
    */
    self.obtener_informacion_coordinador = function(documento) {
      //Se realiza petición a servicio de academica que retorna la información del coordinador
      academicaService.get('coordinador_carrera_snies', documento).
      then(function(response) {
        self.informacion_coordinador = response.data;
        console.log(self.informacion_coordinador);
        self.coordinador = self.informacion_coordinador.coordinadorCollection.coordinador[0];
        console.log(self.coordinador.nombre_coordinador);
      })
    };

  });
