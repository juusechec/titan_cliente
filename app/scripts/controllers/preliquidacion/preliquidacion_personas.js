'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:PreliquidacionPreliquidacionPersonasCtrl
 * @description
 * # PreliquidacionPreliquidacionPersonasCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('PreliquidacionPreliquidacionPersonasCtrl', function (titanMidRequest,titanRequest,preliquidacion,$window,$translate) {
   var self = this;
   self.preliquidacion = preliquidacion;
   self.generar_disponibilidad;
   self.btnGenerartxt = "Generar";
   self.saving = false;
    console.log(self.preliquidacion);
    if (self.preliquidacion.Nomina.TipoNomina.Nombre === "HC" || self.preliquidacion.Nomina.TipoNomina.Nombre === "HC-SALARIOS"){
    	self.gridOptions = {
	      enableFiltering : true,
	      enableSorting : true,
	      enableRowSelection: true,
	      enableSelectAll: true,
	      columnDefs : [
	        {field: 'Id',             visible : false},
          {field: 'NumeroContrato' ,  displayName: 'Numero de Contrato'},
	        {field: 'NombreProveedor',  displayName: 'Nombre'},
	        {field: 'NumDocumento',  displayName: 'Documento'},
          {name: 'eps', field: 'IdEPS',  visible : false},
          {field: 'IdARL',  visible : false},
          {field: 'IdFondoPension',  visible : false},
          {field: 'IdCajaCompensacion',  visible : false},
	      ],
	      onRegisterApi : function( gridApi ) {
	        self.gridApi = gridApi;
	      },
        rowStyle: function(row){
                if(row.entity.eps === 0){

                  return 'green';
                }else{
                  return 'red';
                }
              },
            rowTemplate : `<div ng-class="myGrid.options.rowStyle(row)"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + '-' + col.uid + '-cell'"
              ng-class="{ 'ui-grid-row-header-cell': col.isRowHeader}" class="ui-grid-cell"
              role="{{col.isRowHeader ? 'rowheader' : 'gridcell'}}" ui-grid-cell>
            </div></div>`

	    };
    	 titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
      	 self.gridOptions.data = response.data;
     });

   	  self.generar_preliquidacion = function(){
        var personas = self.gridApi.selection.getSelectedRows();

        var personas_a_liquidar = [];
        for (var i=0; i < personas.length; i++){
         var persona = { IdPersona : personas[i].Id ,
                         NumeroContrato :  personas[i].NumeroContrato
                        };

          personas_a_liquidar.push(persona)
        }
        var datos_preliquidacion = {
        	Preliquidacion : self.preliquidacion,
        	PersonasPreLiquidacion : personas_a_liquidar

        };
        titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {

     	});

     	self.saving =true;
     	self.btnGenerartxt = "Generando...";
        titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

              self.saving =false;
              self.btnGenerartxt="Generar";
              $window.location.href = '#/preliquidacion/preliquidacion_detalle';
            });;

    };

  }
   if (self.preliquidacion.Nomina.TipoNomina.Nombre === "FP"){
        var rowtpl='<div ng-class="{\'personas_liquidar\':true, \'personas_no_liquidar\':row.entity.IdEPS==0 }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';
        self.gridOptions = {
  	      enableFiltering : true,
  	      enableSorting : true,
  	      enableRowSelection: true,
  	      enableSelectAll: true,
          rowTemplate:rowtpl,
  	      columnDefs : [
  	        {field: 'Id',             visible : false},
            {field: 'NombreProveedor',  displayName: 'Nombre'},
            {field: 'NumDocumento',  displayName: 'Numero de cedula'},
            {field: 'NumeroContrato',  displayName: 'Numero de contrato'},
  	      ],
  	      onRegisterApi : function( gridApi ) {
  	        self.gridApi = gridApi;
  	      }
  	    };

        titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
      	 self.gridOptions.data = response.data;
});

       self.generar_preliquidacion = function(){
         var personas = self.gridApi.selection.getSelectedRows();
         var personas_sin_ss = []
         var personas_a_liquidar = [];
         for (var i=0; i < personas.length; i++){
           if(personas[i].IdEPS === 0 || personas[i].IdARL === 0 || personas[i].IdFondoPension === 0 || personas[i].IdCajaCompensacion === 0){
             //swal("¡ERROR!","No se puede realizar liquidación","error")
             var persona = { IdPersona : personas[i].Id ,
                              NumeroContrato :  personas[i].NumeroContrato
                            };
             personas_sin_ss.push(persona)
           }

           if(personas_sin_ss.length != 0){
             swal({
                html: "No es posible realizar la liquidacion. Las personas resaltadas no cuentan con sus datos de seguridad social completos",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#449D44",
                cancelButtonColor: "#C9302C",
                confirmButtonText: $translate.instant('VOLVER'),
                cancelButtonText: $translate.instant('SALIR'),
              }).then(function() {
                //si da click en ir a contratistas
                $window.location.href = '#/nomina/nomina_consulta';
              }, function(dismiss) {

                if (dismiss === 'cancel') {
                  //si da click en Salir
                  $window.location.href = '#/nomina/nomina_consulta';
                }
              })
           }
           else{
             var persona = { IdPersona : personas[i].Id ,
                              NumeroContrato :  personas[i].NumeroContrato
                            };
                personas_a_liquidar.push(persona)

                var datos_preliquidacion = {
                 Preliquidacion : self.preliquidacion,
                 PersonasPreLiquidacion : personas_a_liquidar

                };
                titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {

               });

               self.saving =true;
               self.btnGenerartxt = "Generando...";
                titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

                      self.saving =false;
                      self.btnGenerartxt="Generar";
                      $window.location.href = '#/preliquidacion/preliquidacion_detalle';
                    });;

           }
         }


     };

      }


      if (self.preliquidacion.Nomina.TipoNomina.Nombre === "DP"){
  self.gridOptions = {
    enableFiltering : true,
    enableSorting : true,
    enableRowSelection: true,
    enableSelectAll: true,
    columnDefs : [
      {field: 'Id',             visible : false},
      {field: 'NombreProveedor',  displayName: 'Nombre'},
      {field: 'NumeroContrato' ,  displayName: 'Numero de Contrato'},
      {field: 'NumDocumento',  displayName: 'Documento'},
    ],
    onRegisterApi : function( gridApi ) {
      self.gridApi = gridApi;
    }

  };
   titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
     self.gridOptions.data = response.data;
 });

  self.generar_preliquidacion = function(){
    var personas = self.gridApi.selection.getSelectedRows();

    var personas_a_liquidar = [];
    for (var i=0; i < personas.length; i++){
     var persona = { IdPersona : personas[i].Id ,
                     NumeroContrato :  personas[i].NumeroContrato
                    };

      personas_a_liquidar.push(persona)
    }
    var datos_preliquidacion = {
      Preliquidacion : self.preliquidacion,
      PersonasPreLiquidacion : personas_a_liquidar

    };
    titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {
  });

  self.saving =true;
  self.btnGenerartxt = "Generando...";
    titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

          self.saving =false;
         self.btnGenerartxt="Generar";
        $window.location.href = '#/preliquidacion/preliquidacion_detalle';
        });;

};

}

