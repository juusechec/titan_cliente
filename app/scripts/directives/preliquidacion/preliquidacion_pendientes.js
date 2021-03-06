'use strict';

/**
 * @ngdoc directive
 * @name TitanClienteApp.directive:verRp
 * @description
 * # verRp
 */
angular.module('titanClienteV2App')
  .directive('preliquidacionPendientes', function(titanMidRequest) {
    return {
      restrict: 'E',
      scope: {
        preliquidacion: '=?',
      },
      templateUrl: 'views/directives/preliquidacion/preliquidacion_pendientes.html',

      controller: function($scope, $translate,$location,$route) {
        var self = this;

        //* --- Definición de grid para HCH y HCS --- *//
      if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCH" || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCS") {

        $scope.gridOptions = {
            paginationPageSizes: [20, 40,60],
            paginationPageSize: 40,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
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
                  cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.d_preliquidacionPendientes.preliquidar_persona(row)" >{{row.entity.num_documento}}</button>',
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
        $scope.gridOptions = {
           paginationPageSizes: [20, 40,60],
           paginationPageSize: 40,
           enableRowSelection: true,
           enableSelectAll: true,
           selectionRowHeaderWidth: 35,
           rowHeight: 35,
           showGridFooter:true,
           enableHighlighting:false,
           isRowSelectable: function(row) {
             if(row.entity.EstadoDisponibilidad === 1) return true;
             return false;
           },
           enableFullRowSelection: false,
           columnDefs: [
                 { field: 'IdPersona', visible: false },
                 { field: 'NumeroContrato',
                   cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.d_preliquidacionPendientes.preliquidar_persona(row)" >{{row.entity.NumeroContrato}}</button>',
                   displayName: $translate.instant('NUM_CONTRATO'),
                   width: '10%',
                   cellClass: 'text-center',
                   headerCellClass: "encabezado"
                  },
                 {
                   field: 'VigenciaContrato',
                   displayName: $translate.instant('VIGENCIA'),
                   width: '10%',
                   cellClass: 'text-center',
                   headerCellClass: "encabezado"
                 },
                 {
                   field: 'NombreCompleto',
                   displayName: $translate.instant('NOMBRE_PERSONA'),
                   width: '20%',
                   cellClass: 'text-center',
                   headerCellClass: "encabezado"
                 },
                 {
                   field: 'NumDocumento',
                   displayName: $translate.instant('DOCUMENTO'),
                   width: '10%',
                   cellClass: 'text-center',
                   headerCellClass: "encabezado",
                 },
                 {
                   field: 'EstadoDisponibilidad',
                   visible:true,
                   width: '13%',
                   cellFilter: "filtro_estado_disp:row.entity",
                   cellClass: 'text-center',
                   headerCellClass: "encabezado"
                 },
                 { field: 'IdEPS', visible: false },
                 { field: 'IdARL', visible: false },
                 { field: 'IdFondoPension', visible: false },
                 {
                    field: 'FechaInicio',
                    visible:true,
                    width: '12%',
                    cellClass: 'text-center',
                    cellTemplate: '<span>{{row.entity.FechaInicio | date:"yyyy-MM-dd"}}</span>',
                    headerCellClass: "encabezado"
                  },
                  {
                    field: 'FechaFin',
                    visible:true,
                    width: '12%',
                    cellClass: 'text-center',
                    cellTemplate: '<span>{{row.entity.FechaFin | date:"yyyy-MM-dd"}}</span>',
                    headerCellClass: "encabezado"
                  },
                  {
                    field: 'ValorContrato',
                    visible:true,
                    width: '11%',
                    cellFilter: 'currency',
                    cellClass: 'text-center',
                    headerCellClass: "encabezado"
                  }
             ],
             onRegisterApi: function(gridApi) {
               $scope.myGridApi = gridApi;

           },
         };

      }

      titanMidRequest.post('preliquidacion/personas_x_preliquidacion', $scope.preliquidacion).then(function(response) {
          $scope.gridOptions.data = response.data;
          console.log("datos personas para preliq", response.data)
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

          var persona = {
              id_proveedor: parseInt(row.entity.IdPersona),
              num_documento: parseInt(row.entity.NumDocumento),
              numero_contrato: row.entity.NumeroContrato,
              vigencia: parseInt(row.entity.VigenciaContrato),
              fecha_inicio:row.entity.FechaInicio,
              fecha_fin:row.entity.FechaFin,
              valor_contrato:row.entity.ValorContrato,
              Pendiente: "false",

          };
          $scope.persona = persona;
          $('#modal_detalle').modal('show');
        };

        $('#modal_detalle').on('hidden.bs.modal', function (e) {
          $scope.persona = undefined
        })

        self.generar_preliquidacion = function() {
            var i;
            var personas = $scope.myGridApi.selection.getSelectedRows();
           $scope.preliquidacion.Definitiva = true;
           console.log("preliquidacion", $scope.preliquidacion)
              console.log("personas", $scope.personas)
            var personas_a_liquidar = [];

              if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCH" || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCS"  || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "CT") {


                for (i = 0; i < personas.length; i++) {
                    var persona = {
                        IdPersona: parseInt(personas[i].IdPersona),
                        NumDocumento: parseInt(personas[i].NumDocumento),
                        NumeroContrato: personas[i].NumeroContrato,
                        VigenciaContrato: parseInt(personas[i].VigenciaContrato),
                        Pendiente: "true",
                        Preliquidacion: $scope.preliquidacion.Id
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
                    Pendiente: "true",
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
      controllerAs: 'd_preliquidacionPendientes'
    };
  }).filter('filtro_estado_disp', function($filter) {
      return function(input, entity) {
          var output;
          if (undefined === input || null === input) {
              return "";
          }

          if (entity.EstadoDisponibilidad === 1) {
              output = "Pendiente de pago";
          }

          if (entity.EstadoDisponibilidad === 2) {
              output = "Listo para pago";
          }

          if (entity.EstadoDisponibilidad === 3) {
              output = "Pagado";
          }



          return output;
      };
  });
