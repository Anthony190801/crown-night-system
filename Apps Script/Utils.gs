/*
Utils.gs: 
- Funciones auxiliares reutilizables.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Funciones Utilitarias
 * Archivo: Utils.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Contiene funciones auxiliares reutilizables por los
 * diferentes módulos del sistema.
 * ----------------------------------------------------------
 */

/**
 * Obtiene las iniciales del primer apellido y del primer nombre.
 *
 * @param {string} apellidos Apellidos del participante.
 * @param {string} nombres Nombres del participante.
 * @returns {string} Iniciales en mayúsculas.
 */
function obtenerIniciales(apellidos, nombres) {
  const primerApellido = apellidos.trim().split(" ")[0];
  const primerNombre = nombres.trim().split(" ")[0];

  return (
    primerApellido.charAt(0) +
    primerNombre.charAt(0)
  ).toUpperCase();
}

/**
 * Obtiene el prefijo correspondiente al área apoyada.
 *
 * @param {string} area Área seleccionada en el formulario.
 * @returns {string} Prefijo del área.
 */
function obtenerPrefijoArea(area) {
  return AREAS[area] || "UNK";
}


/**
 * Obtiene el prefijo correspondiente al candidato apoyado.
 *
 * @param {string} candidato Miss o Mister.
 * @returns {string} Prefijo del candidato.
 */
function obtenerPrefijoCandidato(candidato) {
  return CANDIDATES[candidato] || "UNK";
}

/**
 * Formatea un número utilizando la cantidad de dígitos
 * definida en la configuración del sistema.
 *
 * @param {number} numero Número del contador.
 * @returns {string} Número formateado.
 */
function formatearContador(numero) {
  return numero
    .toString()
    .padStart(CODE.DIGITS, "0");
}

/**
 * Registra un error en el registro de Apps Script.
 *
 * @param {string} modulo Nombre del módulo.
 * @param {Error} error Error capturado.
 */
function registrarError(modulo, error) {
  Logger.log(
    `[${modulo}] ${error.message}`
  );
}

/**
 * Obtiene los datos necesarios de una respuesta del formulario.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} hoja Hoja de respuestas.
 * @param {number} fila Fila del registro.
 * @returns {Object} Datos del participante.
 */
function obtenerDatosRegistro(hoja, fila) {
  return {
    apellidos: hoja
      .getRange(fila, COLUMNS.LASTNAME)
      .getValue(),

    nombres: hoja
      .getRange(fila, COLUMNS.NAME)
      .getValue(),

    telefono: hoja
      .getRange(fila, COLUMNS.PHONE)
      .getValue(),

    area: hoja
      .getRange(fila, COLUMNS.AREA)
      .getValue(),

    candidato: hoja
      .getRange(fila, COLUMNS.CANDIDATE)
      .getValue(),

    correo: hoja
      .getRange(fila, COLUMNS.EMAIL)
      .getValue()
  };
}

/**
 * Devuelve una descripción amigable del candidato apoyado.
 *
 * Ejemplos:
 * 👑 Miss TI
 * 🤵 Mister PMO
 *
 * @param {Object} registro Información del participante.
 * @returns {string}
 */
function obtenerDescripcionCandidato(registro) {

  if (registro.candidato === "Miss") {
    return `👑 Miss ${registro.area}`;
  }

  return `🤵 Mister ${registro.area}`;

}
