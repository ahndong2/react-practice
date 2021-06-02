import { API } from 'library/API';
import { HOST_API_DEVOPS } from 'Constans';

// 배포 현황 조회
export const getDeployHistory = data => {
  const request = {
    method: 'GET',
    url: `${HOST_API_DEVOPS}/deploy/history`,
    params: data,
  };

  return API(request);
};

// 배포 페이지 조회
export const getDeployList = data => {
  const request = {
    method: 'GET',
    url: `${HOST_API_DEVOPS}/deploy/deploy`,
    params: data,
  };

  return API(request);
};

// 배포 실행
export const setDeployMerge = data => {
  const request = {
    method: 'PUT',
    url: `${HOST_API_DEVOPS}/deploy/merge`,
    data,
  };

  return API(request);
};

// 서버 그룹 추가 / 수정
export const setServerGroup = data => {
  const url = data.serverGroupID ? '/deploy/server-groups/{serverGroupID}' : '/deploy/server-groups';
  const method = data.serverGroupID ? 'PUT' : 'POST';
  const request = {
    method,
    url: HOST_API_DEVOPS + url,
    data,
    requestIds: {
      serverGroupID: data.serverGroupID,
    },
  };

  return API(request);
};

// 서버 그룹 제거
export const deleteServerGroup = serverGroupID => {
  const request = {
    method: 'DELETE',
    url: `${HOST_API_DEVOPS}/deploy/server-groups/{serverGroupID}`,
    requestIds: {
      serverGroupID,
    },
  };

  return API(request);
};

// 서버 그룹 상세
export const getServerGroupDetail = serverGroupID => {
  const request = {
    method: 'GET',
    url: `${HOST_API_DEVOPS}/deploy/server-groups/{serverGroupID}/detail`,
    requestIds: {
      serverGroupID,
    },
    params: serverGroupID,
  };

  return API(request);
};

// AWS 인스턴스목록
export const getInstanceList = data => {
  const request = {
    method: 'GET',
    url: `${HOST_API_DEVOPS}/deploy/server-groups/{serverGroupID}/instances`,
    requestIds: {
      serverGroupID: data.serverGroupID,
    },
    params: data,
  };

  return API(request);
};

// 배포 결과 확인
export const getDeployResult = data => {
  const request = {
    method: 'GET',
    url: `${HOST_API_DEVOPS}/deploy/result`,
    params: data,
  };

  return API(request);
};

// 배포 브랜치 리스트
export const getBranchList = serverGroupID => {
  const request = {
    method: 'GET',
    url: `${HOST_API_DEVOPS}/deploy/server-groups/{serverGroupID}/branch`,
    requestIds: {
      serverGroupID,
    },
  };

  return API(request);
};

// 배포 브랜치추가
export const addBranchList = data => {
  const request = {
    method: 'POST',
    url: `${HOST_API_DEVOPS}/deploy/server-groups/{serverGroupID}/branch`,
    requestIds: {
      serverGroupID: data.serverGroupID,
    },
    data,
  };

  return API(request);
};

// 배포 브랜치 제거
export const deleteBranchList = data => {
  const request = {
    method: 'DELETE',
    url: `${HOST_API_DEVOPS}/deploy/server-groups/{serverGroupID}/branch`,
    requestIds: {
      serverGroupID: data.serverGroupID,
    },
    data,
  };

  return API(request);
};

// 배포 브랜치 순서 변경
export const branchListChange = data => {
  const request = {
    method: 'PUT',
    url: `${HOST_API_DEVOPS}/deploy/server-groups/{serverGroupID}/branch`,
    requestIds: {
      serverGroupID: data.serverGroupID,
    },
    data,
  };

  return API(request);
};

// 롤백
export const setDeployRollback = data => {
  const request = {
    method: 'POST',
    url: `${HOST_API_DEVOPS}/deploy/rollback`,
    data,
  };

  return API(request);
};
export default {
  getDeployHistory,
  getDeployList,
  setDeployMerge,
  setServerGroup,
  deleteServerGroup,
  getServerGroupDetail,
  getInstanceList,
  getDeployResult,
  getBranchList,
  addBranchList,
  deleteBranchList,
  branchListChange,
  setDeployRollback,
};
