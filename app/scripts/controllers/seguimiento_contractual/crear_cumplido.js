'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:CrearCumplidoCtrl
 * @description
 * # CrearCumplidoCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('CrearCumplidoCtrl', function(oikosRequest, coreRequest, contratoRequest, $http) {

    //Variable self
    var self = this;

    //Variable que contiene la información del cumplido
    self.cumplido = {};

    /*
      Función que obtiene el número de contrato y la vigencia de acuerdo al número de identidad
    */
    self.obtener_informacion_cumplido = function() {
      //Petición para obtener el número del contrato y la vigencia de los contratos en ejecución de la persona del identificador de la cedula
      $http.get('http://jbpm.udistritaloas.edu.co:8280/services/contratoSuscritoProxyService/contratos_persona/' + self.Documento + '', {
        headers: {
          'Accept': 'application/json'
        }
      }).then(function(response) {
        //Variable que contiene la información de la respuesta de la petición
        self.respuesta_contratos_persona = response.data;
        //Variable que contiene la información de contrato persona
        self.cumplido = self.respuesta_contratos_persona.contratos_personas.contrato_persona[0];

        console.log(self.cumplido);

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

          console.log(self.cumplido_informacion);
        });
      });
    };


    /*
      Función que obtiene el valor a cobrar por los días laborados
    */
    self.obtener_pago = function(){

      console.log(self.cumplido_informacion.valor_contrato);
      //Cambia a tipo entero el valor del contrato
      self.valor_contrato_int = parseInt(self.cumplido_informacion.valor_contrato);
      //Cambia a tipo entero el tiempo en días de la ejecución del contrato
      self.valor_tiempo_dias_int = parseInt(self.cumplido_informacion.tiempo.valor);
      //Obtiene el valor del día laborado
      self.valor_dia_contrato = (self.valor_contrato_int/self.valor_tiempo_dias_int);
      //Número de días laborados
      self.dias_laborados = (self.cumplido_informacion.dia_final - (self.cumplido_informacion.dia_inicial - 1));
      //Valor a cobrar de acuerdo a los días laborados
      self.cumplido_informacion.valor_cobro = (self.valor_dia_contrato * self.dias_laborados);
    };

    /*
      Función que contruye el documento en PDF
    */
    self.generarPDF = function (){

    //Generación documento
    var docDefinition = {
                       content: [
                         {
                            //Estilo para el header del PDF
                            style: ['bottom_space'],
                            text:[
                              {text:'EL JEFE DE LA ' + self.cumplido_informacion.dependencia, bold: true,  alignment: 'center'}, '\n\n',
                              {text:'DE LA UNIVERSIDAD DISTRITAL FRANCISCO JOSÉ DE CALDAS', bold: true,  alignment: 'center'}, '\n\n\n\n',
                              {text:'CERTIFICA QUE: ', bold: true,  alignment: 'center'}, '\n\n\n\n\n\n'
                            ]
                        },
                        {
                             style:['general_font'],
                             text:[
                               'Que el señor(a) ' + self.cumplido_informacion.nombre_completo + ' identificado con la cédula de ciudadanía '+
                               self.Documento + ' de ' + self.cumplido_informacion.Documento.ciudad + ', cumplió a satisfacción con el objeto establecido en el Contrato de Prestación de Servicios No. ' + self.cumplido.numero_contrato +
                               ' del '+ self.cumplido_informacion.contrato.fecha + ', que dicho Contrato tiene disponibilidad presupuestal No 45541 del 25 de junio de 2017 y certificado de registro presupuestal No. 5087 del 25 de enero de 2017 ' +
                               ' y con el pago reglamentario de los aportes al sistema de seguridad social del 1 al 31 de diciembre de 2017.', '\n\n',

                               '' + self.comprobar_contenido(self.parrafo_adicional) + '', '\n\n',

                               'Que el valor causado por este concepto, es la suma de dos millones doscientos trece mil ciento cincuenta y un pesos MCTE ' +
                               '($2,213,151), comprendido del 1 al 30 de Diciembre del año en curso.', '\n\n\n\n',

                               'CUENTA ' + self.cumplido_informacion.cuenta.tipo + ': ' + self.cumplido_informacion.cuenta.numero + ' ' + self.cumplido_informacion.cuenta.banco + '.', '\n\n\n\n',

                               'Se expide para el trámite de pago ante la DIVISIÓN DE RECURSOS FINANCIEROS al mes de ' + self.cumplido_informacion.mes + ' de 2017.', '\n\n\n\n\n\n\n',

                               {text: '' + self.cumplido_informacion.supervisor.nombre + '', bold: true,  alignment: 'center'}, '\n',
                               {text: 'JEFE ' + self.cumplido_informacion.dependencia + '', bold: true,  alignment: 'center'}, '\n\n\n',


                               'Nota: Yo, ' + self.cumplido_informacion.nombre_completo + ' autorizo a la Universidad Distrital hacer el abono de mis pagos a la cuenta bancaria ' +
                               'relacionada en este certificado. Bajo gravedad del juramento certifico que estoy realizando los aportes a seguridad social ' +
                               ' de conformidad con lo establecido por la Ley.', '\n\n\n',
                             ]
                           },
                           {
                             style:['general_font'],
                             text:[
                               '\n\n_____________________________________ \n',
                               'Firma del contratista \n\n\n'
                             ]
                           },
                         ],
                         styles: {
                           top_space: {
                             fontSize: 11,
                             marginTop: 30
                           },
                           bottom_space: {
                             fontSize: 14,
                             marginBottom: 30
                           },
                           general_font:{
                             fontSize: 11,
                             alignment: 'justify'
                           }
                         }
    };

    //Variable para obtener la fecha y hora que se genera el dcoumento
    var date = new Date();
    date = moment(date).format('DD_MMM_YYYY_HH_mm_ss');

    //Sirve para descargar el documento y setearle el nombre
    //pdfMake.createPdf(docDefinition).download('PDF_' + date + '.pdf');

    //Le indica el iframe donde quiere se va a visualizar el cumplido generado
    pdfMake.createPdf(docDefinition).getDataUrl(function(outDoc){
       document.getElementById('vistaPDF').src = outDoc;
     });
     $("#cumplido").show();

  };

  /*
    Función para comprobar el contenido del parrafo extra
  */
  self.comprobar_contenido = function(parrafo_adicional){
    if (parrafo_adicional === undefined){
      console.log("Entro");
      parrafo_adicional = "";
    }else{
      parrafo_adicional = parrafo_adicional
    }
    return parrafo_adicional
  };

});
