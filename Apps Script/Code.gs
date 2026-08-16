/*
Código.gs

- Puntos de entrada del sistema.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Puntos de Entrada
 * Archivo: Código.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 */

/**
 * Se ejecuta automáticamente cuando Google Forms
 * registra una nueva respuesta.
 *
 * @param {GoogleAppsScript.Events.SheetsOnFormSubmit} e
 */
function onFormSubmit(e) {
  try {
    const hoja = e.range.getSheet();
    const fila = e.range.getRow();

    procesarNuevoRegistro(hoja,fila);
  } catch (error) {
    registrarError("Código",error);
    throw error;
  }
}

/**
 * Sirve la interfaz web del Dashboard.
 *
 * @returns {GoogleAppsScript.HTML.HtmlOutput}
 */
function doGet() {
  return HtmlService
    .createTemplateFromFile("DashboardUI")
    .evaluate()
    .setTitle(PROJECT.NAME + " - Dashboard")
    .setXFrameOptionsMode(
      HtmlService.XFrameOptionsMode.ALLOWALL
    );
}


