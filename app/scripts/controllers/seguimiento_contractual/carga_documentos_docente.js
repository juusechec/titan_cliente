'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CargaDocumentosDocenteself
 * @description
 * # CargaDocumentosDocenteself
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('CargaDocumentosDocenteCtrl', function($scope, $http, $translate, uiGridConstants, contratoRequest, administrativaCrudService, nuxeo, $q, coreRequest, $window,$sce, administrativaMidService) {
    //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
    var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

    //Se utiliza la variable self estandarizada
    var self = this;

    self.anios = [];

    self.meses = [{
        Id: 1,
        Nombre: "Enero"
      },
      {
        Id: 2,
        Nombre: "Febrero"
      },
      {
        Id: 3,
        Nombre: "Marzo"
      },
      {
        Id: 4,
        Nombre: "Abril"
      },
      {
        Id: 5,
        Nombre: "Mayo"
      },
      {
        Id: 6,
        Nombre: "Junio"
      },
      {
        Id: 7,
        Nombre: "Julio"
      },
      {
        Id: 8,
        Nombre: "Agosto"
      },
      {
        Id: 9,
        Nombre: "Septiembre"
      },
      {
        Id: 10,
        Nombre: "Octubre"
      },
      {
        Id: 11,
        Nombre: "Noviembre"
      },
      {
        Id: 12,
        Nombre: "Diciembre"
      }
    ]
    /*
      Creación tabla que tendrá todos los contratos relacionados al docente
    */
    self.gridOptions1 = {
      enableSorting: true,
      enableFiltering: true,
      resizable: true,
      columnDefs: [{
          field: 'Resolucion',
          cellTemplate: tmpl,
          displayName: $translate.instant('RESOLUCION'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
          width: "10%"
        },
        {
          field: 'Vigencia',
          cellTemplate: tmpl,
          displayName: $translate.instant('VIGENCIA'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
          width: "10%"
        },
        {
          field: 'NumeroVinculacion',
          cellTemplate: tmpl,
          displayName: $translate.instant('NUM_VINC'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
          width: "15%"
        },
        {
          field: 'Dedicacion',
          cellTemplate: tmpl,
          displayName: $translate.instant('DED'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
          width: "10%"
        },
        {
          field: 'Dependencia',
          cellTemplate: tmpl,
          displayName: $translate.instant('PRO_CURR'),
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },
        {
          field: 'IdDependencia',
          visible: false,
          cellTemplate: tmpl,
          displayName: "Id Dependencia",
        },
        {
          field: 'Acciones',
          displayName: $translate.instant('ACC'),
          cellTemplate: '<a type="button" title="{{\'SOLICITAR_PAGO\'| translate }}" type="button" class="fa fa-money fa-lg  faa-shake animated-hover" ng-click="grid.appScope.cargaDocumentosDocente.solicitar_pago(row.entity)"   data-toggle="modal" data-target="#modal_enviar_solicitud" >' +
            '</a>&nbsp;' + ' <a type="button" title="{{\'CARGAR_LISTAS\'| translate }}" type="button" class="fa fa-upload fa-lg  faa-shake animated-hover" ng-click="grid.appScope.cargaDocumentosDocente.cargar_soportes(row.entity)"  data-toggle="modal" data-target="#modal_carga_listas_docente">',
          width: "10%"
        }
      ]
    };



    self.gridOptions1.onRegisterApi = function(gridApi) {
      self.gridApi = gridApi;
    };

    /*
      Creación tabla que tendrá las solicitudes de pago de cada contrato
    */
    self.gridOptions2 = {
      enableSorting: true,
      enableFiltering: true,
      resizable: true,
      enableRowSelection: true,
      columnDefs: [{
          field: 'NumeroContrato',
          cellTemplate: tmpl,
          displayName: $translate.instant('NUM_VINC'),
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
        },
        {
          field: 'Mes',
          cellTemplate: tmpl,
          displayName: 'Mes',
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },
        {
          field: 'Ano',
          cellTemplate: tmpl,
          displayName: 'Año',
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },
        {
          field: 'EstadoPagoMensual.Nombre',
          cellTemplate: tmpl,
          displayName: 'Estado Solicitud',
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          },
        },

         {
            field: 'descripcion_doc',
            cellTemplate: tmpl,
            displayName: 'Soportes',
            sort: {
              direction: uiGridConstants.ASC,
              priority: 1
            },
        },
      ]
    };

    //No permite poder hacer multiples selecciones en la grilla
    self.gridOptions2.multiSelect = false;
    /*
      Función para obtener la data de la fila seleccionada en la grilla
    */
    self.gridOptions2.onRegisterApi = function(gridApi) {
      self.gridApi2 = gridApi;
      self.seleccionados = self.gridApi2.selection.selectedCount;
      self.gridApi2.selection.on.rowSelectionChanged($scope, function(row) {
        //Contiene la info del elemento seleccionado
        self.seleccionado = row.isSelected;
        //Condiciuonal para capturar la información de la fila seleccionado
        if (self.seleccionado) {
          self.fila_seleccionada = row.entity;
          self.obtener_doc();
        }
      });
    };

    /*
      Función para consultar los datos del docente y los contratos asociados a este
    */
    self.obtener_informacion_docente = function() {
      //Petición para obtener la información del docente
      self.gridOptions1.data = [];
      self.contratos = [];
      try {
        administrativaMidService.get('aprobacion_pago/get_contratos_docente', self.Documento).then(function(response) {

          //Contiene la respuesta de la petición
          self.respuesta_docente = response.data;

          console.log(self.respuesta_docente);

          //Variable que contiene el nombre del docente
          self.nombre_docente = self.respuesta_docente[0].NombreDocente;
          console.log(self.nombre_docente);
          console.log(self.respuesta_docente.NombreDocente);

          //Carga la información en la tabla
          self.gridOptions1.data = self.respuesta_docente;

        });

      } catch (error) {


      }

      self.gridApi2.core.refresh();
    };

    /*
    Función que permite realizar una solicitud de pago mensual
    */
    self.solicitar_pago = function(contrato) {
      console.log(contrato);
      self.contrato = contrato;
      self.anios = [parseInt(self.contrato.Vigencia) - 1, parseInt(self.contrato.Vigencia), parseInt(self.contrato.Vigencia) + 1];

    }


    self.cargar_soportes = function(contrato) {
      self.seleccionado = false;
      self.gridOptions2.data = [];
      self.contrato = contrato;
      administrativaCrudService.get("pago_mensual", $.param({
        query: "NumeroContrato:" + self.contrato.NumeroVinculacion + ",VigenciaContrato:" + self.contrato.Vigencia,
        limit: 0
      })).then(function(response) {

        contratoRequest.get('contrato_elaborado', self.contrato.NumeroVinculacion + '/' + self.contrato.Vigencia).then(function(response_ce) {

          self.tipo_contrato = response_ce.data.contrato.tipo_contrato;
          console.log(self.tipo_contrato);

          administrativaCrudService.get("item_informe_tipo_contrato", $.param({
            query: "TipoContrato:" + self.tipo_contrato,
            limit: 0
          })).then(function(response_iitc) {

            self.items = response_iitc.data;

          });

        });

        self.gridOptions2.data = response.data;
        console.log(self.gridOptions2.data);

      });
    };


    self.enviar_solicitud = function () {

      if (self.mes !== undefined && self.anio !== undefined) {
        administrativaCrudService.get("estado_pago_mensual", $.param({
          query: "CodigoAbreviacion:CD",
          limit: 0
        })).then(function (response) {

          var id_estado = response.data[0].Id;
        var pago_mensual = {
          CargoResponsable: "Coordinador " + self.contrato.Dependencia,
          EstadoPagoMensual: { Id: id_estado},
          FechaModificacion: new Date(),
          Mes: self.mes,
          Ano: self.anio,
          NumeroContrato: self.contrato.NumeroVinculacion,
          Persona: self.Documento,
          Responsable: "prueba",
          VigenciaContrato: parseInt(self.contrato.Vigencia)
        };

        administrativaCrudService.get("pago_mensual", $.param({
          query: "NumeroContrato:" + self.contrato.NumeroVinculacion
            + ",VigenciaContrato:" + self.contrato.Vigencia
            + ",Mes:" + self.mes
            + ",Ano:" + self.anio
          ,
          limit: 0
        })).then(function (response) {



          if (response.data == null) {

            administrativaCrudService.post("pago_mensual", pago_mensual).then(function (response) {

              console.log(response.data);
              swal(
                'Solicitud registrada',
                'Por favor cargue los soportes correspondientes',
                'success'
              )

              self.contrato = {};

            });

          } else {

            swal(
              'Error',
              'Ya existe una solicitud de pago para el año y mes dados',
              'error'
            );

          }

        });



        //  console.log(pago_mensual);
      });
      } else {
        swal(
          'Error',
          'Debe seleccionar un mes y un año',
          'error'
        );
      }

};

    /*
      Función para visualizar modal con los items preestablecidos para los docentes de TCO/MTO
    */
    self.obtenerInformeDocente = function() {
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
      Función para cargar los documentos a la carpeta  destino
    */
    self.cargarDocumento = function(nombre, descripcion, documento, callback) {
      var defered = $q.defer();
      var promise = defered.promise;

      nuxeo.operation('Document.Create')
        .params({
          type: 'File',
          name: nombre,
          properties: 'dc:title=' + nombre + ' \ndc:description=' + descripcion
        })
        .input('/default-domain/workspaces/Titán')
        .execute()
        .then(function(doc) {
          var nuxeoBlob = new Nuxeo.Blob({
            content: documento
          });
          nuxeo.batchUpload()
            .upload(nuxeoBlob)
            .then(function(res) {
              return nuxeo.operation('Blob.AttachOnDocument')
                .param('document', doc.uid)
                .input(res.blob)
                .execute();
            })
            .then(function() {
              return nuxeo.repository().fetch(doc.uid, {
                schemas: ['dublincore', 'file']
              });
            })
            .then(function(doc) {
              var url = doc.uid;
              callback(url);
              defered.resolve(url);
            })
            .catch(function(error) {
              throw error;
              defered.reject(error)
            });
        })
        .catch(function(error) {
          throw error;
          defered.reject(error)
        });

      return promise;
    }

    self.subir_documento = function() {

      var nombre_doc = self.contrato.Vigencia + self.contrato.NumeroVinculacion + self.Documento + self.fila_seleccionada.Mes + self.fila_seleccionada.Ano;
      var descripcion = self.item.ItemInforme.Nombre;

      if (self.archivo) {
        var aux = self.cargarDocumento(nombre_doc, descripcion, self.fileModel, function(url) {

          //Objeto documento
          self.objeto_documento = {
            "Nombre": nombre_doc,
            "Descripcion": descripcion,
            "TipoDocumento": {
              "Id": 3
            },
            "Contenido": JSON.stringify({
              "Tipo": "Archivo",
              "IdNuxeo": url,
              "Observaciones": self.observaciones
            }),
            "Activo": true
          };

          console.log(self.objeto_documento);

          //Post a la tabla documento del core
          coreRequest.post('documento', self.objeto_documento)
            .then(function(response) {
              self.id_documento = response.data.Id;

              //Objeto soporte_pago_mensual
              self.objeto_soporte = {
                "PagoMensual": {
                  "Id": self.fila_seleccionada.Id
                },
                "Documento": self.id_documento,
                "ItemInformeTipoContrato": {
                  "Id": self.item.Id
                },
                "Aprobado": false
              };

              //Post a la tabla soporte documento
              administrativaCrudService.post('soporte_pago_mensual', self.objeto_soporte)
                .then(function(response) {
                  //Bandera de validacion
                  console.log("Se ha registrado el documento en el soporte mensual");
                });
            });


        });

      } else if (self.link) {


        //Objeto documento
        self.objeto_documento = {
          "Nombre": nombre_doc,
          "Descripcion": descripcion,
          "TipoDocumento": {
            "Id": 3
          },
          "Contenido": JSON.stringify({
            "Tipo": "Enlace",
            "Enlace": self.enlace,
            "Observaciones": self.observaciones
          }),
          "Activo": true
        };

        console.log(self.objeto_documento);

        //Post a la tabla documento del core
        coreRequest.post('documento', self.objeto_documento)
          .then(function(response) {
            self.id_documento = response.data.Id;

            //Objeto soporte_pago_mensual
            self.objeto_soporte = {
              "PagoMensual": {
                "Id": self.fila_seleccionada.Id
              },
              "Documento": self.id_documento,
              "ItemInformeTipoContrato": {
                "Id": self.item.Id
              },
              "Aprobado": false
            };

            //Post a la tabla soporte documento
            administrativaCrudService.post('soporte_pago_mensual', self.objeto_soporte)
              .then(function(response) {
                //Bandera de validacion
                console.log("Se ha registrado el documento en el soporte mensual");
              });
          });

      }


    };


    self.cambiarCheckArchivo = function() {
      if (self.archivo) {
        self.link = false;
      }
    };

    self.cambiarCheckLink = function() {
      if (self.link) {
        self.archivo = false;
      }
    };

    /*
      Función que permite obtener un documento de nuxeo por el Id
    */
    self.getDocumento = function(docid){
     nuxeo.header('X-NXDocumentProperties', '*');

     self.obtenerDoc = function () {
       var defered = $q.defer();

       nuxeo.request('/id/'+docid)
           .get()
           .then(function(response) {
             self.doc=response;
             var aux=response.get('file:content');
             self.document=response;
             defered.resolve(response);
           })
           .catch(function(error){
               defered.reject(error)
           });
       return defered.promise;
     };

     self.obtenerFetch = function (doc) {
       var defered = $q.defer();

       doc.fetchBlob()
         .then(function(res) {
           defered.resolve(res.blob());

         })
         .catch(function(error){
               defered.reject(error)
           });
       return defered.promise;
     };

       self.obtenerDoc().then(function(){

          self.obtenerFetch(self.document).then(function(r){
              self.blob=r;
              var fileURL = URL.createObjectURL(self.blob);
              console.log(fileURL);
              self.content = $sce.trustAsResourceUrl(fileURL);
              $window.open(fileURL);
           });
       });
     };

     /*
      Función que obtiene los documentos relacionados a las solicitudes
     */
     self.obtener_doc = function (){
       console.log(self.fila_seleccionada);
       var nombre_docs = self.contrato.Vigencia + self.contrato.NumeroVinculacion + self.Documento + self.fila_seleccionada.Mes + self.fila_seleccionada.Ano;
       coreRequest.get('documento', $.param ({
        query: "Nombre:" + nombre_docs,
        limit:0
      })).then(function(response){
        self.documentos = response.data;
        angular.forEach(self.documentos, function(value) {
          self.descripcion_doc = value.Descripcion;
          console.log(self.descripcion_doc);
          var json = value.Contenido;
          var desJson = JSON.parse(json)

          if (desJson.Tipo == "Archivo") {
            self.getDocumento(desJson.IdNuxeo)
          }else{
            console.log("Este es el enlace " + desJson.Enlace);
          }

        });

      })


     }

  });
