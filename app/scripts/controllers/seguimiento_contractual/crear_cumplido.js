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

    var fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
      }
    };
    
    /*var PdfPrinter = require('C:/Users/Sebastián/Documents/go/src/github.com/pdfmake/src/printer');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');*/
    
    var docDefinition = {
    header: function() {  
      
                           return {  
                               columns: [  
                                   {  
                                    text:'Csharp' ,  
                                       width: 200,  
                                       margin: [50, 20, 5, 5]  
                                   },  
                                   {  
                                       stack: [  
                                           { text: 'Project Details', alignment: 'right', fontSize: 12, margin: [0, 30, 50, 0] }  
                                       ]  
                                   }  
                               ]  
                           }  
                       },  

      content: [
        'EL JEFE DE ASESORA DE SISTEMAS',
        
        'DE LA UNIVERSIDAD DISTRITAL FRANCISCO JOSÉ DE CALDAS',
        
        'CERTIFICA QUE:',
        
        'Que el señor JAVIER SEBASTIÁN REYES MOGOLLÓN, identificado con la cédula de ciudadanía ' +
        'No 1.030.619.892 de Bogotá, cumplió a satisfacción con el objeto establecido en el Contrato de ' +
        'Prestación de Servicios No. 1475 del 19 de julio de 2017, que dicho Contrato tiene ' +
        'disponibilidad presupuestal No 2099 del 23 de Junio de 2017 y certificado de registro ' +
        'presupuestal No. 5074 del 25 de Julio de 2017 y con el pago reglamentario de los aportes al ' +
        'sistema de seguridad social del 1 al 30 de Noviembre de 2017.',

        'Que el valor causado por este concepto, es la suma de dos millones doscientos trece mil ciento ' +
        'cincuenta y un pesos MCTE. ($2,213,151), comprendido del 1 al 30 de Noviembre del año en curso.',
        
        cumplido_informacion.cuenta.tipo_cuenta +':' + cumplido_informacion.cuenta.numero + ' ' + cumplido_informacion.cuenta.banco +'',
        
        'Se expide para el trámite de pago ante la DIVISIÓN DE RECURSOS FINANCIEROS a los treinta' +
        '(30) días del mes de Noviembre de 2017.',
        
        'Beatriz Elisa Jaramillo Moreno',
        'Jefe Oficina Asesora de Sistemas',
        
        'Nota: Yo, JAVIER SEBASTIAN REYES MOGOLLON autorizo a la Universidad Distrital hacer el' +
        'abono de mis pagos a la cuenta bancaria relacionada en este certificado. Bajo gravedad del' +
        'juramento certifico que estoy realizando los aportes a seguridad social de conformidad con lo' +
        'establecido por la Ley.',
        
        '------------------------------------------------' +
        'Firma del contratista'
      ]
    };
    
    /*var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('/background.pdf'));
    pdfDoc.end();*/

    var date = new Date();  
    date = moment(date).format('DD_MMM_YYYY_HH_mm_ss');  
    pdfMake.createPdf(docDefinition).download('PDF_' + date + '.pdf'); 
   // pdfMake.createPdf(docDefinition).open();

   /* const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      const targetElement = document.querySelector('#iframeContainer');
      const iframe = document.createElement('vistaPDF');
      iframe.src = dataUrl;
      targetElement.appendChild(iframe);
    });*/









  });
