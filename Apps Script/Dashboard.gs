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
  const hoja = SpreadsheetApp.getActiveSpreadsheet()
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
  const datos = hoja.getRange(2,1,ultimaFila - 1,COLUMNS.OBSERVATIONS).getValues();

  return procesarDatosDashboard(datos);
}


/**
 * ----------------------------------------------------------
 * PROCESAMIENTO PRINCIPAL
 * ----------------------------------------------------------
 */

/**
 * Procesa las filas de la hoja y genera
 * todas las estadísticas del Dashboard.
 *
 * Cada registro pertenece a una única categoría:
 *
 * 1. Válido:
 *    Pagado + Enviado
 *
 * 2. Pendiente:
 *    Pagado + Pendiente
 *
 * 3. Incidencia:
 *    Pagado + Error
 *
 * 4. Pago pendiente:
 *    Pendiente + cualquier estado de correo
 *
 * @param {Array<Array>} datos
 * @returns {Object}
 */
function procesarDatosDashboard(datos) {
  const resumen = {
    totalRegistros: 0,
    // Estado de votación
    votosValidos: 0,
    pendientes: 0,
    incidencias: 0,
    pagosPendientes: 0,
    // Indicadores adicionales
    pagosValidados: 0,
    ticketsEnviados: 0,
    porcentajeEnvio: 0,
    // Control de datos
    registrosEstadoDesconocido: 0
  };
  const miss = inicializarCandidatos("Miss");
  const mister = inicializarCandidatos("Mister");
  const porArea = inicializarAreas();
  /**
   * --------------------------------------------------------
   * RECORRIDO DE REGISTROS
   * --------------------------------------------------------
   */
  datos.forEach(fila => {
    resumen.totalRegistros++;

    const area = fila[COLUMNS.AREA - 1];
    const candidato = fila[COLUMNS.CANDIDATE - 1];
    const estadoPago = fila[COLUMNS.PAYMENT - 1];
    const estadoCorreo = fila[COLUMNS.EMAIL_STATUS - 1];
    /**
     * ------------------------------------------------------
     * CLASIFICACIÓN DEL REGISTRO
     * ------------------------------------------------------
     */
    const pagoPendiente =
      estadoPago === STATUS.PAYMENT.PENDING;
    const pagoValidado =
      estadoPago === STATUS.PAYMENT.PAID;
    const correoPendiente =
      estadoCorreo === STATUS.EMAIL.PENDING;
    const correoEnviado =
      estadoCorreo === STATUS.EMAIL.SENT;
    const correoError =
      estadoCorreo === STATUS.EMAIL.ERROR;
    /**
     * ------------------------------------------------------
     * 1. PAGO PENDIENTE
     * ------------------------------------------------------
     *
     * Si todavía no se ha validado el pago,
     * el registro pertenece exclusivamente
     * a esta categoría.
     */
    if (pagoPendiente) {
      resumen.pagosPendientes++;
      return;
    }
    /**
     * ------------------------------------------------------
     * A PARTIR DE AQUÍ EL PAGO ESTÁ VALIDADO
     * ------------------------------------------------------
     */
    if (pagoValidado) {
      resumen.pagosValidados++;
      /**
       * ----------------------------------------------------
       * 2. VOTO VÁLIDO
       * ----------------------------------------------------
       */
      if (correoEnviado) {
        resumen.votosValidos++;
        resumen.ticketsEnviados++;
        registrarVotoDashboard(
          candidato,
          area,
          miss,
          mister,
          porArea
        );
        return;
      }
      /**
       * ----------------------------------------------------
       * 3. PENDIENTE
       * ----------------------------------------------------
       *
       * Pago validado pero todavía no enviado.
       */
      if (correoPendiente) {
        resumen.pendientes++;
        return;
      }
      /**
       * ----------------------------------------------------
       * 4. INCIDENCIA
       * ----------------------------------------------------
       *
       * Pago validado pero el envío presentó error.
       */
      if (correoError) {
        resumen.incidencias++;
        return;
      }
    }
    /**
     * ------------------------------------------------------
     * ESTADO NO CONTEMPLADO
     * ------------------------------------------------------
     *
     * Si aparece una combinación desconocida,
     * no la clasificamos artificialmente.
     */
    resumen.registrosEstadoDesconocido++;
  });
  /**
   * --------------------------------------------------------
   * INDICADORES PÚBLICOS
   * --------------------------------------------------------
   *
   * Los votos de Miss y Mister se calculan a partir
   * de las estadísticas consolidadas por área.
   */
  resumen.votosMiss =
    Object.values(porArea)
      .reduce(
        (total, area) => total + area.miss,
        0
      );
  resumen.votosMister =
    Object.values(porArea)
      .reduce(
        (total, area) => total + area.mister,
        0
      );
  /**
   * --------------------------------------------------------
   * PORCENTAJE DE ENVÍO
   * --------------------------------------------------------
   *
   * Indicador operativo interno.
   *
   * Representa qué porcentaje de los pagos validados
   * terminó convirtiéndose en votos válidos.
   */
  resumen.porcentajeEnvio =
    resumen.pagosValidados > 0
      ? (resumen.votosValidos / resumen.pagosValidados) * 100
      : 0;
  /**
   * --------------------------------------------------------
   * RANKING
   * --------------------------------------------------------
   */
  const rankingMiss = construirRanking(miss);
  const rankingMister = construirRanking(mister);
  /**
   * --------------------------------------------------------
   * RESULTADO FINAL
   * --------------------------------------------------------
   */
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
 * ----------------------------------------------------------
 * REGISTRO DE VOTO VÁLIDO
 * ----------------------------------------------------------
 */

/**
 * Registra un voto válido en las estructuras
 * correspondientes de candidato y área.
 *
 * @param {string} candidato
 * @param {string} area
 * @param {Object} miss
 * @param {Object} mister
 * @param {Object} porArea
 */
function registrarVotoDashboard(candidato,area,miss,mister,porArea) {
  
  const nombreCandidato =`${candidato} ${area}`;
  /**
   * --------------------------------------------------------
   * CANDIDATO
   * --------------------------------------------------------
   */
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
  /**
   * --------------------------------------------------------
   * ÁREA
   * --------------------------------------------------------
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

/**
 * ----------------------------------------------------------
 * CANDIDATOS
 * ----------------------------------------------------------
 */

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
 * ----------------------------------------------------------
 * ESTADÍSTICAS POR ÁREA
 * ----------------------------------------------------------
 */

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
 * ----------------------------------------------------------
 * RANKING
 * ----------------------------------------------------------
 */

/**
 * Construye un ranking ordenado por cantidad
 * de votos descendente.
 *
 * @param {Object} candidatos
 * @returns {Array<Object>}
 */
function construirRanking(candidatos) {

  return Object.values(candidatos).sort((a, b) => b.votos - a.votos)
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
 * ----------------------------------------------------------
 * DASHBOARD VACÍO
 * ----------------------------------------------------------
 */

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

  const porArea =inicializarAreas();

  return {
    resumen: {
      totalRegistros: 0,
      // Indicadores públicos
      votosValidos: 0,
      votosMiss: 0,
      votosMister: 0,
      // Estado de votación
      pendientes: 0,
      incidencias: 0,
      pagosPendientes: 0,
      // Indicadores adicionales
      pagosValidados: 0,
      ticketsEnviados: 0,
      porcentajeEnvio: 0,
      // Control de datos
      registrosEstadoDesconocido: 0
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

