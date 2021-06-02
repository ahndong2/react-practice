import { API } from 'library/API';
import { HOST_API } from 'Constans';

// 시 조회
export const getRegionSiList = () => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/regions`,
  };

  return API(request);
};
// 도군 조회
export const getRegionDoGunList = siCode => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/regions/{siCode}`,
    requestIds: {
      siCode,
    },
  };

  return API(request);
};
// 동 정보조회
export const getRegionDongList = (siCode, gugunCode) => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/regions/{siCode}/{gugunCode}`,
    requestIds: {
      siCode,
      gugunCode,
    },
  };

  return API(request);
};
export default {
  getRegionSiList,
  getRegionDoGunList,
  getRegionDongList,
};
