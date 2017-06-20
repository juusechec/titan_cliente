"use strict";

/**
 * @ngdoc function
 * @name titanClienteV2App.decorator:TextTranslate
 * @description
 * # TextTranslate
 * Decorator of the titanClienteV2App
 */
var text_es = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Ahora puede comenzar con el desarrollo ...",
  VOLVER: "Volver",
  SALIR: "Salir",
  REGISTRAR: "Registrar",
  CANCELAR: "Cancelar",
  GENERAR: "Generar",
  GENERANDO: "Generando...",
  DETALLE: "Detalle",
  GENERAR_PDF: "Generar PDF",
  SI:"Sí",
  NO:"No",
  ACTIVO:"Activo",
  INACTIVO:"Inactivo",
  SELECCIONE: "Seleccione...",
  //Formulario registro nómina
  ANADIR_NOMINA: "Añadir nómina",
  TITULO_REG_NOMINA: "Registro de nómina",
  NOMBRE_NOMINA : "Nombre de la nómina",
  DESC_NOMINA: "Descripción",
  VINC_NOMINA: "Vinculación",
  TIPO_NOMINA: "Tipo",
  ESTADO_NOMINA: "Estado",
  PERIODO_NOMINA: "Periodo",
  OPCIONES_NOMINA: "Opciones",
  PRELIQUIDACION: "Preliquidaciones",
  TITULO_NOMINA_REGIS: "Nóminas registradas",
  NOMINA_REG_CORRECTA: "Nómina registrada correctamente",
  NOMINA_REG_INCORRECTA: "Error al registrar la nómina",
  //Formulario registro preliquidacion
  ANADIR_PRELIQ: "Añadir preliquidación",
  TITULO_REG_PRELIQ: "Registro de preliquidación",
  NOMBRE_PRELIQ: "Nombre de la preliquidación",
  DESC_PRELIQ: "Descripción",
  ESTADO_PRELIQ: "Estado",
  TIPO_PRELIQ: "Tipo",
  TITULO_PRELIQ_REGIS: "Preliquidaciones para la nómina",
  FECHA_PRELIQ: "Fecha registro",
  OPCIONES_PRELIQ: "Opciones",
  PRELIQ_REG_CORRECTA: "Preliquidación registrada correctamente",
  PRELIQ_REG_INCORRECTA: "Error al registrar la preliquidación",

  //Interfaz de listado de personas a preliquidar
  PRELIQ_NOMINA: "Personas a preliquidar en nómina: ",
  NUM_CONTRATO: "Número de contrato",
  NOMBRE_PERSONA: "Nombre",
  DOCUMENTO: "Documento",
  ALERTA_PERSONAS_SIN_SS: "No es posible realizar la liquidacion. Las personas resaltadas no cuentan con sus datos de seguridad social completos",

  //Interfaz de detalle de preliquidacion
  TITULO_DETALLE_PRELIQ :"Detalle de preliquidación de la nómina",
  RESUMEN_PRELIQ: "Resumen de la preliquidación",
  CONCEPTO: "Concepto",
  VALOR: "Valor",
  NATURALEZA: "Naturaleza",
  TIPO: "Tipo",
  TOTAL: "Total",
  TOTAL_DEV: "Total devengado:",
  TOTAL_DESC: "Total descuentos:",
  TOTAL_PAGAR: "Total a pagar:",
  SUELDOS_NETOS: "Sueldos netos:",
  LIQUIDAR:"Liquidar",
  DETALLE_EMP: "Detalle del empleado",
  ALERTA_PERSONAS_SELECCIONADAS: "Debe seleccionar personas para ser liquidadas",
  ALERTA_NO_LIQUIDACION: "Esta preliquidación ya ha sido liquidada",
  //Interfaz de detalle de liquidacion
  TITULO_DETALLE_LIQ :"Detalle de liquidación de la nómina",
  RESUMEN_LIQ: "Resumen de la liquidación",

  //REGISTRO NOVEDADES
  REGISTRO_NOVEDAD: "Registro de novedad",
  DETALLE_NOVEDAD: "Detalle de novedad",
  TIPO_CONCEPTO: "Tipo",
  VALOR_CONCEPTO: "Valor",
  FECHA_INICIO:"Fecha de inicio",
  FECHA_FIN:"Fecha de finalización",
  CUOTAS_NOV: "Cuotas",
  FECHA_REGISTRO: "Fecha de registro",
  PERSONA: "Persona",
  SELECCION_CONCEPTO: "Selección de concepto de novedad",
  SELECCION_NOMINA:"Selección de nómina",
  SELECCION_PERSONA:"Selección de persona",
  NOVEDAD_REG_CORRECTO: "Novedad registrada correctamente",
  NOVEDAD_REG_ERROR: "Error al registrar novedad",
  //FORMULARIO beneficiarios
  TITULO_REG_BEN: "Registro de beneficiarios",
  TIPO_DOC_BEN:"Tipo de documento",
  NUM_DOC_BEN:"Número de documento",
  NOM_BEN: "Nombres de los beneficiarios",
  APE_BEN: "Apellido de los beneficiarios",
  PARENTESCO: "Parentesto",
  PARENTESCO_CON: "Pariente directo de",
  GENERO: "Género",
  CORREO_ELEC: "Correo electrónico",
  NUMERO_CONTACTO:"Número de contacto",
  FECHA_NAC_BEN:"Fecha de nacimiento",
  APLICA_SUB_FAMILIAR: "Aplica subsidio familiar",
  APLICA_SUB_ESTUDIO: "Aplica subsidio de estudio",
  TIPO_CUENTA: "Tipo de cuenta bancaria",
  NUMERO_CUENTA: "Número de cuenta bancaria",
  BANCO_ASOCIADO: "Banco asociado",
  ESTADO_BEN: "Estado",
  CED_CIU: "Cédula de ciudadania",
  CEDULA_EXTRAN: "Cédula de extranjería",
  TARJETA_IDEN: "Tarjeta de identidad",
  MASCULINO: "Masculino",
  FEMENINO: "Femenino",
  PRI_APE:"Primer apellido",
  SEG_APE:"Segundo apellido",
  PRI_NOM:"Primer nombre",
  SEG_NOM:"Segundo nombre",
  AHORROS:"Ahorros",
  CORRIENTE:"Corriente",
  ALERTA_BEN_CORRECTO: "Beneficiario registrado correctamente",
  ALERTA_BEN_INCORRECTO: "Error al registrar beneficiario",
  //FORMULARIO DE SUSTITUTOS
  TITULO_SUS: "Registro de sustituto",
  DOC_FUN_PEN: "Documento funcionario pensionado",
  DOC_BEN_SUS: "Documento beneficiario sustituto",
  PORCENTAJE: "Porcentaje asignado sobre pensión",
  ESTADO_SUS: "Estado",
  TITULO_TUTOR: "  Si el sustituto es menor de edad, se debe ingresar con el respectivo tutor",

  //FORMULARIO tutor
  TITULO_REG_TUTOR: "Registro de tutor",
  TIPO_DOC_TUTOR:"Tipo de documento",
  NUM_DOC_TUTOR:"Número de documento",
  NOM_TUTOR: "Nombres del tutor",
  APE_TUTOR: "Apellidos del tutor",
  BEN_ASOCIADO: "Beneficiario asociado",
  HABILITAR_BENEFICIARIO: "Habilitar beneficiario",
  ID_BENEFICIARIO: "Identificacion del beneficiario",
  ALERTA_SUS_INCOMPLETO: "No hay datos para ingresar información de tutor",
  ALERTA_REG_SUS_CORRECTO: "Se ha registrado correctamente el sustituto",
  ALERTA_REG_SUS_INCORRECTO: "Error al registrar sustituto"
};

