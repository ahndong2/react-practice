import axios from 'axios';
import { Cookies } from 'react-cookie';
import store from 'store';
import { spinnerAction } from 'store/reducer';
import { APP_ENV, HOST_API_DEVOPS } from 'Constans';
import { Debug } from './Debug';

/**
 * api 기본 옵션 값 정의
 * @typedef defParams
 * @type {object}
 * @property {string} [method='GET']
 * @property {string} [url=''] baseURL/pathName
 * @property {object} [data={}] data , queryParmeter
 * @property {function} [callback=()]
 */
const defParams = () => {
  return {
    method: 'GET',
    url: '',
    spinner: true,
  };
};

/**
 * api 호출 axios
 * @param {object} param
 */
export const API = async param => {
  const cookies = new Cookies();
  if (!cookies.get('token')) {
    window.alert('token이 없습니다. 다시 로그인 하세요.');
    window.location.href = HOST_API_DEVOPS;
    return;
  }
  // Request Data 가공
  let response;

  const opts = {
    ...defParams(),
    ...param,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      token: cookies.get('token'),
      ...param.headers,
    },
    url: parsedRequestIdsInUrl(param),
  };

  Debug.log('[request API]: ', opts);

  // 2020.2.24 token 임시 갱신
  let domain;
  if (APP_ENV === 'development') {
    domain = `.${window.location.hostname}`;
  } else {
    const hostName = window.location.hostname.split('.');
    hostName.splice(0, 1);
    domain = hostName.join('.');
  }

  const expiresRefreshTime = new Date(new Date().getTime() + 1 * 3600 * 1000);
  cookies.set('token', cookies.get('token'), {
    domain,
    expires: expiresRefreshTime,
    path: '/',
  });

  try {
    if (opts.spinner) {
      // spinner 시작
      store.dispatch(spinnerAction.setSpinner(true));
    }

    response = await axios(opts);
  } catch (error) {
    Debug.log('[response API error]: ', error);
  } finally {
    Debug.log('[response API]: ', response);
    if (opts.spinner) {
      // spinner 종료
      store.dispatch(spinnerAction.setSpinner(false));
    }
  }
  return response;
};

// 고려
export const multipleAPI = async param => {
  let response;
  try {
    // spinner 시작
    store.dispatch(spinnerAction.setSpinner(true));

    // Promise.all

    Debug.log('[response API]: ', response);
  } catch (error) {
    Debug.log('[response API]: error');
    response = {
      ...error,
      __isError: true,
    };
  } finally {
    // spinner 종료
    store.dispatch(spinnerAction.setSpinner(false));
  }
  return response;
};

export const request = {
  get: async (url, params) => {
    const requestData = {
      method: 'GET',
      url,
      params,
    };

    const response = await API(requestData)
      .then(response => response)
      .catch(e => {
        Debug.error(`${url} 경로에 GET 호출시 오류가 발생했습니다. params: ${JSON.stringify(params)}, error: ${e}`);
      });
    return response;
  },
  post: (url, data) => {
    const requestData = {
      method: 'POST',
      url,
      data: setFromData(data),
    };

    return API(requestData)
      .then(response => response)
      .catch(e => {
        Debug.error(`${url} 경로에 POST 호출시 오류가 발생했습니다. data: ${requestData.data}, error: ${e}`);
      });
  },
  put: async (url, data) => {
    const requestData = {
      method: 'PUT',
      url,
      data: setFromData(data),
    };

    const response = await API(requestData)
      .then(response => response)
      .catch(e => {
        Debug.error(`${url} 경로에 PUT 호출시 오류가 발생했습니다. data: ${requestData.data}, error: ${e}`);
      });
    return response;
  },
  delete: async url => {
    const requestData = {
      method: 'DELETE',
      url,
    };

    const response = await API(requestData)
      .then(response => response)
      .catch(e => {
        Debug.error(`${url} 경로에 DELETE 호출시 오류가 발생했습니다. error: ${e}`);
      });
    return response;
  },
};

