/**
 * ----------------------------------------------------------
 * MÓDULO: Gestión de Registros
 * Archivo: RegistroManager.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Construye y actualiza la información de los registros
 * generados a partir de las respuestas del formulario.
 * ----------------------------------------------------------
 */

/**
 * Construye el objeto que representa el estado inicial
 * de un registro del formulario.
 *
 * @param {string} codigo Código alfanumérico generado.
 * @returns {Object}
 */
function crearRegistroInicial(codigo) {
  return {
    codigo: codigo,
    qr: "",
    estadoPago: STATUS.PAYMENT.PENDING,
    estadoCorreo: STATUS.EMAIL.PENDING,
    fechaEnvio: "",
    observaciones: ""
  };
}

/**
 * Actualiza una fila del Google Sheets con la información
 * generada para un nuevo registro.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} hoja Hoja de respuestas.
 * @param {number} fila Número de fila a actualizar.
 * @param {Object} registro Objeto generado por crearRegistroInicial().
 */
function actualizarRegistro(hoja,fila,registro) {

  try {
    // Código
    hoja
      .getRange(fila, COLUMNS.CODE)
      .setValue(registro.codigo);

    // QR
    hoja
      .getRange(fila, COLUMNS.QR)
      .setFormula(registro.qr);

    // Fecha envío
    hoja
      .getRange(fila, COLUMNS.SENT_DATE)
      .setValue(registro.fechaEnvio);

    // Estado pago
    hoja
      .getRange(fila, COLUMNS.PAYMENT)
      .setValue(registro.estadoPago);

    // Estado correo
    hoja
      .getRange(fila, COLUMNS.EMAIL_STATUS)
      .setValue(registro.estadoCorreo);

    // Observaciones
    hoja
      .getRange(fila, COLUMNS.OBSERVATIONS)
      .setValue(registro.observaciones);

  }catch (error) {
    registrarError("RegistroManager",error);
    throw error;
  }
}

/**
 * Convierte una fila de Google Sheets en un objeto
 * de registro del sistema.
 *
 * @param {Array} fila Datos de una fila de la hoja.
 * @param {number} numeroFila Número real de la fila.
 * @returns {Object}
 */
function crearObjetoRegistro(fila, numeroFila) {
  return {
    fila: numeroFila,
    apellidos: fila[COLUMNS.LASTNAME - 1],
    nombres: fila[COLUMNS.NAME - 1],
    telefono: fila[COLUMNS.PHONE - 1],
    area: fila[COLUMNS.AREA - 1],
    candidato: fila[COLUMNS.CANDIDATE - 1],
    correo: fila[COLUMNS.EMAIL - 1],
    codigo: fila[COLUMNS.CODE - 1],
    qr: fila[COLUMNS.QR - 1],
    fechaEnvio: fila[COLUMNS.SENT_DATE - 1],
    estadoPago: fila[COLUMNS.PAYMENT - 1],
    estadoCorreo: fila[COLUMNS.EMAIL_STATUS - 1],
    observaciones: fila[COLUMNS.OBSERVATIONS - 1]
  };
}