var text_en = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Now get to start to develop ...",
  VOLVER: "Back",
  SALIR: "Exit",
  REGISTRAR: "Record",
  CANCELAR: "Cancel",
  GENERAR: "Generate",
  GENERANDO: "Generating...",
  DETALLE: "Detail",
  GENERAR_PDF: "Generate PDF",
  SI:"Yes",
  NO:"No",
  ACTIVO:"Active",
  INACTIVO:"Inactive",
  //Formulario registro y visualizaión nómina
  ANADIR_NOMINA: "Add payslip",
  TITULO_REG_NOMINA: "Payslip's record",
  NOMBRE_NOMINA : "Payslip's name",
  DESC_NOMINA : "Description",
  VINC_NOMINA: "Outreach",
  TIPO_NOMINA: "Type",
  ESTADO_NOMINA: "Status",
  PERIODO_NOMINA: "Term",
  OPCIONES_NOMINA: "Options",
  PRELIQUIDACION: "Preliquidations",
  TITULO_NOMINA_REGIS: "Recorded Payslips",
  NOMINA_REG_CORRECTA: "Payslip correctly recorded",
  NOMINA_REG_INCORRECTA: "Error in payslip's record",

  //Formulario registro y visualización de preliquidacion
  ANADIR_PRELIQ: "Add pre-liquidation",
  TITULO_REG_PRELIQ: "Pre-liquidation's record",
  NOMBRE_PRELIQ: "Pre-liquidation's name",
  DESC_PRELIQ: "Description",
  ESTADO_PRELIQ: "Status",
  TIPO_PRELIQ: "Type",
  TITULO_PRELIQ_REGIS: "Pre-liquidation to the payslip",
  FECHA_PRELIQ: "Record date",
  OPCIONES_PRELIQ: "Options",
  PRELIQ_REG_CORRECTA: "Pre-liquidation correctly recorded",
  PRELIQ_REG_INCORRECTA: "Error in pre-liquidation record",

  //Interfaz de listado de personas a preliquidar
  PRELIQ_NOMINA: "People for pre-liquidation in payslip: ",
  NUM_CONTRATO: "Contract Number",
  NOMBRE_PERSONA: "Name",
  DOCUMENTO: "Identification",
  ALERTA_PERSONAS_SIN_SS: "The selected people cannot be pay off due to incomplete data",

  //Interfaz de detalle de preliquidacion
  TITULO_DETALLE_PRELIQ :"Pre-liquidation payslip detail: ",
  RESUMEN_PRELIQ: "Pre-liquidation's summary",
  CONCEPTO: "Concept",
  VALOR: "Value",
  NATURALEZA: "Nature",
  TIPO: "Type",
  TOTAL: "Total",
  TOTAL_DEV: "Total earned:",
  TOTAL_DESC: "Total deducted:",
  TOTAL_PAGAR: "Total to pay:",
  SUELDOS_NETOS: "Net salaries:",
  LIQUIDAR:"Pay off",
  DETALLE_EMP: "Employee's detail",
  ALERTA_PERSONAS_SELECCIONADAS: "You must select people to pay off",
  ALERTA_NO_LIQUIDACION: "This Pre-liquidation has already been pay off",
  //Interfaz de detalle de liquidacion
  TITULO_DETALLE_LIQ :"Liquidation payslip detail: ",
  RESUMEN_LIQ: "Liquidation's summary",

  //REGISTRO novedades
  REGISTRO_NOVEDAD: "Changes's record",
  DETALLE_NOVEDAD: "Changes's detail",
  TIPO_CONCEPTO: "Type",
  VALOR_CONCEPTO: "Value",
  FECHA_INICIO:"Start date",
  FECHA_FIN:"End date",
  CUOTAS_NOV: "Fees",
  FECHA_REGISTRO: "Record date",
  PERSONA: "Person",
  SELECCION_CONCEPTO: "Change's concept selection",
  SELECCION_NOMINA:"Payslip's selection",
  SELECCION_PERSONA:"Person selection",
  NOVEDAD_REG_CORRECTO: "Changes correctly recorded",
  NOVEDAD_REG_ERROR: "Error in changes' record",
  //FORMULARIO beneficiarios
  TITULO_REG_BEN: "Beneficiary's record",
  TIPO_DOC_BEN:"Identification type",
  NUM_DOC_BEN:"Identification",
  NOM_BEN: "Beneficiary's name",
  APE_BEN: "Beneficiary's surname",
  PARENTESCO: "Relationship",
  PARENTESCO_CON: "Relationship with",
  GENERO: "Gender",
  CORREO_ELEC: "E-mail",
  NUMERO_CONTACTO:"Contact number",
  FECHA_NAC_BEN:"Birthdate",
  APLICA_SUB_FAMILIAR: "Applies family subsidy",
  APLICA_SUB_ESTUDIO: "Applies study subsidy",
  TIPO_CUENTA: "Bank account type",
  NUMERO_CUENTA: "Bank account number",
  BANCO_ASOCIADO: "Associated bank",
  ESTADO_BEN: "Status",
  SELECCIONE: "Select...",
  CED_CIU: "Identification",
  CEDULA_EXTRAN: "Foreigner ID",
  TARJETA_IDEN: "Identity card",
  MASCULINO: "Male",
  FEMENINO: "Female",
  PRI_APE:"First surname",
  SEG_APE: "Second surname",
  PRI_NOM:"First name",
  SEG_NOM:"Second name",
  AHORROS:"Savings",
  CORRIENTE:"Checking",
  ALERTA_BEN_CORRECTO: "Beneficiary correctly recorded",
  ALERTA_BEN_INCORRECTO: "Error in record",
  //FORMULARIO DE SUSTITUTOS
  TITULO_SUS: "Substitute record",
  DOC_FUN_PEN: "Pensioned worker's ID",
  DOC_BEN_SUS: "Substitute ID",
  PORCENTAJE: "Pension's Percentage assigned to substitute",
  ESTADO_SUS: "Status",
  TITULO_TUTOR: "  If substitute is under eighteen, you must record a tutor",

  //FORMULARIO tutor
  TITULO_REG_TUTOR: "Tutor's record",
  TIPO_DOC_TUTOR:"Identification type",
  NUM_DOC_TUTOR:"Identification",
  NOM_TUTOR: "Tutor's names",
  APE_TUTOR: "Tutor's surnames",
  BEN_ASOCIADO: "Associated beneficiary",
  HABILITAR_BENEFICIARIO: "Set up beneficiary",
  ID_BENEFICIARIO: "Beneficiary ID",
  ALERTA_SUS_INCOMPLETO: "There's no data to record information about tutor",
  ALERTA_REG_SUS_CORRECTO: "Substitute correctly recorded",
  ALERTA_REG_SUS_INCORRECTO: "Error in substitute's record"


};

angular.module('titanClienteV2App')
  .config(function($translateProvider) {
    $translateProvider
      .translations("es", text_es)
      .translations("en", text_en);
    $translateProvider.preferredLanguage("es");
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
  });
