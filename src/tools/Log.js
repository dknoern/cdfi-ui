export const LOG_LEVEL = Object.freeze({
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
});

const nopLogger = {
  log() {},
  warn() {},
  error() {},
};

let logger;
let level;

export class Log {
  static reset() {
    level = LOG_LEVEL.INFO;
    logger = nopLogger;
  }

  static get level() {
    return level;
  }

  static set level(value) {
    level = value;
  }

  static get logger() {
    return logger;
  }

  static set logger(value) {
    logger = value;
  }

  static log(...args) {
    if (level >= LOG_LEVEL.INFO) {
      logger.log(...Array.from(args));
    }
  }

  static warn(...args) {
    if (level >= LOG_LEVEL.WARN) {
      logger.warn(...Array.from(args));
    }
  }

  static error(...args) {
    if (level >= LOG_LEVEL.ERROR) {
      logger.error(...Array.from(args));
    }
  }
}

Log.reset();