/**
 * api url 의 문자열과 reqeuestIds 의 값을 매칭하여, 실제 호출할 api url 을 반환
 * @param {object} options
 * @param {string} options.url
 * @param {object} options.requestIds
 * @example
 *  const url = '/product/{productId}/wish';
 *  const requestIds = {
 *    productId: 'p1234'
 *  };
 *  const parsedUrl = parsedRequestIdsInUrl({ url, requestIds });
 *  console.log(parsedUrl); // '/product/p1234/wish'
 */
export const parsedRequestIdsInUrl = ({ url, requestIds }) => {
  let parsedUrl = url;

  if (!requestIds) {
    return parsedUrl;
  }

  Object.keys(requestIds).forEach(key => {
    const value = requestIds[key];
    parsedUrl = parsedUrl.replace(RegExp(`\\{${key}\\}`, 'g'), value);
  });

  return parsedUrl;
};

/**
 * api data 의 request 형태가 fromData 일때 사용
 * @param {object} data
 */
export const setFromData = (obj, prefix) => {
  const str = [];
  let p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? `${prefix}[${p}]` : p;
      const v = obj[p];
      str.push(
        v !== null && typeof v === 'object' ? setFromData(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
      );
    }
  }
  return str.join('&');
};

/**
 * axios option 값 반환 - 유효한 값 체크 필요 - progress 만 우선 처리
 * @see https://axios.nuxtjs.org/options
 * @see https://gitlab.wonders.work/media/wshop/all/issues/381
 * @todo jsdoc 작성
 */
export const getAxiosOptions = ({ api }) => {
  const { axiosOptions } = api;
  // @see https://axios.nuxtjs.org/options
  const allowOptions = {
    progress: Boolean,
  };
  const options = {};

  Object.keys(axiosOptions || {}).forEach(key => {
    if (allowOptions.hasOwnProperty(key)) {
      if (typeof allowOptions[key]() === typeof axiosOptions[key]) {
        options[key] = axiosOptions[key];
      }
    }
  });

  return options;
};

/**
 * @todo jsdoc 작성
 * version 관리할때 사용
 */
export const getRequestUrl = ({ api, requestIds }) => {
  const { API_TYPE, url, ver } = api;
  const parsedUrl = parsedRequestIdsInUrl({ url, requestIds });
  const API_URL = process.env.apiURI[API_TYPE];

  // TEST
  // let API_URL = process.env.apiURI[API_TYPE];
  // const { NODE_ENV } = process.env;
  // if (['development'].includes(NODE_ENV)) {
  //   API_URL = 'https://api.pre.wonder-shopping.com/v1';
  // }

  if (!API_URL) {
    return parsedUrl;
  }

  return `${API_URL.replace('/v1', '')}/${ver}${parsedUrl}`;
};

export const isSuccess = response => {
  if (response) {
    if (response.data) {
      if (response.data.result.code === 1) {
        return true;
      }
      Debug.error(
        `서버작업에 오류가 있습니다. url: ${response.url}, method: ${response.method}, data: ${response.data}`,
      );
      return false;
    }
    Debug.error(`response.data 가 전달되지 않았습니다. response.data: ${response.data}`);
  } else {
    Debug.error(`response 가 전달되지 않았습니다. response: ${response}`);
  }
  Debug.error(`서버 응답이 없습니다. url: ${response.url}, method: ${response.method}`);
  return false;
};

const responseSuccess = response => {
  return { success: true, response };
};

const responseFail = response => {
  return { success: false, response };
};

// TODO: 여기 정리되면 isSuccess 대체 + API.get 등등에 적용.
export const returnAPIResponse = async (APIMethod, ...allParams) => {
  let response = null;
  try {
    response = await APIMethod(...allParams);
  } catch (e) {
    Debug.error(e);
    return responseFail(response);
  }

  // 필수값 없이 API 호출했을 때
  if (!response) {
    return responseFail(response);
  }

  // 데이터는 가져왔는데 오류가 있을 경우
  if (response.data) {
    if (response.data.result.code === 1) {
      return responseSuccess(response);
    }

    Debug.error(response.data.result.message);
    return responseFail(response);
  }

  // 서버에러
  return responseFail(response);
};

export default {
  API,
  request,
  parsedRequestIdsInUrl,
  getRequestUrl,
  // getRequestWrapper,
  getAxiosOptions,
  setFromData,
  isSuccess,
  returnAPIResponse,
};

// export default API;
