import { API } from 'library/API';
import { HOST_API } from 'Constans';

// 사이트홈 뷰 조회
export const getSiteHomeViewList = serviceType => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/site-home/${serviceType}`,
  };

  return API(request);
};

// 사이트홈 뷰 등록
export const insertSiteHomeViewList = (serviceType, data) => {
  const request = {
    method: 'POST',
    url: `${HOST_API}/site-home/${serviceType}`,
    data: { item: data },
  };

  return API(request);
};

// 사이트홈 뷰 저장
export const setSiteHomeViewList = (serviceType, data) => {
  const request = {
    method: 'PUT',
    url: `${HOST_API}/site-home/${serviceType}`,
    data: { items: data },
  };

  return API(request);
};
export default {
  getSiteHomeViewList,
  setSiteHomeViewList,
};
