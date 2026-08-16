/*
Dashboard.gs:
- Motor de estadísticas y datos del Dashboard web.
*/

/**
 * ----------------------------------------------------------
 * MÓDULO: Dashboard
 * Archivo: Dashboard.gs
 * Proyecto: Crown Night Sedipro 2026
 * Autor: Área TI - SEDIPRO UNT
 * ----------------------------------------------------------
 * Descripción:
 * Procesa los registros de participantes y construye
 * las estadísticas necesarias para el Dashboard web.
 * ----------------------------------------------------------
 */


/**
 * Obtiene todos los datos necesarios para el Dashboard.
 *
 * Un voto es considerado válido únicamente cuando:
 *
 * Pago = Pagado
 * Y
 * Correo = Enviado
 *
 * @returns {Object}
 */
function obtenerDatosDashboard() {
  const hoja = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.RESPUESTAS);

  if (!hoja) {
    throw new Error(
      `No se encontró la hoja "${SHEETS.RESPUESTAS}".`
    );
  }
  const ultimaFila = hoja.getLastRow();

  if (ultimaFila <= 1) {
    return construirDashboardVacio();
  }
  const datos = hoja
    .getRange(2,1,ultimaFila - 1,COLUMNS.OBSERVATIONS)
    .getValues();

  return procesarDatosDashboard(datos);
}


/**
 * Procesa las filas de la hoja y genera
 * todas las estadísticas del Dashboard.
 *
 * @param {Array<Array>} datos
 * @returns {Object}
 */
function procesarDatosDashboard(datos) {

  const resumen = {
    totalRegistros: 0,
    pagosPendientes: 0,
    pagosValidados: 0,
    votosValidos: 0,
    ticketsPendientes: 0,
    enviosError: 0,
    votosEnProceso: 0,
    porcentajeEnvio: 0
  };
  const miss = inicializarCandidatos("Miss");
  const mister = inicializarCandidatos("Mister");
  const porArea = inicializarAreas();


  datos.forEach(fila => {
    resumen.totalRegistros++;

    const area = fila[COLUMNS.AREA - 1];
    const candidato = fila[COLUMNS.CANDIDATE - 1];
    const estadoPago = fila[COLUMNS.PAYMENT - 1];
    const estadoCorreo = fila[COLUMNS.EMAIL_STATUS - 1];
    /*
     * ------------------------------------------------------
     * ESTADO DEL PAGO
     * ------------------------------------------------------
     */
    if (estadoPago === STATUS.PAYMENT.PENDING) {
      resumen.pagosPendientes++;
    }
    if (estadoPago === STATUS.PAYMENT.PAID) {
      resumen.pagosValidados++;
    }
    /*
     * ------------------------------------------------------
     * ESTADO DEL CORREO
     * ------------------------------------------------------
     */
    if (estadoPago === STATUS.PAYMENT.PAID && estadoCorreo === STATUS.EMAIL.PENDING) {
      resumen.ticketsPendientes++;
    }
    if (estadoCorreo === STATUS.EMAIL.ERROR) {
      resumen.enviosError++;
    }
    /*
     * ------------------------------------------------------
     * VOTO VÁLIDO
     * ------------------------------------------------------
     */
    const votoValido =
      estadoPago === STATUS.PAYMENT.PAID &&
      estadoCorreo === STATUS.EMAIL.SENT;

    if (votoValido) {
      resumen.votosValidos++;
      /*
       * ----------------------------------------------------
       * CANDIDATO
       * ----------------------------------------------------
       */
      const nombreCandidato =`${candidato} ${area}`;

      if (candidato === "Miss") {
        if (miss[nombreCandidato]) {
          miss[nombreCandidato].votos++;
        }
      }
      if (candidato === "Mister") {
        if (mister[nombreCandidato]) {
          mister[nombreCandidato].votos++;
        }
      }
      /*
       * ----------------------------------------------------
       * ÁREA
       * ----------------------------------------------------
       */
      if (porArea[area]) {
        porArea[area].votos++;

        if (candidato === "Miss") {
          porArea[area].miss++;
        }
        if (candidato === "Mister") {
          porArea[area].mister++;
        }
      }
    }
  });
  /*
   * --------------------------------------------------------
   * VOTOS EN PROCESO
   * --------------------------------------------------------
   *
   * Representa registros que todavía no pueden
   * considerarse votos válidos.
   */
  resumen.votosEnProceso =resumen.totalRegistros - resumen.votosValidos;
  /*
   * --------------------------------------------------------
   * PORCENTAJE DE ENVÍO
   * --------------------------------------------------------
   */
  resumen.porcentajeEnvio = resumen.pagosValidados > 0 ? (resumen.votosValidos / resumen.pagosValidados) * 100 : 0;
  /*
   * --------------------------------------------------------
   * RANKING
   * --------------------------------------------------------
   */
  const rankingMiss = construirRanking(miss);
  const rankingMister = construirRanking(mister);

  return {
    resumen: resumen,
    miss: miss,
    mister: mister,
    porArea: porArea,
    ranking: {
      miss: rankingMiss,
      mister: rankingMister
    },
    actualizado: new Date().toISOString()
  };
}


/**
 * Inicializa la estructura de candidatos.
 *
 * @param {string} tipo "Miss" o "Mister"
 * @returns {Object}
 */
function inicializarCandidatos(tipo) {
  const resultado = {};

  Object.keys(AREAS).forEach(area => {
    const nombre =`${tipo} ${area}`;

    resultado[nombre] = {
      nombre: nombre,
      tipo: tipo,
      area: area,
      votos: 0,
      imagen: CANDIDATE_IMAGES[nombre] || ""
    };
  });
  return resultado;
}

/**
 * Inicializa las estadísticas por área.
 *
 * @returns {Object}
 */
function inicializarAreas() {
  const resultado = {};

  Object.keys(AREAS).forEach(area => {
    resultado[area] = {
      area: area,
      votos: 0,
      miss: 0,
      mister: 0
    };
  });
  return resultado;
}

/**
 * Construye un ranking ordenado por cantidad
 * de votos descendente.
 *
 * @param {Object} candidatos
 * @returns {Array<Object>}
 */
function construirRanking(candidatos) {
  return Object.values(candidatos)
    .sort((a, b) => b.votos - a.votos)
    .map((candidato, indice) => {
      return {
        posicion: indice + 1,
        nombre: candidato.nombre,
        tipo: candidato.tipo,
        area: candidato.area,
        votos: candidato.votos,
        imagen: candidato.imagen
      };
    });
}

/**
 * Construye una estructura vacía del Dashboard.
 *
 * Se utiliza cuando todavía no existen
 * respuestas del formulario.
 *
 * @returns {Object}
 */
function construirDashboardVacio() {
  const miss = inicializarCandidatos("Miss");
  const mister = inicializarCandidatos("Mister");
  const porArea = inicializarAreas();

  return {
    resumen: {
      totalRegistros: 0,
      pagosPendientes: 0,
      pagosValidados: 0,
      votosValidos: 0,
      ticketsPendientes: 0,
      enviosError: 0,
      votosEnProceso: 0,
      porcentajeEnvio: 0
    },
    miss: miss,
    mister: mister,
    porArea: porArea,
    ranking: {
      miss: construirRanking(miss),
      mister: construirRanking(mister)
    },
    actualizado: new Date().toISOString()
  };
}



