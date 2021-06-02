import { Debug } from './Debug';

export const setCookies = (cookieName, value, days) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  const cookieValue = escape(value) + (days == null ? '' : `;expires=${exdate.toUTCString()}`);
  document.cookie = `${cookieName}=${cookieValue}`;
};

export const getCookies = cookieName => {
  let x;
  let y;
  const val = document.cookie.split(';');

  for (let i = 0; i < val.length; i += 1) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x === cookieName) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
};

export const deleteCookies = cookieName => {
  const temp = this.getCookie(cookieName);
  if (temp) {
    this.setCookie(cookieName, temp, new Date(1));
  }
};

export const getLocalStorage = name => {
  if (!name) {
    window.alert('localStorage Name 입력 필요.');
  } else {
    return JSON.parse(window.localStorage.getItem(name));
  }
};

export const setLocalStorage = (name, data) => {
  if (!name && !data) {
    alert('localStorage Name, Data 입력 필요.');
    return;
  }
  let setData;
  if (Array.isArray(data)) {
    const ls = getLocalStorage(name) || [];
    setData = [...ls, ...data];
    window.localStorage.setItem(name, JSON.stringify(setData));
    return;
  }
  const ls = getLocalStorage(name);
  setData = { ...ls, ...data };
  window.localStorage.setItem(name, JSON.stringify(setData));
};

export const removeLocalStorage = name => {
  if (!name) {
    window.localStorage.clear();
    return;
  }
  window.localStorage.removeItem(name);
};

export const getSessionStorage = name => {
  if (!name) {
    window.alert('sessionStorage Name 입력 필요.');
  } else {
    return JSON.parse(window.sessionStorage.getItem(name));
  }
};

export const setSessionStorage = (name, data) => {
  if (!name && !data) {
    alert('sessionStorage Name, Data 입력 필요.');
    return;
  }

  const ls = getSessionStorage(name);
  const setData = { ...ls, ...data };

  window.sessionStorage.setItem(name, JSON.stringify(setData));
};

export const removeSessionStorage = name => {
  if (!name) {
    window.sessionStorage.clear();
    return;
  }
  window.sessionStorage.removeItem(name);
};

export const getURLParmeterToObject = () => {
  return window.location.search
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((obj, pair) => {
      const [key, value] = pair.map(decodeURIComponent);
      if (!key || !value) {
        return null;
      }
      return { ...obj, [key]: value };
    }, {});
};

export const isMatchText = (regex, value) => {
  if (!regex) {
    Debug.error(`[isMatchText] regex pattern 이 들어오지 않았습니다.`);
    return false;
  }

  const regexPattern = new RegExp(regex);
  return regexPattern.test(value);
};

export const isPercentFormat = value => {
  if (!value) {
    Debug.error(`[isPercentFormat] ${value} 값이 없습니다.`);
    return false;
  }

  const regEx = /^(\d{1,3})(:?.)?(\d)?$/;
  return regEx.test(value);
};

export default {
  setCookies,
  getCookies,
  deleteCookies,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  getURLParmeterToObject,
  isMatchText,
  isPercentFormat,
};
