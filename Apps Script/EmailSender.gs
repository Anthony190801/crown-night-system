/*
EmailSender.gs:
- Gestión del envío de tickets por correo electrónico.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Envío de Correos
 * Archivo: EmailSender.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Contiene las funciones relacionadas con el envío de
 * tickets electrónicos a los participantes.
 * ----------------------------------------------------------
 */

/**
 * Obtiene todos los registros que cumplen las condiciones
 * para enviar el ticket por correo.
 *
 * Condiciones:
 * - Pago = Pagado
 * - Correo = Pendiente || Error
 * - Fecha de envío = Vacía
 *
 * @returns {Array<Object>}
 */
function obtenerRegistrosPendientes() {
  const hoja = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.RESPUESTAS);
  
  const ultimaFila = hoja.getLastRow();

  if (ultimaFila <= 1) {
    return [];
  }
  const datos = hoja
    .getRange(2, 1, ultimaFila - 1, COLUMNS.OBSERVATIONS)
    .getValues();

  const registros = [];

  datos.forEach((fila, indice) => {
    const estadoPago = fila[COLUMNS.PAYMENT - 1];
    const estadoCorreo = fila[COLUMNS.EMAIL_STATUS - 1];
    const fechaEnvio = fila[COLUMNS.SENT_DATE - 1];

    const correoReintentable =
      estadoCorreo === STATUS.EMAIL.PENDING ||
      estadoCorreo === STATUS.EMAIL.ERROR;

    if (estadoPago === STATUS.PAYMENT.PAID && correoReintentable && fechaEnvio === "") {
      registros.push(crearObjetoRegistro(fila,indice + 2));
    }
  });
  return registros;
}

/**
 * Construye la información necesaria para enviar
 * el correo electrónico al participante.
 *
 * @param {Object} registro Registro del participante.
 * @returns {Object}
 */
function construirCorreo(registro) {
  return {
    destinatario: registro.correo,
    asunto: EMAIL.SUBJECT,
    cuerpoHTML: construirHTMLTicket(registro)
  };
}

/**
 * Envía el ticket electrónico a un participante.
 *
 * @param {Object} registro Registro del participante.
 */
function enviarCorreo(registro) {
  try {
    const correo = construirCorreo(registro);

    GmailApp.sendEmail(
      correo.destinatario,
      correo.asunto,
      "",
      {
        htmlBody: correo.cuerpoHTML
      }
    );
  } catch (error) {
    registrarError("EmailSender", error);
    throw error;
  }
}

/**
 * Actualiza el estado del envío del correo
 * de un participante.
 *
 * @param {Object} registro Registro del participante.
 */
function actualizarEstadoCorreo(registro) {
  try {
    const hoja = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEETS.RESPUESTAS);
    hoja
      .getRange(registro.fila,COLUMNS.EMAIL_STATUS)
      .setValue(STATUS.EMAIL.SENT);
    hoja
      .getRange(registro.fila,COLUMNS.SENT_DATE)
      .setValue(new Date());
    hoja
      .getRange(registro.fila,COLUMNS.OBSERVATIONS)
      .clearContent();
  } catch (error) {
    registrarError("EmailSender",error);
    throw error;
  }
}

/**
 * Actualiza el estado del correo cuando ocurre
 * un error durante el envío.
 *
 * @param {Object} registro Registro del participante.
 * @param {Error} error Error producido durante el envío.
 */
function actualizarEstadoCorreoError(registro, error) {
  try {
    const hoja = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEETS.RESPUESTAS);
    hoja
      .getRange(registro.fila, COLUMNS.EMAIL_STATUS)
      .setValue(STATUS.EMAIL.ERROR);
    hoja
      .getRange(registro.fila, COLUMNS.SENT_DATE)
      .clearContent();
    hoja
      .getRange(registro.fila, COLUMNS.OBSERVATIONS)
      .setValue(`Error de envío: ${error.message}`);
  } catch (updateError) {
    registrarError("EmailSender - Actualización de error",updateError);
    throw updateError;
  }
}

/**
 * Envía los tickets pendientes a todos los participantes
 * cuyo pago haya sido validado.
 */
function enviarTicketsPendientes() {

  const registros = obtenerRegistrosPendientes();

  if (registros.length === 0) {
    SpreadsheetApp
      .getUi()
      .alert(
        "No existen tickets pendientes por enviar."
      );
    return;
  }

  let enviados = 0;
  let errores = 0;

  registros.forEach(registro => {
    try {
      //throw new Error("Error de prueba de envío de correo");
      enviarCorreo(registro);
      actualizarEstadoCorreo(registro);
      enviados++;
    } catch (error) {
      actualizarEstadoCorreoError(registro,error);
      errores++;
      registrarError("EmailSender",error);
    }
  });

  SpreadsheetApp
    .getUi()
    .alert(
      `Proceso finalizado.

      Tickets enviados: ${enviados}

      Errores: ${errores}`
    );
}

