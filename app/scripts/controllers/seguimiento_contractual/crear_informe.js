'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CrearInformeCtrl
 * @description
 * # CrearInformeCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('CrearInformeCtrl', function (oikosRequest, $http, uiGridConstants) {

      //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
      var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

      //Se utiliza la variable self estandarizada
      var self = this;

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
            displayName: 'Actividades realizadas',
            sort: {
              direction: uiGridConstants.ASC,
              priority: 1
            }
          },
          {
            field: 'Metas',
            cellTemplate: tmpl,
            displayName: 'Metas'
          },
          {
            field: 'Indicador',
            cellTemplate: tmpl,
            displayName: 'Indicador de cumplimiento'
          },
          {
            field: 'Nivel',
            cellTemplate: tmpl,
            displayName: 'Nivel de avance'
          },
          {
            field: 'Observaciones',
            cellTemplate: tmpl,
            displayName: 'Observaciones'
          },
          {
            field: 'Acciones',
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
