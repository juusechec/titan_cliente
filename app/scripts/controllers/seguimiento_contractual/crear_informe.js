'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CrearInformeCtrl
 * @description
 * # CrearInformeCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('CrearInformeCtrl', function (oikosRequest, $http, uiGridConstants, $translate) {

      //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
      var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

      //Se utiliza la variable self estandarizada
      var self = this;

      /*
        Función que obtiene el número de contrato y la vigencia de acuerdo al número de identidad
      */
      self.obtener_informacion_informe = function() {
        //Petición para obtener el número del contrato y la vigencia de los contratos en ejecución de la persona del identificador de la cedula
        $http.get('http://jbpm.udistritaloas.edu.co:8280/services/contratoSuscritoProxyService/contratos_persona/' + self.Documento + '', {
          headers: {
            'Accept': 'application/json'
          }
        }).then(function(response) {
          //Variable que contiene la información de la respuesta de la petición
          self.respuesta_contratos_persona = response.data;
          //Variable que contiene la información de contrato en ejecución persona
          self.informe = self.respuesta_contratos_persona.contratos_personas.contrato_persona[0];

          console.log(self.informe);

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

            //Consumo de servicio para obtener la información del contrato como objero y actividades
            $http.get('http://jbpm.udistritaloas.edu.co:8280/services/contratoSuscritoProxyService/contrato/' + self.cumplido.numero_contrato + '/' + self.cumplido.vigencia + '', {
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

            console.log(self.cumplido_informacion);
          });
        });
      };



      //Función que obtiene todas las dependencias
      oikosRequest.get('dependencia', $.param({
          limit: -1
        }))
        .then(function(response) {
          self.dependencias = response.data;
          console.log(self.dependencias);
        });

        //Variable que contiene la información del cumplido y el informe
        /*self.service = $http.get("http//jbpm.udistritaloas.edu.co:8280/services/contrato_suscrito_DataService.HTTPEndpoint/contrato/967/2017");
        console.log(self.service);*/

        //$http.getElementsByClassName('className')

      /*self.Actividades = {
          "Nombre": "Actividad 1",
          "Metas": "Prueba",
          "Indicador": "Indicador de cumplimiento",
          "Nivel": "100",
          "Observaciones": "Esto es una prueba"
        };*/


      //Creación tabla
      self.gridOptions1 = {
        enableSorting: true,
        enableFiltering: true,
        resizable: true,
        columnDefs: [
          {
            field: 'Nombre',
            cellTemplate: tmpl,
            displayName: $translate.instant('ACTI_REALI'),
            sort: {
              direction: uiGridConstants.ASC,
              priority: 1
            }
          },
          {
            field: 'Metas',
            cellTemplate: tmpl,
            displayName: $translate.instant('METAS')
          },
          {
            field: 'Indicador',
            cellTemplate: tmpl,
            displayName: $translate.instant('INDI_DE_CUMP')
          },
          {
            field: 'Nivel',
            cellTemplate: tmpl,
            displayName: $translate.instant('METAS')
          },
          {
            field: 'Observaciones',
            cellTemplate: tmpl,
            displayName: $translate.instant('OBSERVACIONES')
          },
          {
            field: 'Acciones',
            displayName: $translate.instant('ACC'),
            cellTemplate: '<button title="Editar" type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.consultarDependencia.abrir_modal_editar(row)" data-toggle="modal" data-target="#editarDependencia">' +
            '<i class="glyphicon glyphicon-pencil"></i></button>&nbsp;' + '<button title="Eliminar registro" type="button" class="btn btn-primary btn-circle"' +
            'ng-click="grid.appScope.consultarDependencia.vincular_espacios(row)" data-toggle="modal" data-target="#vincularEspacios"><i class="glyphicon glyphicon-eye-open"></i></button>'
          }
        ]
      };


      //self.gridOptions1.data = self.Actividades;

      self.addData = function() {
        var n = self.gridOptions1.data.length + 1;
        self.gridOptions1.data.push({
                    "firstName": "New " + n,
                    "lastName": "Person " + n,
                    "company": "abc",
                    "employed": true,
                    "gender": "male"
                  });
      };

          //self.gridOptions1.data = self.Actividades;
  });
