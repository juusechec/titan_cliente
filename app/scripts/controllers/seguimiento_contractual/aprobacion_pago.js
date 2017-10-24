'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:AprobacionPagoCtrl
 * @description
 * # AprobacionPagoCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('AprobacionPagoCtrl', function (oikosRequest, $http, uiGridConstants, contratoRequest) {


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
      rowHeight:40,
      columnDefs: [
        {
          field: 'nombre',
          cellTemplate: tmpl,
          displayName: 'Nombre contratista',
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },
        {
          field: 'num_documento',
          cellTemplate: tmpl,
          displayName: 'Documento',
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
          width: "15%"
        }
        ,
        {
          field: 'dependencia',
          cellTemplate: tmpl,
          displayName: 'Dependencia',
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        }
        ,
        {
          field: 'cargo_supervision',
          cellTemplate: tmpl,
          displayName: 'Cargo Supervisión',
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        }
        
        ,
        {
          field: 'Acciones',
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
      Datos de prueba
    */
  /*  self.gridOptions1.data = [
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
    ];*/

    /*
      Función para consultar los datos del supervisor del contrato y los contratistas asociados a este
    */


    /*$http.get('http://jbpm.udistritaloas.edu.co:8280/services/contratoSuscritoProxyService/supervisor_contratistas/' + self.Documento + '', {
      headers: {
        'Accept': 'application/json'
      }
    })*/


    self.procesar_contratistas = function(supervisor_contratistas){

      for(var i = 0; i<supervisor_contratistas.length;i++){
       self.contratistas[i] = {
       num_documento:  supervisor_contratistas[i].contratista.documento,
       nombre : supervisor_contratistas[i].contratista.nombre,
       dependencia :  supervisor_contratistas[i].supervisor.dependencia,
       cargo_supervision : supervisor_contratistas[i].supervisor.cargo,
       validacion : false 
      }
      }
    }

   
    self.obtener_informacion_supervisor = function() {
      //Petición para obtener la información del supervisor del contrato
      self.gridOptions1.data = [];
      self.contratistas = [];
      try {
      contratoRequest.get('supervisor_contratistas',self.Documento).then(function(response) {

        self.respuesta_supervisor_contratistas = response.data;
          
        console.log(response.status);
          
    
        
         self.procesar_contratistas(self.respuesta_supervisor_contratistas.supervisores.supervisor_contratista);
         console.log(self.contratistas);
    
        
        self.supervisor = self.respuesta_supervisor_contratistas.supervisores.supervisor_contratista[0].supervisor;
        
        self.gridOptions1.data = self.contratistas;

       // console.log(self.cumplido);

        //Consumo de servicio para obtener la información del contratista
       /* $http.get('http://jbpm.udistritaloas.edu.co:8280/services/contratoSuscritoProxyService/informacion_contrato_contratista/' + self.cumplido.numero_contrato + '/' + self.cumplido.vigencia + '', {
          headers: {
            'Accept': 'application/json'
          }
        }).then(function(response) {
          //Variable que contiene la respuesta del servicio informacion_contrato_contratista
          self.respuesta_cumplido_informacion = response.data;

          //Variable que contiene la informacion del cumplido_informacion
          self.cumplido_informacion = self.respuesta_cumplido_informacion.informacion_contratista;

          console.log(self.cumplido_informacion);
        });*/

      });

           } catch (error) {
      
      // swal(
      //   'Oops...',
      //   error,
      //   'error'
      // )
      
            }

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
