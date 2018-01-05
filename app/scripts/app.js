'use strict';

/**
 * @ngdoc overview
 * @name titanClienteV2App
 * @description
 * # titanClienteV2App
 *
 * Main module of the application.
 */
angular
  .module('titanClienteV2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'afOAuth2',
    'treeControl',
    'ngMaterial',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.grid.treeView',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.autoResize',
    'ngStorage',
    'ngWebSocket',
    'angularMoment',
    'ui.utils.masks',
    'pascalprecht.translate',
    'titanService',
    'titanMidService',
    'file-model',
    'angularBootstrapFileinput'
  ])
    .run(function(amMoment) {
      amMoment.changeLocale('es');
    })
    .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix("");
      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/notificaciones', {
        templateUrl: 'views/notificaciones.html',
        controller: 'NotificacionesCtrl',
        controllerAs: 'notificaciones'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/nomina/nomina_consulta/:tipo', {
        templateUrl: 'views/nomina/nomina_consulta.html',
        controller: 'NominaNominaConsultaCtrl',
        controllerAs: 'nominaConsulta'
      })
      .when('/conceptos/modulo_conceptos', {
        templateUrl: 'views/conceptos/modulo_conceptos.html',
        controller: 'ConceptoConceptosConsultaCtrl',
        controllerAs: 'conceptosConsulta'
      })
      .when('/preliquidacion/preliquidacion_registro', {
        templateUrl: 'views/preliquidacion/preliquidacion_registro.html',
        controller: 'PreliquidacionPreliquidacionRegistroCtrl',
        controllerAs: 'preliquidacionRegistro'
      })
      .when('/preliquidacion/preliquidacion_personas', {
        templateUrl: 'views/preliquidacion/preliquidacion_personas.html',
        controller: 'PreliquidacionPreliquidacionPersonasCtrl',
        controllerAs: 'preliquidacionPersonas'
      })
      .when('/preliquidacion/preliquidacion_detalle', {
        templateUrl: 'views/preliquidacion/preliquidacion_detalle.html',
        controller: 'PreliquidacionPreliquidacionDetalleCtrl',
        controllerAs: 'preliquidacionDetalle'
      })
      .when('/preliquidacion/resumen_preliquidacion', {
        templateUrl: 'views/preliquidacion/resumen_preliquidacion.html',
        controller: 'PreliquidacionResumenPreliquidacionCtrl',
        controllerAs: 'resumenPreliquidacion'
      })
      .when('/novedades/novedad_registro/:tipo', {
        templateUrl: 'views/novedades/novedad_registro.html',
        controller: 'NovedadesNovedadRegistroCtrl',
        controllerAs: 'novedadRegistro'
      })

      .when('/liquidacion/liquidacion_detalle', {
        templateUrl: 'views/liquidacion/liquidacion_detalle.html',
        controller: 'LiquidacionCtrl',
        controllerAs: 'liquidacion'
      })
      .when('/pensiones/sustituto',{
       templateUrl: 'views/pensiones/sustituto.html',
       controller:'SustitutoCtrl',
       controllerAs: 'sustituto'
     })
      .when('/pensiones/beneficiarios', {
        templateUrl: 'views/pensiones/beneficiarios.html',
        controller: 'BeneficiariosCtrl',
        controllerAs: 'beneficiarios'
      })
      .when('/seguimiento_contractual/crear_informe', {
        templateUrl: 'views/seguimiento_contractual/crear_informe.html',
        controller: 'CrearInformeCtrl',
        controllerAs: 'crearInforme'
      })
      .when('/seguimiento_contractual/crear_cumplido', {
        templateUrl: 'views/seguimiento_contractual/crear_cumplido.html',
        controller: 'CrearCumplidoCtrl',
        controllerAs: 'crearCumplido'
      })
      .when('/seguimiento_contractual/aprobacion_pago', {
        templateUrl: 'views/seguimiento_contractual/aprobacion_pago.html',
        controller: 'AprobacionPagoCtrl',
        controllerAs: 'aprobacionPago'
      })
      .when('/seguimiento_contractual/aprobacion_documentos', {
        templateUrl: 'views/seguimiento_contractual/aprobacion_documentos.html',
        controller: 'AprobacionDocumentosCtrl',
        controllerAs: 'aprobacionDocumentos'
      })
      .when('/seguimiento_contractual/carga_documentos_docente', {
        templateUrl: 'views/seguimiento_contractual/carga_documentos_docente.html',
        controller: 'CargaDocumentosDocenteCtrl',
        controllerAs: 'cargaDocumentosDocente'
      })
      .when('/seguimiento_contractual/aprobacion_coordinador', {
        templateUrl: 'views/seguimiento_contractual/aprobacion_coordinador.html',
        controller: 'AprobacionCoordinadorCtrl',
        controllerAs: 'aprobacionCoordinador'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
