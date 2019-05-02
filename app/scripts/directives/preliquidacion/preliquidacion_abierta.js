'use strict';

/**
 * @ngdoc directive
 * @name TitanClienteApp.directive:verRp
 * @description
 * # verRp
 */
angular.module('titanClienteV2App')
  .directive('preliquidacionAbierta', function(titanMidRequest,) {
    return {
      restrict: 'E',
      scope: {
        preliquidacion: '=?',
      },
      templateUrl: 'views/directives/preliquidacion/preliquidacion_abierta.html',

      controller: function($scope, $translate,$location) {
        var self = this;

        //* --- Definición de grid para HCH y HCS --- *//
      if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCH" || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCS") {

        $scope.botones = [
            { clase_color: "ver", clase_css: "fa fa-eye fa-lg  faa-shake animated-hover", titulo: $translate.instant('DETALLE'), operacion: 'ver', estado: true }
        ];

        self.gridOptions = {
            paginationPageSizes: [20, 40,60],
            paginationPageSize: 40,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            columnDefs: [
                {
                  field: 'id_proveedor',
                  visible: false
                },
                {
                  field: 'num_documento',
                  displayName: $translate.instant('DOCUMENTO'),
                  width: '25%',
                  headerCellClass: 'encabezado',
                  cellClass: 'text-center',
                  cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.d_preliquidacionAbierta.preliquidar_persona(row)" >{{row.entity.num_documento}}</button>',
                },
                {
                  field: 'nom_proveedor',
                  displayName: $translate.instant('NOMBRE_PERSONA'),
                  width: '52%',
                  headerCellClass: 'encabezado',
                  cellClass: 'text-center',
                },
                {
                  field: 'Preliquidado',
                  visible:true,
                  displayName: "Preliquidado",
                  width: '10%',
                  headerCellClass: 'encabezado',
                  cellClass: "text-center",
                  sort: {
                     direction: 'desc',
                     priority: 0
                 },
                },
                {
                  field: 'IdEPS',
                  visible: false
                },
                {
                  field: 'IdARL',
                  visible: false
                },
                {
                  field: 'IdFondoPension',
                  visible: false
                },
                {
                  field: 'IdCajaCompensacion',
                  visible: false
                },
                {
                    field: 'Acciones',
                    displayName: $translate.instant('ACCIONES'),
                    width: '10%',
                    headerCellClass: 'encabezado',
                    cellClass: 'text-center',
                    cellTemplate: '<btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones" fila="row"></btn-registro>'
                }
            ],
            onRegisterApi: function(gridApi) {
              $scope.myGridApi = gridApi;
          }
        };


        self.informacion_contratos = {

            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
            enableSelectAll: false,
            columnDefs: [
              { field: 'NumeroContrato', displayName: $translate.instant('NUM_CONTRATO'), width: '50%',  headerCellClass: 'encabezado', cellClass: 'text-center' },
              { field: 'VigenciaContrato', displayName: $translate.instant('VIGENCIA'),width: '25%',  headerCellClass: 'encabezado', cellClass: 'text-center' },
              { field: 'NivelAcademico', displayName: $translate.instant('NIVEL'),width: '28%',  headerCellClass: 'encabezado', cellClass: 'text-center' },
            ],
            onRegisterApi: function(gridApi) {
                self.gridApi = gridApi;
            }
        };


      }

      //* --- Definición de grid para CT --- *//
      if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "CT") {
        self.gridOptions = {
           paginationPageSizes: [20, 40,60],
           paginationPageSize: 40,
           enableFiltering: true,
           enableSorting: true,
           enableRowSelection: true,
           enableSelectAll: true,
           columnDefs: [
                 { field: 'id_proveedor', visible: false },
                 { field: 'numero_contrato',
                   cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.d_preliquidacionAbierta.preliquidar_persona(row)" >{{row.entity.numero_contrato}}</button>',
                   displayName: $translate.instant('NUM_CONTRATO'),
                   width: '15%',
                   cellClass: 'text-center',
                   headerCellClass: "encabezado"
                  },
                 {
                   field: 'vigencia',
                   displayName: $translate.instant('VIGENCIA'),
                   width: '15%',
                   cellClass: 'text-center',
                   headerCellClass: "encabezado"
                 },
                 {
                   field: 'nom_proveedor',
                   displayName: $translate.instant('NOMBRE_PERSONA'),
                   width: '35%',
                   cellClass: 'text-center',
                   headerCellClass: "encabezado"
                 },
                 {
                   field: 'num_documento',
                   displayName: $translate.instant('DOCUMENTO'),
                   width: '18%',
                   cellClass: 'text-center',
                   headerCellClass: "encabezado",
                 },
                 {
                   field: 'Preliquidado',
                   visible:true,
                   width: '14%',
                   cellClass: 'text-center',
                   headerCellClass: "encabezado"
                 },
                 { field: 'IdEPS', visible: false },
                 { field: 'IdARL', visible: false },
                 { field: 'IdFondoPension', visible: false },
                 { field: 'IdCajaCompensacion', visible: false },
             ],
             onRegisterApi: function(gridApi) {
               $scope.myGridApi = gridApi;
           }
         };

      }

        titanMidRequest.post('gestion_personas_a_liquidar/listar_personas_a_preliquidar_argo', $scope.preliquidacion).then(function(response) {
            self.gridOptions.data = response.data;

        });

        $scope.loadrow = function(row, operacion) {
            self.operacion = operacion;
            switch (operacion) {
                case "otro":
                    break;
                case "ver":
                    self.listar_contratos_por_persona(row);
                    self.persona_seleccionada = row.entity.nom_proveedor;
                    break;
                default:
            }
        };

        self.listar_contratos_por_persona = function(row) {

          var personas_a_listar = [];
          var persona = {
              NumDocumento: parseInt(row.entity.num_documento),
          };

          personas_a_listar.push(persona)

          var datos_preliquidacion = {
            Preliquidacion: $scope.preliquidacion,
            PersonasPreLiquidacion: personas_a_listar
          }

          titanMidRequest.post('gestion_contratos/listar_contratos_agrupados_por_persona', datos_preliquidacion).then(function(response) {

          self.informacion_contratos.data = [];

              angular.forEach(response.data.Contratos, function(value, key){
                      self.informacion_contratos.data.push(value)
                 });

          });

        };

        self.preliquidar_persona = function(row) {
          $scope.persona = row.entity;
          $('#modal_detalle').modal('show');
        };

        $('#modal_detalle').on('hidden.bs.modal', function (e) {
          $scope.persona = undefined
        })

        self.generar_preliquidacion = function() {
            var i;
            var personas = $scope.myGridApi.selection.getSelectedRows();
           $scope.preliquidacion.Definitiva = true;

            var personas_a_liquidar = [];

              if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCH" || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCS"  || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "CT") {


                for (i = 0; i < personas.length; i++) {
                    var persona = {
                        IdPersona: parseInt(personas[i].id_proveedor),
                        NumDocumento: parseInt(personas[i].num_documento),
                        NumeroContrato: personas[i].numero_contrato,
                        VigenciaContrato: parseInt(personas[i].vigencia),
                        Pendiente: "false",
                    };

                    personas_a_liquidar.push(persona)
                }

              }

        if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "FP") {
            for (i = 0; i < personas.length; i++) {
                var persona = {
                    IdPersona: parseInt(personas[i].Id),
                    NumDocumento: parseInt(personas[i].NumDocumento),
                    NumeroContrato: personas[i].NumeroContrato,
                    VigenciaContrato: parseInt(personas[i].VigenciaContrato),
                    Pendiente: "false",
                };

                personas_a_liquidar.push(persona)
            }

          }

          var datos_preliquidacion = {
                Preliquidacion: $scope.preliquidacion,
                PersonasPreLiquidacion: personas_a_liquidar

            };

            titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

                $location.path('/preliquidacion/preliquidacion_personas');
                $route.reload()

            });

        };


      },
      controllerAs: 'd_preliquidacionAbierta'
    };
  });
