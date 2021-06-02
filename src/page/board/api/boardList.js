import { API, setFromData } from 'library/API';
import { HOST_API } from 'Constans';

// 게시판 조회
export const getBoardList = param => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/boards`,
    params: param,
  };

  return API(request);
};

// 게시판 등록
export const insertBoard = data => {
  const form = setFromData(data);
  const request = {
    method: 'POST',
    url: `${HOST_API}/boards`,
    data: form,
  };

  return API(request);
};

// 게시판 수정
export const updateBoard = data => {
  const form = setFromData(data);
  const request = {
    method: 'PUT',
    url: `${HOST_API}/boards/${data.key}`,
    data: form,
  };

  return API(request);
};

// 게시판 삭제
export const deleteBoard = key => {
  const request = {
    method: 'DELETE',
    url: `${HOST_API}/boards/${key}`,
  };

  return API(request);
};

export default {
  getBoardList,
  insertBoard,
  updateBoard,
  deleteBoard,
};
