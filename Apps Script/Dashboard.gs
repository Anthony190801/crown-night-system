/*
Dashboard.gs:
- Estadísticas y paneles de resultados.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Dashboard
 * Archivo: Dashboard.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Calcula y presenta las principales estadísticas del
 * sistema de registros de Crown Night 2026.
 * ----------------------------------------------------------
 */

/**
 * Actualiza las estadísticas principales del sistema.
 *
 * Actualmente muestra un resumen mediante una ventana
 * emergente en Google Sheets.
 */
function actualizarDashboard() {

  try {
    const estadisticas = obtenerEstadisticas();

    const mensaje = `
      RESUMEN DEL SISTEMA

      👥 Total de registros:
      ${estadisticas.totalRegistros}

      💰 Pagos pendientes:
      ${estadisticas.pagosPendientes}

      ✅ Pagos validados:
      ${estadisticas.pagosValidados}

      📧 Tickets enviados:
      ${estadisticas.ticketsEnviados}

      ⏳ Tickets pendientes:
      ${estadisticas.ticketsPendientes}

      ❌ Envíos con error:
      ${estadisticas.enviosError}
    `;
    SpreadsheetApp
      .getUi()
      .alert(
        PROJECT.NAME,
        mensaje,
        SpreadsheetApp.getUi().ButtonSet.OK
      );
  } catch (error) {
    registrarError("Dashboard", error);
    SpreadsheetApp
      .getUi()
      .alert(
        "Error",
        "No fue posible actualizar el Dashboard.",
        SpreadsheetApp.getUi().ButtonSet.OK
      );
    throw error;
  }
}


/**
 * Obtiene las estadísticas principales del sistema.
 *
 * @returns {Object}
 */
function obtenerEstadisticas() {
  const hoja = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.RESPUESTAS);

  const ultimaFila = hoja.getLastRow();

  if (ultimaFila <= 1) {
    return {
      totalRegistros: 0,
      pagosPendientes: 0,
      pagosValidados: 0,
      ticketsEnviados: 0,
      ticketsPendientes: 0,
      enviosError: 0,
      ticketsAtencion: 0,
      porcentajeEnvio: 0
    };
  }
  const datos = hoja.getRange(2,1,ultimaFila - 1,COLUMNS.OBSERVATIONS).getValues();

  let pagosPendientes = 0;
  let pagosValidados = 0;
  let ticketsEnviados = 0;
  let ticketsPendientes = 0;
  let enviosError = 0;

  datos.forEach(fila => {
    const estadoPago = fila[COLUMNS.PAYMENT - 1];
    const estadoCorreo = fila[COLUMNS.EMAIL_STATUS - 1];

    if (estadoPago === STATUS.PAYMENT.PENDING) {
      pagosPendientes++;
    }
    if (estadoPago === STATUS.PAYMENT.PAID) {
      pagosValidados++;
    }
    if (estadoCorreo === STATUS.EMAIL.SENT) {
      ticketsEnviados++;
    }
    if (estadoPago === STATUS.PAYMENT.PAID && estadoCorreo === STATUS.EMAIL.PENDING) {
      ticketsPendientes++;
    }
    if (estadoCorreo === STATUS.EMAIL.ERROR) {
      enviosError++;
    }
  });
  const ticketsAtencion = ticketsPendientes + enviosError;
  const porcentajeEnvio = pagosValidados > 0 ? (ticketsEnviados / pagosValidados) * 100 : 0;

  return {
    totalRegistros: datos.length,
    pagosPendientes: pagosPendientes,
    pagosValidados: pagosValidados,
    ticketsEnviados: ticketsEnviados,
    ticketsPendientes: ticketsPendientes,
    enviosError: enviosError,
    ticketsAtencion: ticketsAtencion,
    porcentajeEnvio: porcentajeEnvio
  };
}