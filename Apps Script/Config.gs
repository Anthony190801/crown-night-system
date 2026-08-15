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
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/logos/logo-crown.png",

  LOGO_SEDIPRO:
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/logos/logo-sedipro.png",

  BANNER:
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/banners/banner-email.jpeg"

};

/**
 * ----------------------------------------------------------
 * COLORES
 * ----------------------------------------------------------
 */

const COLORS = {
  PRIMARY: "#1B1B2F",
  GOLD: "#D4AF37",
  BACKGROUND: "#F5F5F5",
  CARD: "#FAFAFA",
  WARNING: "#FFF8E7",
  WHITE: "#FFFFFF",
  TEXT: "#333333",
  TEXT_BODY:"#444444",
  TEXT_SECONDARY: "#555555",
  TEXT_MUTED:"#666666",
  TEXT_LIGHT: "#BBBBBB",
  BORDER: "#E5E5E5"
};

/**
 * ----------------------------------------------------------
 * ESTILOS
 * ----------------------------------------------------------
 */

const STYLES = {

  BORDER_RADIUS: "12px"

};

/**
 * ----------------------------------------------------------
 * LAYOUT
 * ----------------------------------------------------------
 */

const LAYOUT = {

  MAX_WIDTH: "650px"

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
  SUBJECT: "Tu Ticket Oficial - Crown Night Sedipro UNT 2026"
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



