/*
QRGenerator.gs: 
- Creación y manejo de los QR.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Generador de Código QR
 * Archivo: QRGenerator.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Construye las URL y las fórmulas necesarias para
 * mostrar automáticamente los códigos QR en Google Sheets.
 * ----------------------------------------------------------
 */

/**
 * Construye el contenido que almacenará el código QR.
 *
 * @param {Object} registro Información del participante.
 * @returns {string}
 */
function construirContenidoQR(registro) {
  return JSON.stringify({
    evento: PROJECT.NAME,
    codigo: registro.codigo,
    participante:
      `${registro.nombres} ${registro.apellidos}`,
    area: registro.area,
    candidato: registro.candidato
  });
}

/**
 * Construye la URL del servicio QR.
 *
 * @param {Object} registro
 * @returns {string}
 */
function construirURLQR(registro) {
  const contenido =construirContenidoQR(registro);
  return (
    QR.API_URL +
    "?size=" +
    QR.SIZE +
    "&data=" +
    encodeURIComponent(contenido)
  );
}

/**
 * Genera la fórmula IMAGE() que permitirá mostrar
 * automáticamente el código QR en Google Sheets.
 *
 * @param {Object} registro
 * @returns {string}
 */
function generarFormulaQR(registro) {
  const url =construirURLQR(registro);
  return `=IMAGE("${url}")`;
}




