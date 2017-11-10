'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CargaDocumentosDocenteself
 * @description
 * # CargaDocumentosDocenteself
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('CargaDocumentosDocenteCtrl', function($scope, $http, $translate,uiGridConstants) {
    //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
    var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

        //Se utiliza la variable self estandarizada
        var self = this;
        //Variable que tendrá los contratos del docente
        self.contratos = [];
        self.docente = {};

        /*
        Datos de prueba
        */
        self.docente_contratos =[
          {
            "Nombre":"Pepito Perez",
            "Resolucion":"HCH",
            "Dependencia":"INGENIERIA DE SISTEMAS",
            "Vigencia":"2017",
            "Vinculacion": "123"
          },
          {
            "Nombre":"Pepito Perez",
            "Resolucion":"MTO/TCO",
            "Dependencia":"INGENIERIA ELECTRONICA",
            "Vigencia":"2017",
            "Vinculacion": "123"
          }
        ];

        //Datos estaticos del docente
        //self.docente.Nombre = self.docente_contratos[0].Nombre;


        /*
          Creación tabla que tendrá todos los contratos relacionados al docente
        */
        self.gridOptions1 = {
          enableSorting: true,
          enableFiltering: true,
          resizable: true,
          rowHeight: 40,
          columnDefs: [
            {
              field: 'Resolucion',
              cellTemplate: tmpl,
              displayName: $translate.instant('RESOLUCION'),
              sort: {
                direction: uiGridConstants.ASC,
                priority: 1
              },
            },
            {
              field: 'Vigencia',
              cellTemplate: tmpl,
              displayName: $translate.instant('VIGENCIA'),
              sort: {
                direction: uiGridConstants.ASC,
                priority: 1
              },
              width: "20%"
            },
            {
              field: 'Vinculacion',
              cellTemplate: tmpl,
              displayName: $translate.instant('NUM_VINC'),
              sort: {
                direction: uiGridConstants.ASC,
                priority: 1
              },
              width: "23%"
            }
            ,
            {
              field: 'Dependencia',
              cellTemplate: tmpl,
              displayName: $translate.instant('PRO_CURR'),
              sort: {
                direction: uiGridConstants.ASC,
                priority: 1
              },
            }
            ,
            {
              field: 'Acciones',
              displayName: $translate.instant('ACC'),
              cellTemplate: ' <a type="button" title="Aprobar pago" type="button" class="fa fa-check fa-lg  faa-shake animated-hover" ng-if="!row.entity.validacion" ng-click="grid.appScope.aprobacionDocumentos.validarCumplido(row.entity)">' +
              '</a>&nbsp;' + '<a type="button" title="Rechazar pago" type="button" class="fa fa-close fa-lg  faa-shake animated-hover"' +
              'ng-if="row.entity.validacion" ng-click="grid.appScope.aprobacionDocumentos.invalidarCumplido(row.entity)"></a>' +
              '<a type="button" title="Ver información" type="button" class="fa fa-eye fa-lg  faa-shake animated-hover"' +
              'ng-click="grid.appScope.aprobacionDocumentos.verInformacionContrato(row.entity)" data-toggle="modal" data-target="#modal_informacion_contrato"></a>',
              width: "10%"
            }
          ]
        };



        self.gridOptions1.onRegisterApi = function (gridApi) {
          self.gridApi = gridApi;
        };

      //self.gridOptions1.data = self.docente_contratos;

        /*
          Función que recibe un objeto que posee un arreglo con información de los contratos que tiene el docente.
          Eśta función extrae el arreglo y los procesa para adicionar un atributo de validación.
        */
        self.procesar_contratos = function (docente) {
            for (var i = 0; i < docente.length; i++) {
              self.contratos[i] = {
                Num_vinculacion: docente[i].contratos.Vinculacion,
                Nombre: docente[i].contratos.Nombre,
                Vigencia: docente[i].contratos.Vigencia,
                Dependencia: docente[i].contratos.Dependencia,
                Resolucion: docente[i].contratos.Resolucion,
                validacion: false
              }
            }
          }

        /*
          Función para consultar los datos del docente y los contratos asociados a este
        */
        self.obtener_informacion_supervisor = function () {
          //Petición para obtener la información del docente
          self.gridOptions1.data = [];
          self.contratos = [];
          try {
            contratoRequest.get('contratos_docente', self.Documento).then(function (response) {

              self.respuesta_docente = response.data;

              console.log(self.respuesta_docente);

              console.log(response.status);


              //Procesamiento
              /*
              self.procesar_contratistas(self.respuesta_docente.supervisores.supervisor_contratista);
              console.log(self.contratistas);


              self.supervisor = self.respuesta_docente.supervisores.supervisor_contratista[0].supervisor;

              self.gridOptions1.data = self.contratistas;*/


            });

          } catch (error) {


          }

          self.gridApi.core.refresh();
        };

    /*
      Función para cargar los documentos a la carpeta apache destino
    */
    self.fd = new FormData();
    self.fd.append('file', $scope.fileModel);
    self.fd.append('file_name', 'ejemplo.pdf');
    self.subir_documento = function() {
      console.log(self.fd);
      $http.post("http://localhost:8082/upload", self.fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        })
        .then(function(response) {
          console.log("done");
          console.log(response);
        });
      swal(
        'Registro Existoso',
        'El registro del documento ',
        'success'
      );
    };
  });
