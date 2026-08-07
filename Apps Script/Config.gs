/*
Config.gs: 
- Constantes del proyecto (nombres de hojas, columnas, estados, prefijos, etc.).
*/

/**
 * ----------------------------------------------------------
 * PROYECTO
 * ----------------------------------------------------------
 */

const PROJECT = {
  NAME: "Crown Night Sedipro 2026",
  VERSION: "1.0.0",
  AUTHOR: "Área TI - SEDIPRO UNT"
};

/**
 * ----------------------------------------------------------
 * IMÁGENES
 * ----------------------------------------------------------
 */

const IMAGES = {

  LOGO_CROWN:
    "https://...",

  LOGO_SEDIPRO:
    "https://...",

  BANNER:
    "https://..."

};

/**
 * ----------------------------------------------------------
 * HOJAS
 * ----------------------------------------------------------
 */

const SHEETS = {
  RESPUESTAS: "RESPUESTAS"
};

/**
 * ----------------------------------------------------------
 * ESTADOS
 * ----------------------------------------------------------
 */

const STATUS = {
  PAYMENT: {
    PENDING: "Pendiente",
    PAID: "Pagado",
    CANCELED: "Anulado"
  },
  EMAIL: {
    PENDING: "Pendiente",
    SENT: "Enviado",
    ERROR: "Error"
  }
};

/**
 * ----------------------------------------------------------
 * ÁREAS
 * ----------------------------------------------------------
 */

const AREAS = {
  "PMO": "PMO",
  "GTH": "GTH",
  "LTK & FNZ": "LTK",
  "MKT": "MKT",
  "TI": "TI"
};

/**
 * ----------------------------------------------------------
 * CANDIDATOS
 * ----------------------------------------------------------
 */

const CANDIDATES = {
  "Miss": "MS",
  "Mister": "MR"
};

/**
 * ----------------------------------------------------------
 * CÓDIGO
 * ----------------------------------------------------------
 */

const CODE = {
  DIGITS: 4,
  SEPARATOR: "-"
};

/**
 * ----------------------------------------------------------
 * COLUMNAS
 * ----------------------------------------------------------
 */
const COLUMNS = {
  TIMESTAMP: 1,
  LASTNAME: 2,
  NAME: 3,
  PHONE: 4,
  AREA: 5,
  CANDIDATE: 6,
  EMAIL: 7,
  CODE: 8,
  QR: 9,
  SENT_DATE: 10,
  PAYMENT: 11,
  EMAIL_STATUS: 12,
  OBSERVATIONS: 13
};

/**
 * ----------------------------------------------------------
 * CORREOS
 * ----------------------------------------------------------
 */

const EMAIL = {
  SUBJECT: "🎟️ Tu Ticket Oficial - Crown Night Sedipro UNT 2026"
};

/**
 * ----------------------------------------------------------
 * CONFIGURACIÓN DEL SERVICIO QR
 * ----------------------------------------------------------
 */

const QR = {
  /**
   * URL base del servicio generador de códigos QR.
   */
  API_URL: "https://api.qrserver.com/v1/create-qr-code/",
  /**
   * Tamaño del QR.
   */
  SIZE: "250x250"
};



