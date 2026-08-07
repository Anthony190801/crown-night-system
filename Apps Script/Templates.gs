/*
Templates.gs:
- Plantillas HTML utilizadas por el sistema.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Plantillas HTML
 * Archivo: Templates.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Contiene las diferentes plantillas HTML utilizadas
 * para el envío de correos electrónicos.
 * ----------------------------------------------------------
 */

/**
 * Construye el cuerpo HTML del correo que contiene
 * el ticket oficial del participante.
 *
 * @param {Object} registro Registro del participante.
 * @returns {string}
 */
function construirHTMLTicket(registro) {
  return `

    <p>Hola <strong>${registro.nombres}</strong>,</p>

    <p>
      Tu apoyo ha sido registrado y validado correctamente para
      <strong>Crown Night - SEDIPRO UNT 2026</strong>.
    </p>

    <p>
      A continuación encontrarás tu ticket oficial para participar
      en el sorteo.
    </p>

    <hr>

    <p>

      <strong>Código:</strong>

      <br>

      ${registro.codigo}

    </p>

    <p>

      <strong>Código QR</strong>

    </p>

    <img
      src="${construirURLQR(registro)}"
      width="250"
    >

    <hr>

    <p>

      <strong>Importante</strong>

    </p>

    <ul>

      <li>Conserva este correo.</li>

      <li>No compartas tu código QR.</li>

      <li>Será solicitado en caso de resultar ganador del sorteo.</li>

    </ul>

    <p>

      Muchas gracias por apoyar esta actividad organizada por

      <strong>SEDIPRO UNT</strong>.

    </p>

    <br>

    <p>

      Área TI

      <br>

      Crown Night 2026

    </p>

  `;
}


