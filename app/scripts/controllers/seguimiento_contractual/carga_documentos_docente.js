'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CargaDocumentosDocenteself
 * @description
 * # CargaDocumentosDocenteself
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('CargaDocumentosDocenteCtrl', function($scope, $http, $translate,uiGridConstants, contratoRequest) {
    //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
    var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

        //Se utiliza la variable self estandarizada
        var self = this;


        self.meses = [
        {Id:1, Nombre:"Enero"},
        {Id:2, Nombre:"Febrero"},
        {Id:3, Nombre:"Marzo"},
        {Id:4, Nombre:"Abril"},
        {Id:5, Nombre:"Mayo"},
        {Id:6, Nombre:"Junio"},
        {Id:7, Nombre:"Julio"},
        {Id:8, Nombre:"Agosto"},
        {Id:9, Nombre:"Septiembre"},
        {Id:10, Nombre:"Octubre"},
        {Id:11, Nombre:"Noviembre"},
        {Id:12, Nombre:"Diciembre"}]
        /*
          Creación tabla que tendrá todos los contratos relacionados al docente
        */
        self.gridOptions1 = {
          enableSorting: true,
          enableFiltering: true,
          resizable: true,
          columnDefs: [
            {
              field: 'Resolucion',
              cellTemplate: tmpl,
              displayName: $translate.instant('RESOLUCION'),
              sort: {
                direction: uiGridConstants.ASC,
                priority: 1
              },
              width: "20%"
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
              field: 'Num_vinculacion',
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
              cellTemplate: ' <a type="button" title="Cargar listas" type="button" class="fa fa-upload fa-lg  faa-shake animated-hover" ng-if="!row.entity.validacion"  data-toggle="modal" data-target="#modal_carga_listas_docente">' +
              '</a>&nbsp;' + '<a type="button" title="Informe de gestión docente" type="button" class="fa fa-eye fa-lg  faa-shake animated-hover"' +
              'ng-if="row.entity.Resolucion == \'TCO\' || row.entity.Resolucion ==\'MTO\'" ng-click="grid.appScope.aprobacionDocumentos.invalidarCumplido(row.entity)" data-toggle="modal" data-target="#modal_informe_gestion_docente"></a>'+
              '</a>&nbsp;' + '<a type="button" title="Solicitar pago" type="button" class="fa fa-money fa-lg  faa-shake animated-hover" ng-click="grid.appScope.cargaDocumentosDocente.solicitar_pago(row.entity)"   data-toggle="modal" data-target="#modal_enviar_solicitud" >' ,

              width: "10%"
            }
          ]
        };



        self.gridOptions1.onRegisterApi = function (gridApi) {
          self.gridApi = gridApi;
        };

        /*
          Función que recibe un objeto que posee un arreglo con información de los contratos que tiene el docente.
          Eśta función extrae el arreglo y los procesa para adicionar un atributo de validación.
        */
        self.procesar_contratos = function (contratos_docente) {

            for (var i = 0; i < contratos_docente.length; i++) {
              self.contratos[i] = {
                Num_vinculacion: contratos_docente[i].numero_vinculacion,
                Nombre: contratos_docente[i].nombre_docente,
                Vigencia: contratos_docente[i].vigencia,
                Dependencia: contratos_docente[i].dependencia,
                Resolucion: contratos_docente[i].dedicacion,
                validacion: false
              }
            }
          };

        /*
          Función para consultar los datos del docente y los contratos asociados a este
        */
        self.obtener_informacion_docente = function () {
          //Petición para obtener la información del docente
          self.gridOptions1.data = [];
          self.contratos = [];
          try {
            contratoRequest.get('contratos_docente', self.Documento).then(function (response) {

              //Contiene la respuesta de la petición
              self.respuesta_docente = response.data;

              //Procesamiento de datos para grid
              self.procesar_contratos(self.respuesta_docente.contratos_docentes.contratos_docente);
              console.log(self.contratos);

              //Variable que contiene el nombre del docente
              self.nombre_docente = self.contratos[0].Nombre;

              //Carga la información en la tabla
              self.gridOptions1.data = self.contratos;

            });

          } catch (error) {


          }

          self.gridApi.core.refresh();
        };

        self.solicitar_pago = function(contrato){
          console.log(contrato);
          self.contrato = contrato;

        }


        self.enviar_solicitud = function (){
         
          if(self.mes !== undefined){
          var pago_mensual = {
            CargoResponsable: "Prueba",
            Estado: 1,
            FechaModificacion: new Date(),
            Mes: self.mes,
            NumeroContrato: self.contrato.Num_vinculacion,
            Persona: parseInt(self.Documento),
            Responsable: "prueba",
            VigenciaContrato: parseInt(self.contrato.Vigencia)
          };

          $http.post("http://10.20.2.159:8080/v1/pago_mensual/", pago_mensual);

          console.log(pago_mensual);
          self.contrato = {};
        }else{
         swal(
          'Error',
          'Debe seleccionar un mes',
          'error'
         );
        }

        };

        /*
          Función para visualizar modal con los items preestablecidos para los docentes de TCO/MTO
        */
        self.obtenerInformeDocente = function(){
        //Objeto que se obtiene el contenido del informe
        var contenido = {
              horas_lectivas: self.horas_lectivas,
              investigacion: self.investigacion,
              extension: self.extension,
              publicaciones: self.publicaciones,
              actividades: self.actividades
          };

          console.log(contenido);


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
