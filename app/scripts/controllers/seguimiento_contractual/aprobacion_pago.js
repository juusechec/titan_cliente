'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:AprobacionPagoCtrl
 * @description
 * # AprobacionPagoCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('AprobacionPagoCtrl', function (oikosRequest, $http, uiGridConstants, contratoRequest, $translate,administrativaCrudService) {


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
        }
        ,
        {
          field: 'Acciones',
          displayName: $translate.instant('ACC'),
          cellTemplate: ' <button title="Aprobar pago" type="button" class="btn btn-success btn-circle" ng-if="!row.entity.validacion" ng-click="grid.appScope.aprobacionPago.validarCumplido(row.entity)" data-toggle="modal" data-target="#editarDependencia">' +
            '<i class="glyphicon glyphicon-ok"></i></button>&nbsp;' + '<button title="Rechazar pago" type="button" class="btn btn-danger btn-circle"' +
            'ng-if="row.entity.validacion" ng-click="grid.appScope.aprobacionPago.invalidarCumplido(row.entity)" data-toggle="modal" data-target="#vincularEspacios"><i class="glyphicon glyphicon-remove"></i></button>',
          width: "10%"
        }
      ]
    };



    self.gridOptions1.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };



    /*
      Función que recibe un objeto que posee un arreglo con información de los contratistas y su supervisor.
      Eśta función extrae el arreglo y los procesa para adicionar un atributo de validación.
    */

    self.procesar_contratistas = function (supervisor_contratistas) {

      for (var i = 0; i < supervisor_contratistas.length; i++) {
        self.contratistas[i] = {
          num_documento: supervisor_contratistas[i].contratista.documento,
          nombre: supervisor_contratistas[i].contratista.nombre,
          dependencia: supervisor_contratistas[i].supervisor.dependencia,
          cargo_supervision: supervisor_contratistas[i].supervisor.cargo,
          validacion: false
        }
      }
    }

    /*
      Función para consultar los datos del supervisor del contrato y los contratistas asociados a este
    */



    self.obtener_informacion_ordenador = function () {
      //Petición para obtener la información del supervisor del contrato
      self.gridOptions1.data = [];
      self.contratistas = [];

      contratoRequest.get('ordenador', self.Documento).then(function (response) {

        self.ordenador = response.data;

        //Petición para obtener el Id de la relación de acuerdo a los campos
        administrativaCrudService.get('pago_mensual', $.param({
          limit: 0,
          query: 'Responsable:' + self.Documento + ',EstadoPagoMensual.CodigoAbreviacion:AD'
        })).then(function (response) {
          self.documentos = response.data;
          //self.obtener_informacion_docente();
          angular.forEach(self.documentos, function (value) {
            console.log(value);
            contratoRequest.get('informacion_contrato_elaborado_contratista', value.NumeroContrato + '/' + value.VigenciaContrato).
              then(function (response) {
                value.Nombre = response.data.informacion_contratista.nombre_completo;
              });
          });
          self.gridOptions1.data = self.documentos;
        });


      });

      /*          try {
                contratoRequest.get('supervisor_contratistas',self.Documento).then(function(response) {
      
                  self.respuesta_supervisor_contratistas = response.data;
      
                  console.log(response.status);
      
      
      
                   self.procesar_contratistas(self.respuesta_supervisor_contratistas.supervisores.supervisor_contratista);
                   console.log(self.contratistas);
      
      
                  self.supervisor = self.respuesta_supervisor_contratistas.supervisores.supervisor_contratista[0].supervisor;
      
                  self.gridOptions1.data = self.contratistas;
      
      
                });
      
                     } catch (error) {
      
      
                      }
      */

      self.gridApi.core.refresh();
    };


    self.validarCumplido = function (contratista) {
      swal({
        title: '¿Está seguro(a)?',
        text: "Podrá revertir la validación",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Validar'
      }).then(function () {
        contratista.validacion = true;
        self.gridApi.core.refresh();

      });
    };

    self.invalidarCumplido = function (contratista) {
      swal({
        title: '¿Está seguro(a) de invalidar el cumplido?',
        text: "Podrá revertir la invalidación",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Invalidar'
      }).then(function () {
        contratista.validacion = false;
        self.gridApi.core.refresh();

      });
    };
  });