if (self.preliquidacion.Nomina.TipoNomina.Nombre === "CT"){
  self.gridOptions = {
enableFiltering : true,
enableSorting : true,
enableRowSelection: true,
enableSelectAll: true,
columnDefs : [
{field: 'Id',             visible : false},
{field: 'NombreProveedor',  displayName: 'Nombre'},
{field: 'NumeroContrato' ,  displayName: 'Numero de Contrato'},
{field: 'NumDocumento',  displayName: 'Documento'},
],
onRegisterApi : function( gridApi ) {
self.gridApi = gridApi;
}

};
titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
self.gridOptions.data = response.data;
});

self.generar_preliquidacion = function(){
var personas = self.gridApi.selection.getSelectedRows();

var personas_a_liquidar = [];
for (var i=0; i < personas.length; i++){
var persona = { IdPersona : personas[i].Id ,
               NumeroContrato :  personas[i].NumeroContrato
              };

personas_a_liquidar.push(persona)
}
var datos_preliquidacion = {
Preliquidacion : self.preliquidacion,
PersonasPreLiquidacion : personas_a_liquidar

};
titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {

});

self.saving =true;
self.btnGenerartxt = "Generando...";
titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

    self.saving =false;
   self.btnGenerartxt="Generar";
  $window.location.href = '#/preliquidacion/preliquidacion_detalle';
  });;

};

}

if (self.preliquidacion.Nomina.TipoNomina.Nombre === "PE"){
  self.gridOptions = {
enableFiltering : true,
enableSorting : true,
enableRowSelection: true,
enableSelectAll: true,
columnDefs : [
{field: 'Id',             visible : false},
{field: 'NombreProveedor',  displayName: 'Nombre'},
{field: 'NumeroContrato' ,  displayName: 'Numero de Contrato'},
{field: 'NumDocumento',  displayName: 'Documento'},
],
onRegisterApi : function( gridApi ) {
self.gridApi = gridApi;
}

};
titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
self.gridOptions.data = response.data;
});

self.generar_preliquidacion = function(){
var personas = self.gridApi.selection.getSelectedRows();

var personas_a_liquidar = [];
for (var i=0; i < personas.length; i++){
var persona = { IdPersona : personas[i].Id ,
               NumeroContrato :  personas[i].NumeroContrato
              };

personas_a_liquidar.push(persona)
}
var datos_preliquidacion = {
Preliquidacion : self.preliquidacion,
PersonasPreLiquidacion : personas_a_liquidar

};
titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {

});

self.saving =true;
self.btnGenerartxt = "Generando...";
titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

    self.saving =false;
   self.btnGenerartxt="Generar";
  $window.location.href = '#/preliquidacion/preliquidacion_detalle';
  });;

};

}
  });
