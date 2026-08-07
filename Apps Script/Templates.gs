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
 * Construye el correo HTML completo del ticket.
 *
 * @param {Object} registro
 * @returns {string}
 */
function construirHTMLTicket(registro) {
  return `

<!DOCTYPE html>

<html>

${construirHeader()}

<body>

<div class="container">

${construirSaludo(registro)}

${construirInformacion(registro)}

${construirSeccionQR(registro)}

${construirAdvertencias()}

${construirFooter()}

</div>

</body>

</html>

`;
}

/**
 * Construye la cabecera HTML.
 *
 * @returns {string}
 */
function construirHeader() {

  return `

<head>

<meta charset="UTF-8">

<style>

body{

margin:0;

padding:0;

background:${COLORS.BACKGROUND};

font-family:Arial,Helvetica,sans-serif;

}

.container{

max-width:${LAYOUT.MAX_WIDTH};

margin:auto;

background:${COLORS.WHITE};

border-radius:${STYLES.BORDER_RADIUS};

overflow:hidden;

box-shadow:0 4px 18px rgba(0,0,0,.12);

}

</style>

</head>

`;

}

/**
 * Construye el encabezado visual del correo.
 *
 * @param {Object} registro
 * @returns {string}
 */
function construirSaludo(registro) {

  return `

<div
  style="
    background:${COLORS.PRIMARY};
    text-align:center;
    padding:40px 30px;
  "
>

  <img
    src="${IMAGES.LOGO_CROWN}"
    width="180"
    alt="Crown Night"
    style="margin-bottom:20px;"
  >

  <h1
    style="
      color:${COLORS.GOLD};
      margin:0;
      font-size:30px;
      letter-spacing:2px;
    "
  >

    UNA NOCHE PARA RECORDAR

  </h1>

  <p
    style="
      color:${COLORS.WHITE};
      margin-top:15px;
      font-size:17px;
      line-height:1.6;
    "
  >

    Ticket Oficial del Participante

  </p>

</div>

<div
  style="
    padding:35px 45px 10px;
  "
>

  <p
    style="
      font-size:18px;
      color:${COLORS.TEXT};
      margin:0;
    "
  >

    Hola <strong>${registro.nombres}</strong>,

  </p>

  <p
    style="
      margin-top:18px;
      color:${COLORS.TEXT_SECONDARY};
      line-height:1.8;
      font-size:15px;
    "
  >

    Gracias por formar parte de <strong>${PROJECT.NAME}</strong>.
    Tu registro ha sido validado correctamente y tu ticket oficial
    ya se encuentra disponible.

  </p>

</div>

`;
}

/**
 * Construye la tarjeta con la información del ticket.
 *
 * @param {Object} registro
 * @returns {string}
 */
function construirInformacion(registro) {

  return `

<div
  style="
    padding:0 45px 35px;
  "
>

  <div
    style="
      background:${COLORS.CARD};
      border:1px solid ${COLORS.BORDER};
      border-radius:${STYLES.BORDER_RADIUS};
      padding:30px;
    "
  >

    <h2
      style="
        margin-top:0;
        color:${COLORS.PRIMARY};
        text-align:center;
      "
    >

      Información del Ticket

    </h2>

    <table
      width="100%"
      cellpadding="8"
      cellspacing="0"
      style="
        border-collapse:collapse;
        font-size:15px;
      "
    >

      <tr>

        <td width="40%">

          <strong>Participante</strong>

        </td>

        <td>

          ${registro.nombres} ${registro.apellidos}

        </td>

      </tr>

      <tr>

        <td>

          <strong>Área apoyada</strong>

        </td>

        <td>

          ${registro.area}

        </td>

      </tr>

      <tr>

        <td>

          <strong>Candidato apoyado</strong>

        </td>

        <td>

          ${obtenerDescripcionCandidato(registro)}

        </td>

      </tr>

    </table>

    <div
      style="
        margin-top:30px;
        background:${COLORS.PRIMARY};
        color:${COLORS.GOLD};
        text-align:center;
        border-radius:${STYLES.BORDER_RADIUS};
        padding:18px;
      "
    >

      <div
        style="
          font-size:13px;
          letter-spacing:2px;
          color:${COLORS.WHITE};
        "
      >

        CÓDIGO OFICIAL

      </div>

      <div
        style="
          margin-top:10px;
          font-size:26px;
          font-weight:bold;
          letter-spacing:3px;
        "
      >

        ${registro.codigo}

      </div>

    </div>

  </div>

</div>

`;
}


