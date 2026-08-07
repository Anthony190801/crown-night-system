/*
Menu.gs:
- Creación del menú personalizado en Google Sheets.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Menú del Sistema
 * Archivo: Menu.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Construye el menú personalizado del sistema dentro
 * de Google Sheets.
 * ----------------------------------------------------------
 */

/**
 * Se ejecuta automáticamente cuando se abre
 * la hoja de cálculo.
 */
function onOpen() {
  SpreadsheetApp
    .getUi()
    .createMenu(PROJECT.NAME)

    .addItem(
      "Enviar tickets pendientes",
      "enviarTicketsPendientes"
    )

    .addSeparator()

    .addItem(
      "Actualizar Dashboard",
      "actualizarDashboard"
    )

    .addSeparator()

    .addItem(
      "Acerca del sistema",
      "mostrarAcercaDe"
    )

    .addToUi();

}


/**
 * Muestra información general del sistema.
 */
function mostrarAcercaDe() {

  SpreadsheetApp
    .getUi()
    .alert(

      `${PROJECT.NAME}

Versión:
${PROJECT.VERSION}

Desarrollado por:
${PROJECT.AUTHOR}

Sistema de automatización para la gestión
de registros, generación de tickets,
códigos QR y envío de correos.`

    );

}



