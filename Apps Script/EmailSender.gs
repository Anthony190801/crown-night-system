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
 * - Correo = Pendiente
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

    if (
      estadoPago === STATUS.PAYMENT.PAID &&
      estadoCorreo === STATUS.EMAIL.PENDING &&
      fechaEnvio === "") {

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
      .getRange(registro.fila, COLUMNS.EMAIL_STATUS)
      .setValue(STATUS.EMAIL.SENT);
    hoja
      .getRange(registro.fila, COLUMNS.SENT_DATE)
      .setValue(new Date());
  } catch (error) {
    registrarError("EmailSender", error);
    throw error;
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
      enviarCorreo(registro);
      actualizarEstadoCorreo(registro);
      enviados++;
    } catch (error) {
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

