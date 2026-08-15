/*
CodigoGenerator.gs: 
- Generación del código alfanumérico.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Generación de Código
 * Archivo: CodigoGenerator.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Genera automáticamente un código único para cada
 * registro recibido desde Google Forms.
 * ----------------------------------------------------------
 */

/**
 * Genera un código alfanumérico único para un registro.
 *
 * @param {string} apellidos
 * @param {string} nombres
 * @param {string} area
 * @param {string} candidato
 * @returns {string}
 */

/**
 * Obtiene el siguiente número consecutivo del contador.
 *
 * Busca desde la última fila hacia arriba hasta encontrar
 * el último código generado.
 *
 * @returns {number} Siguiente número disponible.
 */
function obtenerSiguienteContador() {

  const hoja = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.RESPUESTAS);

  const ultimaFila = hoja.getLastRow();

  if (ultimaFila <= 1) {
    return 1;
  }
  const codigos = hoja
    .getRange(2, COLUMNS.CODE, ultimaFila - 1, 1)
    .getValues();

  for (let i = codigos.length - 1; i >= 0; i--) {
    const codigo = codigos[i][0];

    if (codigo !== "") {
      const partes = codigo.split(CODE.SEPARATOR);
      const contador = parseInt(partes[partes.length - 1],10);
      return contador + 1;
    }
  }
  return 1;
}

function generarCodigo(apellidos,nombres,area,candidato) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const iniciales = obtenerIniciales(apellidos,nombres);
    const prefijoArea =obtenerPrefijoArea(area);
    const prefijoCandidato =obtenerPrefijoCandidato(candidato);
    const contador =formatearContador(obtenerSiguienteContador());

    return [
      iniciales,
      prefijoArea,
      prefijoCandidato,
      contador
    ].join(CODE.SEPARATOR);
  } 
  catch (error) {
    registrarError("CodigoGenerator",error);
    throw error;
  } 
  finally {
    lock.releaseLock();
  }
}


