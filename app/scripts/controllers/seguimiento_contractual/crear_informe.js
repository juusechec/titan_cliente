'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CrearInformeCtrl
 * @description
 * # CrearInformeCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('CrearInformeCtrl', function ($http, uiGridConstants, $translate,contratoRequest) {

      //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
      var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

      //Se utiliza la variable self estandarizada
      var self = this;

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
            cellTemplate: '<button title="{{\'EDITAR\'| translate }}" type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.consultarDependencia.abrir_modal_editar(row)" data-toggle="modal" data-target="#editarDependencia">' +
            '<i class="glyphicon glyphicon-pencil"></i></button>&nbsp;' + '<button title="{{\'ELIMINAR\'| translate }}" type="button" class="btn btn-primary btn-circle"' +
            'ng-click="grid.appScope.consultarDependencia.vincular_espacios(row)" data-toggle="modal" data-target="#vincularEspacios"><i class="glyphicon glyphicon-eye-open"></i></button>'
          }
        ]
      };


      /*
        Función que obtiene el número de contrato y la vigencia de acuerdo al número de identidad
      */
      self.obtener_informacion_informe = function() {
        //Petición para obtener el número del contrato y la vigencia de los contratos en ejecución de la persona del identificador de la cedula
        contratoRequest.get('contratos_persona', self.Documento).then(function (response) {
          //Variable que contiene la información de la respuesta de la petición
          self.respuesta_contratos_persona = response.data;
          //Variable que contiene la información de contrato en ejecución persona
          self.informe = self.respuesta_contratos_persona.contratos_personas.contrato_persona[0];

          console.log(self.informe);

          //Consumo de servicio para obtener la información del contratista
          contratoRequest.get('informacion_contrato_contratista', self.informe.numero_contrato + '/' + self.informe.vigencia)
          .then(function (response) {

                //Variable que contiene la respuesta del servicio contrato
                self.respuesta_informe_informacion = response.data;

                console.log(self.respuesta_informe_informacion);

                //Variable que contiene la informacion del informe_informacion
                self.informe_informacion = self.respuesta_informe_informacion.informacion_contratista;

                console.log(self.informe_informacion);
            });

            self.obtener_actividades_contratista();
        });
      };

      /*
      Función para obtener las actividades del contratista
      */
      self.obtener_actividades_contratista = function(){
        //Consumo de servicio para obtener la información del contratista
        contratoRequest.get('contrato', self.informe.numero_contrato + '/' + self.informe.vigencia)
        .then(function (response) {

              //Variable que contiene la respuesta del servicio contrato
              self.respuesta_actividades = response.data;

              console.log(self.respuesta_informe_informacion);

              //Variable que contiene la informacion del informe_informacion
              self.informe_actividades = self.respuesta_actividades.contrato;

              console.log(self.informe_actividades.actividades);

          });
      };

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
