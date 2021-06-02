/**
 * debug 기본 옵션 값 정의
 * @typedef defParams
 * @type {object}
 * @property {string} [prefix='[WMPO-DEBUG]']      prefix 문구
 * @property {string} [debugMode='development']         debug 모드 판단 처리용 boolean
 */
const defParams = () => {
  return {
    prefix: '[WMPO-DEBUG]',
    debugMode: process.env.REACT_APP_APP_ENV || 'development',
  };
};

const banner = (prefix = '', debugMode = '') => {
  const message = `%c ${prefix} - ${debugMode}`;
  const style = 'background: #ffff00; color: #ff0000; font-size: 15px;';
  console.log(message, style);
};

let instance;
class DebugController {
  /**
   * @hideconstructor
   * @param {object|defParams} options  defParams 값으로 기본값 설정
   * @memberof Debug
   */
  constructor(options) {
    if (instance) {
      return instance;
    }

    instance = this;

    const opts = { ...defParams(), ...options };
    const { prefix, debugMode } = opts;

    this.PREFIX = prefix;
    this.debugMode = debugMode;

    if (process.env.REACT_APP_APP_ENV !== 'production') {
      banner(this.PREFIX, this.debugMode);
    }
  }

  /**
   * 디버그 모드 유무
   * @returns {boolean}
   * @memberof Debug
   */
  isDebugMode() {
    if ((this.debugMode && this.debugMode === 'production') || process.env.REACT_APP_APP_ENV === 'production') {
      return false;
    }
    return true;
  }

  /**
   * error
   * @param {*} args
   * @memberof Debug
   * @see https://developer.mozilla.org/ko/docs/Web/API/Console/error
   */
  error(...args) {
    if (!this.isDebugMode()) {
      return;
    }

    args.unshift(this.PREFIX);

    Function.prototype.apply.call(console.error, console, args);
  }

  /**
   * info
   * @param {*} args
   * @memberof Debug
   * @see https://developer.mozilla.org/ko/docs/Web/API/Console/info
   */
  info(...args) {
    if (!this.isDebugMode()) {
      return;
    }

    args.unshift(this.PREFIX);

    Function.prototype.apply.call(console.info, console, args);
  }

  /**
   * log
   * @param {*} args
   * @memberof Debug
   * @see https://developer.mozilla.org/ko/docs/Web/API/Console/log
   */
  log(...args) {
    if (!this.isDebugMode()) {
      return;
    }

    args.unshift(this.PREFIX);

    Function.prototype.apply.call(console.log, console, args);
  }

  /**
   * warn
   * @param {*} warn
   * @memberof Debug
   * @see https://developer.mozilla.org/ko/docs/Web/API/Console/warn
   */
  warn(...args) {
    if (!this.isDebugMode()) {
      return;
    }

    args.unshift(this.PREFIX);

    Function.prototype.apply.call(console.warn, console, args);
  }

  /**
   * table
   * @param {object | array} data
   * @param {array} columns
   * @memberof Debug
   * @see https://developer.mozilla.org/ko/docs/Web/API/Console/table
   */
  table(data, columns = []) {
    if (!this.isDebugMode()) {
      return;
    }

    Function.prototype.apply.call(console.table, console, [data, columns]);
  }

  /**
   * trace
   * @param {*} label
   * @memberof Debug
   * @see https://developer.mozilla.org/ko/docs/Web/API/Console/trace
   */
  trace(...args) {
    if (!this.isDebugMode()) {
      return;
    }

    args.unshift(this.PREFIX);

    Function.prototype.apply.call(console.trace, console, args);
  }
}
export const Debug = new DebugController();
export default DebugController;