/**
 * Construye la sección del código QR.
 *
 * @param {Object} registro
 * @returns {string}
 */
function construirSeccionQR(registro) {

  return `

<div
  style="
    padding:0 45px 40px;
  "
>

  <div
    style="
      background:${COLORS.WHITE};
      border:2px dashed ${COLORS.GOLD};
      border-radius:${STYLES.BORDER_RADIUS};
      text-align:center;
      padding:30px;
    "
  >

    <h2
      style="
        margin-top:0;
        color:${COLORS.PRIMARY};
      "
    >

      Tu Ticket Oficial

    </h2>

    <p
      style="
        color:${COLORS.TEXT_MUTED};
        line-height:1.7;
      "
    >

      Presenta este código QR únicamente si el comité
      organizador lo solicita durante el proceso del sorteo.

    </p>

    <img

      src="${construirURLQR(registro)}"

      width="230"

      style="margin:20px 0;"

    >

    <div
      style="
        font-size:22px;
        font-weight:bold;
        letter-spacing:2px;
        color:${COLORS.PRIMARY};
      "
    >

      ${registro.codigo}

    </div>

  </div>

</div>

`;

}

/**
 * Construye la sección de recomendaciones para el participante.
 *
 * @returns {string}
 */
function construirAdvertencias() {

  return `

<div
  style="
    padding:0 45px 35px;
  "
>

  <div
    style="
      background:${COLORS.WARNING};
      border-left:6px solid ${COLORS.GOLD};
      border-radius:${STYLES.BORDER_RADIUS};
      padding:25px;
    "
  >

    <h3
      style="
        margin-top:0;
        color:${COLORS.PRIMARY};
      "
    >

      ℹ Información importante

    </h3>

    <ul
      style="
        margin:0;
        padding-left:20px;
        line-height:1.9;
        color:${COLORS.TEXT_BODY};
      "
    >

      <li>Conserva este correo electrónico.</li>

      <li>No compartas tu código QR con otras personas.</li>

      <li>Cada ticket es único e intransferible.</li>

      <li>
        En caso de resultar ganador del sorteo,
        deberás presentar este ticket.
      </li>

    </ul>

  </div>

</div>

`;

}

/**
 * Construye el pie de página del correo.
 *
 * @returns {string}
 */
function construirFooter() {

  return `

<div
  style="
    background:${COLORS.PRIMARY};
    text-align:center;
    padding:35px;
  "
>

  <img

    src="${IMAGES.LOGO_SEDIPRO}"

    width="90"

    alt="SEDIPRO UNT"

    style="margin-bottom:18px;"

  >

  <p
    style="
      color:${COLORS.WHITE};
      margin:6px 0;
      font-size:15px;
    "
  >

    ${PROJECT.AUTHOR}

  </p>

  <p
    style="
      color:${COLORS.GOLD};
      margin:6px 0;
      font-size:16px;
      font-weight:bold;
    "
  >

    SEDIPRO UNT

  </p>

  <p
    style="
      color:${COLORS.WHITE};
      margin:6px 0;
      font-size:14px;
    "
  >

    ${PROJECT.NAME}

  </p>

  <p
    style="
      color:${COLORS.TEXT_LIGHT};
      margin-top:25px;
      font-size:12px;
    "
  >

    © ${new Date().getFullYear()} ${PROJECT.AUTHOR}

  </p>

</div>

`;
}


