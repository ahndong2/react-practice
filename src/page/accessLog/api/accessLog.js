import { API } from 'library/API';
import { HOST_API } from 'Constans';

// 지역 설정 동 정보조회
export const getAccessLogList = () => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/admin/logs`,
  };

  return API(request);
};
export default {
  getAccessLogList,
};
