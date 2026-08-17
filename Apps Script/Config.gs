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
 * IMÁGENES DE CANDIDATOS
 * ----------------------------------------------------------
 */
const CANDIDATE_IMAGES = {
  "Miss PMO":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/miss/pmo-miss.webp",
  "Miss GTH":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/miss/gth-miss.webp",
  "Miss LTK & FNZ":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/miss/ltk-miss.webp",
  "Miss MKT":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/miss/mkt-miss.webp",
  "Miss TI":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/miss/ti-miss.webp",
  "Mister PMO":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/mister/pmo-mister.webp",
  "Mister GTH":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/mister/gth-mister.webp",
  "Mister LTK & FNZ":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/mister/ltk-mister.webp",
  "Mister MKT":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/mister/mkt-mister.webp",
  "Mister TI":
    "https://raw.githubusercontent.com/Anthony190801/crown-night-system/main/assets/candidatos/mister/ti-mister.webp"
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

