import { API } from 'library/API';
import { HOST_API } from 'Constans';

// 배너 관리 목록
export const getBannerList = param => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/banners`,
    params: param,
  };

  return API(request);
};

// 배너 상세 데이터
export const getBannerDetail = key => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/banners/{key}`,
    requestIds: {
      key,
    },
    params: { all: '1' },
  };

  return API(request);
};

// 배너 등록
export const insertBanner = data => {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: `${HOST_API}/banners`,
    data,
  };

  return API(request);
};

// 배너 수정
export const updateBanner = data => {
  const request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    url: `${HOST_API}/banners/{key}`,
    data,
    requestIds: {
      key: data.key,
    },
  };

  return API(request);
};

// 배너 삭제
export const deleteBanner = key => {
  const request = {
    method: 'DELETE',
    url: `${HOST_API}/banners/{key}`,
    requestIds: {
      key,
    },
  };

  return API(request);
};

// 배너 지역 설정 삭제

// 배너 지역 설정 전체 삭제

// 지역 설정 시 조회
export const getRegionSiList = () => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/regions`,
  };

  return API(request);
};
// 지역 설정 도군 조회
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
// 지역 설정 동 정보조회
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
  getBannerList,
  getBannerDetail,
  insertBanner,
  updateBanner,
  deleteBanner,
  getRegionSiList,
  getRegionDoGunList,
  getRegionDongList,
};
