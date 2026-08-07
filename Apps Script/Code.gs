/*
Código.gs
- Punto de entrada del sistema.
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