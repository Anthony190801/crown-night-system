/*
ProcesoRegistro.gs:
- Orquesta el procesamiento de una nueva respuesta del formulario.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Proceso de Registro
 * Archivo: ProcesoRegistro.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Coordina el flujo completo para procesar una nueva
 * respuesta recibida desde Google Forms.
 * ----------------------------------------------------------
 */

/**
 * Procesa una nueva respuesta del formulario.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} hoja Hoja de respuestas.
 * @param {number} fila Fila del nuevo registro.
 */
function procesarNuevoRegistro(hoja, fila) {

  try {
    // Obtener datos del participante
    const datos = obtenerDatosRegistro(hoja,fila);
    // Generar código alfanumérico
    const codigo = generarCodigo(
      datos.apellidos,
      datos.nombres,
      datos.area,
      datos.candidato
    );
    // Construir el registro
    const registro = crearRegistroInicial(codigo);

    registro.nombres = datos.nombres;
    registro.apellidos = datos.apellidos;
    registro.area = datos.area;
    registro.candidato = datos.candidato;

    // Generar fórmula del QR
    registro.qr = generarFormulaQR(registro);

    // Guardar en la hoja
    actualizarRegistro(hoja,fila,registro);

  } catch (error) {
    registrarError("ProcesoRegistro",error);
    throw error;
  }
}


