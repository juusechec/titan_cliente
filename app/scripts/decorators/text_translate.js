"use strict";

/**
 * @ngdoc function
 * @name titanClienteV2App.decorator:TextTranslate
 * @description
 * # TextTranslate
 * Decorator of the titanClienteV2App
 */
var text_es = {
  TITULO: "SISTEMA DE GESTIÓN DE NÓMINA",
  MENSAJE_INICIAL: "Oficina asesora de sistemas",
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
  CONFIRMAR: "Confirmar",
  CANCELAR: "Cancelar",
  //Formulario registro nómina
  ANADIR_NOMINA: "Añadir nómina",
  TITULO_REG_NOMINA: "Registro de nómina",
  NOMBRE_NOMINA : "Nombre de la nómina",
  DESC_NOMINA: "Descripción",
  ESTADO_NOMINA: "Estado",
  OPCIONES_NOMINA: "Opciones",
  PRELIQUIDACION: "Preliquidaciones",
  TIPO_NOMINA: "Tipo de nómina",
  TITULO_NOMINA_REGIS: "Nóminas registradas",
  NOMINA_REG_CORRECTA: "Nómina registrada correctamente",
  NOMINA_REG_INCORRECTA: "Error al registrar la nómina",
  //Formulario registro preliquidacion
  ANADIR_PRELIQ: "Añadir preliquidación",
  TITULO_REG_PRELIQ: "Registro de preliquidación",
  DESC_PRELIQ: "Descripción",
  ANO_PRELIQ: "Año",
  MES_PRELIQ: "Mes",
  ESTADO_PRELIQ: "Estado",
  TITULO_PRELIQ_REGIS: "Preliquidaciones para la nómina",
  FECHA_PRELIQ: "Fecha registro",
  OPCIONES_PRELIQ: "Opciones",
  PRELIQ_REG_CORRECTA: "Preliquidación registrada correctamente",
  PRELIQ_REG_INCORRECTA: "Error al registrar la preliquidación",
  ALERTA_PRELIQUIDACION_CERRADA: "Esta preliquidación está cerrada",
  //Interfaz de listado de personas a preliquidar
  PRELIQ_NOMINA: "Personas a preliquidar en nómina: ",
  NUM_CONTRATO: "Número de contrato",
  NOMBRE_PERSONA: "Nombre",
  DOCUMENTO: "Documento",
  VIGENCIA: "Vigencia",
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
  GENERAR_NECESIDAD:"Generar necesidad",
  DETALLE_EMP: "Detalle del empleado",
  ALERTA_PERSONAS_SELECCIONADAS: "Debe seleccionar personas para ser liquidadas",
  ALERTA_NO_LIQUIDACION: "Esta preliquidación ya ha sido liquidada",
  //Interfaz de detalle de liquidacion
  TITULO_DETALLE_LIQ :"Detalle de liquidación de la nómina",
  RESUMEN_LIQ: "Resumen de la liquidación",
  //REGISTRO Y CONSULTA DE NOVEDADES
  SELECCION_PERSONA:"Selección de persona",
  AGREGAR_NOVEDAD: "Agregar novedad",
  DETALLE_NOVEDAD: "Detalle de novedades",
  ALERTA_NO_NOVEDADES: "No hay novedades registradas",
  TITULO_REG_NOVEDAD: "Registro de nueva novedad",
  NOMBRE_CONCEPTO_NOVEDAD: "Concepto",
  VALOR_CONCEPTO_NOVEDAD: "Valor Novedad",
  NUMCUOTAS_CONCEPTO_NOVEDAD: "No de cuotas",
  VALOR_CONCEPTO: "Valor",
  CUOTAS_NOV: "Cuotas",
  TIPO_CONCEPTO: "Tipo",
  FECHA_INICIO:"Fecha de inicio",
  FECHA_FIN:"Fecha de finalización",
  TITULO_EDICION_NOVEDAD: "Edición de novedad",
  FECHA_REGISTRO: "Fecha de registro",
  NOVEDAD_REG_CORRECTO: "Novedad registrada correctamente",
  NOVEDAD_REG_ERROR: "Error al registrar novedad",
  CONFIRMACION_INACTIVIDAD_NOV: "¿Está seguro que desea inactivar la novedad : ",
  INACTIVIDAD_CORRECTA_NOV:"Novedad inactivada",
  INACTIVIDAD_INCORRECTA_NOV:"Error al inactivar novedad",
  CONFIRMACION_EDICION_NOV: "¿Está seguro que desea editar la novedad : ",
  EDICION_CORRECTA_NOV:"Novedad modificada correctamente",
  EDICION_INCORRECTA_NOV:"Error al modificar novedad",
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
  ALERTA_REG_SUS_INCORRECTO: "Error al registrar sustituto",

  //Desprendible de pago
  NOMBRE_RUBRO:"Rubro",
  NOMBRE_BENEFICIARIO: "Beneficiario",
  NOMBRE_ORDEN_PAGO: "Orden de pago",
  FECHA_PDF: "Fecha",
  CONCEPTO_PDF: "Concepto",
  NOMBRE_RUBRO_ASOCIADO: "Rubro asociado",
  DETALLE_PAGO_PDF: "Detalle de pago",
  DEVENGOS_PDF: "Devengos",
  DESCUENTOS_PDF: "Descuentos",
  VALOR_PDF: "Valor",
  ALERTA_SELECCION_PERSONAS_PDF: "Seleccione personas para generar PDF",
  PAGO_PERIODO_PDF : "Pagos periodo",
  TITULO_DETALLE_PAGO_PDF: "DETALLE DE PAGO",
  TOTAL_DEVENGADO_PDF: "Total devengado",
  TOTAL_DESCUENTOS_PDF: "Total descuentos",
  //MÓDULO DE conceptos
  TITULO_GENERAL: "CONCEPTOS REGISTRADOS",
  TITULO_EDICION: "EDICIÓN DE CONCEPTO",
  TITULO_ADICION: "NUEVO CONCEPTO",
  ANADIR_CONCEPTO: "Añadir concepto",
  CONCEPTO_NOMBRE: "Nombre de concepto",
  NATURALEZA_NOMBRE: "Naturaleza",
  TIPO_NOMBRE: "Tipo",
  ACCIONES: "Acciones",
  CONFIRMACION_EDICION: "¿Está seguro de querer actualizar el concepto:",
  ACTUALIZACION_CORRECTA: "Concepto actualizado correctamente",
  ACTUALIZACION_INCORRECTA: "Error al actualizar concepto",
  CONFIRMACION_ELIMINACION: "¿Está seguro de querer eliminar el concepto:",
  ELIMINACION_CORRECTA: "Concepto eliminado correctamente",
  ELIMINACION_INCORRECTA: "Error al eliminar concepto",
  CONFIRMACION_ADICION: "¿Está seguro de querer agregar el concepto:",
  ADICION_CORRECTA: "Concepto agregado correctamente",
  ADICION_INCORRECTA: "Error al agregado concepto",
    //MENÚ GENERAL
  PENSIONADOS_MENU: "Pensionados",
  INGRESAR_BEN: "Ingresar beneficiarios",
  INGRESAR_SUS:"Ingresar sustitutos",
  NOMINA_MENU: "Nóminas",
  CONCEPTOS_MENU: "Concepto",
  NOVEDADES_MENU: "Novedades",
  REG_NOV_MENU:"Registrar novedades",
  CONS_NOV_MENU:"Consultar novedades",

  //MODULO CUMPLIDO
  TITULO_REG_CUMPLIDO: "CUMPLIDO",
  NUM_DOC_IDENTIDAD:"NUMERO DOCUMENTO DE IDENTIDAD",
  NAME_CONTRATISTA:"NOMBRE",
  TIPO_DOC:"TIPO DOCUMENTO",
  CIUDAD_DOC:"CIUDAD",
  NUM_CONTRAC:"NÚMERO CONTRATO",
  FECH_SUSC_CONT:"FECHA SUSCRIPCIÓN CONTRATO",
  UNIDAD_EJE:"UNIDAD EJECUTORA",
  VIGENCIA:"VIGENCIA",
  TIPO_CUENTA:"TIPO CUENTA",
  BANCO:"BANCO",
  NUM_CUENTA:"NÚMERO CUENTA",
  DEPENDENCIA:"DEPENDENCIA",
  SUPERVISOR:"SUPERVISOR DEL CONTRATO",
  CARGO_SUP:"CARGO SUPERVISOR DEL CONTRATO",
  CUMPLIDO_MES:"CUMPLIDO DEL MES",
  DIAS_LABORADOS:"DÍAS LABORADOS",
  VALOR_COB:"VALOR A COBRAR",
  ACCION_CONSULTAR_NUM_DOC:"CONSULTAR INFORMACIÓN",
  GEN_CUMPLIDO:"GENERAR CUMPLIDO",
  PLACE_NUM_DOC:"Ingrese su número de documento de identidad",
  PLACE_MES:"-- Elija el mes al cúal corresponde el cumplido --",
  PLACE_DIAS_LAB:"POR FAVOR INGRESE EL RANGO DE DIAS LABORADOS",
  DIA_INI:"DÍA INICIO",
  DIA_FIN:"DÍA FIN",
  VISTA_CUMPLIDO: "VISUALIZACIÓN CUMPLIDO",
  VISTA_CUMPLIDO_ACTUALIZADO: "ACTUALIZAR VISUALIZACIÓN",
  MEN_PARRA_EX:"Sí desea incluir un parrafo extra para agregar la fuente de financiamiento, de click en la siguiente casilla",
  PARRAFO_EXTRA:"Parrafo extra",

  //MODULO INFORME DE GESTIÓN
  TITULO_REG_INFORME: "INFORME DE GESTIÓN",
  NUM_CONTRAC:"NÚMERO CONTRATO",
  INFORME_MES:"INFORME DEL MES",
  FECHA_INI_CONTRACT:"FECHA INICIO DEL CONTRATO",
  FECHA_FIN_CONTRACT:"FECHA FIN DEL CONTRATO",
  OBJETO_CONTRACT:"OBJETO DEL CONTRATO",
  GEN_INFORME:"GENERAR INFORME DE GESTIÓN",
  AGREGAR_REG:"AGREGAR REGISTRO",
  ACTI_REALI:"ACTIVIDADES REALIZADAS",
  METAS:"METAS",
  INDI_DE_CUMP:"INDICADOR DE CUMPLIMIENTO",
  OBSERVACIONES:"OBSERVACIONES",
  NIV_AVAN:"NIVEL DE AVANCE",
  TEXT_DEPEN:"-- Elija la dependencia a la que pertenece --",
  ACC:"ACCIONES",
  EDITAR:"EDITAR",
  ELIMINAR:"ELIMINAR REGISTRO",


  //Módulo aprobación documentos
  TITULO_APRO_DOC: "APROBACIÓN DOCUMENTOS NÓMINA",
  NOM_SUPER:"NOMBRE SUPERVISOR",
  NAME_CONTR:"NOMBRE CONTRATISTA",
  DOCUMENTO:"DOCUMENTO",
  CAR_SUPER:"CARGO SUPERVISOR",

  //Módulo aprobación pago
  TITULO_APRO_PAGO:"APROBACIÓN PAGO",
  NOM_ORDENADOR:"NOMBRE ORDENADOR DEL GASTO",

  //Módulo cargar de listas
  TITULO_CARGA_LISTAS:"CARGA LISTAS DE DOCENTES",
  NOM_DOCENTE:"NOMBRE DEL DOCENTE",
  PRO_CURR:"PROYECTO CURRICULAR",
  NUM_VINC:"NÚMERO DE VINCULACIÓN",
  RESOLUCION:"RESOLUCIÓN",
  SOLICITAR_PAGO:"SOLICITAR PAGO",
  CARGAR_LISTAS:"CARGAR LISTAS",
  SELECCIONAR_DOCUMENTO:"Seleccione el documento",
  PARRAFO_SOLICITAR_PAGO:"Seleccione el mes y el año de la solicitud de pago a realizar",
  PARRAFO_CARGAR_LISTAS:"Seleccione la solicitud de pago a la que le va a cargar los soportes.",


  //Modal informe de gestión docente
  TITULO_MODAL_INFORME_DOC:"INFORME DE GESTIÓN DOCENTE",
  HORAS_LEC:"HORAS LECTIVAS",
  INVESTIGACION:"INVESTIGACIÓN",
  EXTENSION:"EXTENSIÓN",
  PUBLICACIONES:"PUBLICACIONES",
  ACTIVIDADES:"OTRAS ACTIVIDADES ASIGNADAS POR EL COORDINADOR",
  ENVIAR:"ENVIAR",

  //Revisión COORDINADOR
  TITULO_REV_COO: "REVISIÓN COORDINADOR",
  NOM_COOR:"NOMBRE COORDINADOR",
  NAME_TEACHER:"NOMBRE PROFESOR" ,
  VISU_DOCS:"VER DOCUMENTOS",
  ANO_SOLICITUD:"AÑO SOLICITUD",
  MES_SOLICITUD:"MES SOLICITUD",
  NUM_VIN:"NÚMERO VINCULACIÓN"
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
  CONFIRMAR: "Confirm",
  CANCELAR: "Cancel",
  //Formulario registro y visualizaión nómina
  ANADIR_NOMINA: "Add payslip",
  TITULO_REG_NOMINA: "Payslip's record",
  NOMBRE_NOMINA : "Payslip's name",
  DESC_NOMINA : "Description",
  ESTADO_NOMINA: "Status",
  OPCIONES_NOMINA: "Options",
  PRELIQUIDACION: "Preliquidations",
  TIPO_NOMINA: "Payslip type",
  TITULO_NOMINA_REGIS: "Recorded Payslips",
  NOMINA_REG_CORRECTA: "Payslip correctly recorded",
  NOMINA_REG_INCORRECTA: "Error in payslip's record",

  //Formulario registro y visualización de preliquidacion
  ANADIR_PRELIQ: "Add pre-liquidation",
  TITULO_REG_PRELIQ: "Pre-liquidation's record",
  DESC_PRELIQ: "Description",
  ANO_PRELIQ: "Year",
  MES_PRELIQ: "Month",
  ESTADO_PRELIQ: "Status",
  TITULO_PRELIQ_REGIS: "Pre-liquidation to the payslip",
  FECHA_PRELIQ: "Record date",
  OPCIONES_PRELIQ: "Options",
  PRELIQ_REG_CORRECTA: "Pre-liquidation correctly recorded",
  PRELIQ_REG_INCORRECTA: "Error in pre-liquidation record",
  ALERTA_PRELIQUIDACION_CERRADA: "This pre-liquidation is closed",

  //Interfaz de listado de personas a preliquidar
  PRELIQ_NOMINA: "People for pre-liquidation in payslip: ",
  NUM_CONTRATO: "Contract Number",
  NOMBRE_PERSONA: "Name",
  DOCUMENTO: "Identification",
  VIGENCIA: "Term",
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
  GENERAR_NECESIDAD:"Create necesity",
  DETALLE_EMP: "Employee's detail",
  ALERTA_PERSONAS_SELECCIONADAS: "You must select people to pay off",
  ALERTA_NO_LIQUIDACION: "This Pre-liquidation has already been pay off",
  //Interfaz de detalle de liquidacion
  TITULO_DETALLE_LIQ :"Liquidation payslip detail: ",
  RESUMEN_LIQ: "Liquidation's summary",
  //REGISTRO Y CONSULTA DE NOVEDADES
  SELECCION_PERSONA:"Person selection",
  AGREGAR_NOVEDAD: "Add change",
  DETALLE_NOVEDAD: "Changes' detail",
  ALERTA_NO_NOVEDADES: "There are not recorded changes",
  TITULO_REG_NOVEDAD: "Adding a new change",
  NOMBRE_CONCEPTO_NOVEDAD: "Concept",
  VALOR_CONCEPTO_NOVEDAD: "Change value",
  NUMCUOTAS_CONCEPTO_NOVEDAD: "Fees",
  VALOR_CONCEPTO: "Value",
  CUOTAS_NOV: "Fees",
  TIPO_CONCEPTO: "Type",
  FECHA_INICIO:"Start date",
  FECHA_FIN:"End date",
  TITULO_EDICION_NOVEDAD: "Change edit",
  FECHA_REGISTRO: "Record date",
  NOVEDAD_REG_CORRECTO: "Change correctly recorded",
  NOVEDAD_REG_ERROR: "Error in changes' record",
  CONFIRMACION_INACTIVIDAD_NOV: "Are you sure you want to disable the change : ",
  INACTIVIDAD_CORRECTA_NOV:"Change correctly disabled",
  INACTIVIDAD_INCORRECTA_NOV:"Error in disabling change",
  CONFIRMACION_EDICION_NOV: "Are you sure you want to edit the change: ",
  EDICION_CORRECTA_NOV:"Change correctly modified",
  EDICION_INCORRECTA_NOV:"Error in modifying change",
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
  ALERTA_REG_SUS_INCORRECTO: "Error in substitute's record",

  //Desprendible pago
  NOMBRE_RUBRO:"Rubro en inglés",
  NOMBRE_BENEFICIARIO: "Beneficiary",
  NOMBRE_ORDEN_PAGO: "Payment order",
  FECHA_PDF: "Date",
  CONCEPTO_PDF: "Concept",
  NOMBRE_RUBRO_ASOCIADO: "Rubro asociado en inglés",
  DETALLE_PAGO_PDF: "Payment detail",
  DEVENGOS_PDF: "Incomes",
  DESCUENTOS_PDF: "Discounts",
  VALOR_PDF: "Values",
  ALERTA_SELECCION_PERSONAS_PDF: "Please select people to generate PDF",
  PAGO_PERIODO_PDF : "Payment for term: ",
  TITULO_DETALLE_PAGO_PDF: "Payment detail",
  TOTAL_DEVENGADO_PDF: "Total payed",
  TOTAL_DESCUENTOS_PDF: "Total deducted",

//MODULO DE CONCEPTOS
  TITULO_GENERAL: "RECORDED CONCEPTS",
  TITULO_EDICION: "CONCEPT EDITING",
  TITULO_ADICION: "NEW CONCEPT",
  ANADIR_CONCEPTO: "Add concept",
  CONCEPTO_NOMBRE: "Concept name",
  NATURALEZA_NOMBRE: "Nature",
  TIPO_NOMBRE: "Type",
  ACCIONES: "Actions",
  CONFIRMACION_EDICION: "Are you sure you want to update the concept:",
  ACTUALIZACION_CORRECTA: "Concept correctly updated",
  ACTUALIZACION_INCORRECTA: "Error updating concept",
  CONFIRMACION_ELIMINACION: "Are you sure you want to delete the concept:",
  ELIMINACION_CORRECTA: "Concept correctly deleted",
  ELIMINACION_INCORRECTA: "Error deleting concept",
  CONFIRMACION_ADICION: "Are you sure you cant to add the concept:",
  ADICION_CORRECTA: "Concept correctly added",
  ADICION_INCORRECTA: "Error adding concepto",

    //MENÚ GENERAL
  PENSIONADOS_MENU: "Retirees",
  INGRESAR_BEN: "Record beneficiaries",
  INGRESAR_SUS:"Record substitutes",
  NOMINA_MENU: "Payslips",
  CONCEPTOS_MENU: "Concepts",
  NOVEDADES_MENU: "Changes",
  REG_NOV_MENU:"Record changes",
  CONS_NOV_MENU:"List changes",

  //MODULO CUMPLIDO
  TITULO_REG_CUMPLIDO: "COMPLIMENT",
  NUM_DOC_IDENTIDAD:"IDENTITY DOCUMENT NUMBER",
  NAME_CONTRATISTA:"NAME",
  TIPO_DOC:"TYPE DOCUMENT",
  CIUDAD_DOC:"CITY",
  NUM_CONTRAC:"CONTRACT NUMBER",
  FECH_SUSC_CONT:"DATE SUBSCRIPTION CONTRACT",
  UNIDAD_EJE:"EXECUTIVE UNIT",
  VIGENCIA:"VALIDITY",
  TIPO_CUENTA:"ACCOUNT TYPE",
  BANCO:"BANK",
  NUM_CUENTA:"ACCOUNT NUMBER",
  DEPENDENCIA:"DEPENDENCE",
  SUPERVISOR:"CONTRACT SUPERVISOR",
  CARGO_SUP:"CONTRACT SUPERVISORY CHARGE",
  CUMPLIDO_MES:"MONTH COMPLIMENT",
  DIAS_LABORADOS:"WORKING DAYS",
  VALOR_COB:"VALUE TO BE CHARGED",
  ACCION_CONSULTAR_NUM_DOC:"CONSULT INFORMATION",
  GEN_CUMPLIDO:"GENERATE COMPLIMENT",
  PLACE_NUM_DOC:"Enter your identity document number",
  PLACE_MES:"-- Choose the month to which the compliment corresponds --",
  PLACE_DIAS_LAB:"PLEASE ENTER THE RANGE OF WORK DAYS",
  DIA_INI:"START DAY",
  DIA_FIN:"END DAY",
  VISTA_CUMPLIDO: "FULLY DISPLAYED",
  VISTA_CUMPLIDO_ACTUALIZADO: "UPDATE VISUALIZATION",
  MEN_PARRA_EX:"If you want to include an extra paragraph to add the financing source, click on the following box",
  PARRAFO_EXTRA:"Extra paragraph",

  //MODULO INFORME DE GESTIÓN
  TITULO_REG_INFORME:"MANAGEMENT REPORT",
  NUM_CONTRAC:"CONTRACT NUMBER",
  INFORME_MES:"MONTH REPORT",
  FECHA_INI_CONTRACT:"START DATE OF CONTRACT",
  FECHA_FIN_CONTRACT:"END DATE OF CONTRACT",
  OBJETO_CONTRACT:"CONTRACT OBJECT",
  GEN_INFORME:"GENERATE MANAGEMENT REPORT",
  AGREGAR_REG:"ADD REGISTRY",
  ACTI_REALI:"ACTIVITIES PERFORMED",
  METAS:"GOALS",
  INDI_DE_CUMP:"INDICATOR OF COMPLIANCE",
  OBSERVACIONES:"OBSERVATIONS",
  NIV_AVAN:"ADVANCE LEVEL",
  TEXT_DEPEN:"-- Choose the dependence to which it belongs --",
  ACC:"ACTIONS",
  EDITAR:"EDIT",
  ELIMINAR:"DELETE RECORD",

  //Módulo aprobación documentos
  TITULO_APRO_DOC: "APPROVAL OF PAYROLL DOCUMENTS",
  NOM_SUPER:"SUPERVISOR NAME",
  NAME_CONTR:"CONTRACTOR NAME",
  DOCUMENTO:"DOCUMENT",
  CAR_SUPER:"SUPERVISOR POSITION",

  //Módulo aprobación pago
  TITULO_APRO_PAGO:"APPROVAL PAYMENT",
  NOM_ORDENADOR:"NAME EXECUTING AGENT",

  //Módulo cargar de listas
  TITULO_CARGA_LISTAS:"LOADING OF TEACHER LISTS",
  NOM_DOCENTE:"TEACHER'S NAME",
  PRO_CURR:"CURRICULAR PROJECT",
  NUM_VINC:"LINKING NUMBER",
  RESOLUCION:"RESOLUTION",
  SOLICITAR_PAGO:"REQUEST PAYMENT",
  CARGAR_LISTAS:"UPLOAD LISTS",
  SELECCIONAR_DOCUMENTO:"Select the document",
  PARRAFO_SOLICITAR_PAGO:"Select the month and year of the payment request to be made",
  PARRAFO_CARGAR_LISTAS:"Select the payment request to which the media will be charged.",

  //Modal informe de gestión docente
  TITULO_MODAL_INFORME_DOC:"TEACHER MANAGEMENT REPORT",
  HORAS_LEC:"HOURS OF LESSONS",
  INVESTIGACION:"INVESTIGATION",
  EXTENSION:"EXTENSION",
  PUBLICACIONES:"PUBLICATIONS",
  ACTIVIDADES:"OTHER ACTIVITIES ASSIGNED BY THE COORDINATOR",
  ENVIAR: "SEND",

  //Revisión COORDINADOR
  TITULO_REV_COO: "COORDINATOR REVIEW",
  NOM_COOR:"COORDINATOR NAME",
  NAME_TEACHER:"TEACHER NAME" ,
  VISU_DOCS:"VIEW DOCUMENTS",
  ANO_SOLICITUD:"YEAR REQUEST",
  MES_SOLICITUD:"MONTH REQUEST",
  NUM_VIN:"NUMBER LINK"
};

angular.module('titanClienteV2App')
  .config(function($translateProvider) {
    $translateProvider
      .translations("es", text_es)
      .translations("en", text_en);
    $translateProvider.preferredLanguage("es");
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
  });
