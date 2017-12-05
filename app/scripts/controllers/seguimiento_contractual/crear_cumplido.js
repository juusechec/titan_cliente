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

    var docDefinition = {
                       content: [
                         {
                            //Estilo para el header del PDF
                            style: ['bottom_space'],
                            text:[
                              {text:'EL JEFE DE LA : ', bold: true,  alignment: 'center'}, '\n\n',
                              {text:'DE LA UNIVERSIDAD DISTRITAL FRANCISCO JOSÉ DE CALDAS', bold: true,  alignment: 'center'}, '\n\n\n\n',
                              {text:'CERTIFICA QUE: ', bold: true,  alignment: 'center'}, '\n\n\n\n\n\n'
                            ]
                        },
                        {
                             style:['general_font'],
                             text:[
                               'Que el señor(a) ' + self.cumplido_informacion.nombre_completo + ' identificado con la cédula de ciudadanía '+
                               self.Documento + ' de ' + cumplido_informacion.Documento.ciudad + ', cumplió a satisfacción con el objeto establecido en el Contrato de Prestación de Servicios No. ' + self.cumplido.numero_contrato +
                               ' del '+ self.cumplido_informacion.contrato.fecha + ', que dicho Contrato tiene disponibilidad presupuestal No 45541 del 25 de junio de 2017 y certificado de registro presupuestal No. 5087 del 25 de enero de 2017 ' +
                               ' y con el pago reglamentario de los aportes al sistema de seguridad social del 1 al 31 de diciembre de 2017.', '\n\n',

                               'Que el valor causado por este concepto, es la suma de dos millones doscientos trece mil ciento cincuenta y un pesos MCTE ' +
                               '($2,213,151), comprendido del 1 al 30 de Diciembre del año en curso.', '\n\n\n\n',

                               'CUENTA ' + self.cumplido_informacion.cuenta.tipo + ': ' + self.cumplido_informacion.cuenta.numero + ' ' + self.cumplido_informacion.cuenta.banco + '.', '\n\n\n\n',

                               'Se expide para el trámite de pago ante la DIVISIÓN DE RECURSOS FINANCIEROS al mes de ' + self.cumplido_informacion.mes + 'de 2017.', '\n\n\n\n\n\n\n',

                               {text: '' + cumplido_informacion.supervisor.nombre + '', bold: true,  alignment: 'center'}, '\n',
                               {text: 'JEFE ' + cumplido_informacion.dependencia + '', bold: true,  alignment: 'center'}, '\n',


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

    var date = new Date();
    date = moment(date).format('DD_MMM_YYYY_HH_mm_ss');
    pdfMake.createPdf(docDefinition).download('PDF_' + date + '.pdf');

    console.log(self.cumplido_informacion);

  };

    /*var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('/background.pdf'));
    pdfDoc.end();*/


   // pdfMake.createPdf(docDefinition).open();

   /* const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      const targetElement = document.querySelector('#iframeContainer');
      const iframe = document.createElement('vistaPDF');
      iframe.src = dataUrl;
      targetElement.appendChild(iframe);
    });*/

    /*table: {
      widths:[65, '*', 120, 65],
      body:[
        [
          '',
          {text: 'ACTA DE CESIÓN', alignment: 'center', fontSize: 12},
          {text: 'Código: GJ-PR- 002-FR- 010', fontSize: 9},
          ''
        ],
        [ ' ',
          {text: 'Macroproceso: Gestión administrativa y contratación', alignment: 'center', fontSize: 12},
          {text: 'Versión: 01', fontSize: 9, margin: [0, 6]},
          ' '
        ],
        [ ' ',
          {text: 'Proceso: Gestión Jurídica', alignment: 'center', fontSize: 12, margin: [0, 3]},
          {text: 'Fecha de Aprobación: 20/03/14', fontSize: 9},
          ' '
        ],
      ]
    }*/








  });
