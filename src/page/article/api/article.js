import { API, setFromData } from 'library/API';
import { HOST_API } from 'Constans';
import { Debug } from 'library/Debug';

// 게시글 조회
export const getArticleList = param => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/articles`,
    params: param,
  };

  return API(request);
};

// 게시글 상세
export const getArticleDetail = param => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/boards/{boardKey}/articles/{articleID}`,
    requestIds: {
      boardKey: param.boardKey,
      articleID: param.articleID,
    },
    params: { noMasking: 1 },
  };

  return API(request);
};

// 게시글 등록
export const insertArticle = param => {
  const request = {
    method: 'POST',
    url: `${HOST_API}/boards/{boardKey}/articles`,
    requestIds: {
      boardKey: param.boardKey,
    },
    data: setFromData(param),
  };
  return API(request);
};

// 게시글 수정
export const updateArticle = param => {
  Debug.log(param);
  const request = {
    method: 'PUT',
    url: `${HOST_API}/boards/{boardKey}/articles/{articleID}`,
    requestIds: {
      boardKey: param.boardKey,
      articleID: param.articleID,
    },
    data: setFromData(param),
  };
  return API(request);
};

// 게시글 삭제
export const deleteArticle = param => {
  const request = {
    method: 'DELETE',
    url: `${HOST_API}/boards/{boardKey}/articles/{articleID}`,
    requestIds: {
      boardKey: param.boardKey,
      articleID: param.articleID,
    },
  };
  return API(request);
};

// 게시글 노출 상태변경
export const setArticleDisplayChange = param => {
  const request = {
    method: 'PUT',
    url: `${HOST_API}/boards/{boardKey}/articles/{articleID}/display`,
    requestIds: {
      boardKey: param.boardKey,
      articleID: param.articleID,
    },
    data: setFromData(param),
  };
  return API(request);
};

// 코멘트 조회
export const getCommentList = param => {
  const request = {
    method: 'GET',
    url: `${HOST_API}/boards/{boardKey}/articles/{articleID}/comments`,
    requestIds: {
      boardKey: param.boardKey,
      articleID: param.articleID,
    },
    params: { ...param, showAll: 1 },
  };
  return API(request);
};

// 코멘트 등록
export const insertComment = (param, data) => {
  const request = {
    method: 'POST',
    url: `${HOST_API}/boards/{boardKey}/articles/{articleID}/comments`,
    requestIds: {
      boardKey: param.boardKey,
      articleID: param.articleID,
    },
    data: setFromData(data),
  };
  return API(request);
};

// 코멘트 수정
export const updateComment = (param, data) => {
  const request = {
    method: 'PUT',
    url: `${HOST_API}/boards/{boardKey}/articles/{articleID}/comments/{commentID}`,
    requestIds: {
      boardKey: param.boardKey,
      articleID: param.articleID,
      commentID: data.commentID,
    },
    data: setFromData(data),
  };
  return API(request);
};

// 코멘트 삭제
export const deleteComment = (param, data) => {
  const request = {
    method: 'DELETE',
    url: `${HOST_API}/boards/{boardKey}/articles/{articleID}/comments/{commentID}`,
    requestIds: {
      boardKey: param.boardKey,
      articleID: param.articleID,
      commentID: data.commentID,
    },
    params: { memberID: data.memberID },
  };
  return API(request);
};

// 코멘트 노출상태 변경
export const setCommentDisplayChange = (param, data) => {
  const request = {
    method: 'PUT',
    url: `${HOST_API}/boards/{boardKey}/articles/{articleID}/comments/{commentID}/display`,
    requestIds: {
      boardKey: param.boardKey,
      articleID: param.articleID,
      commentID: data.commentID,
    },
    data: setFromData(data),
  };
  return API(request);
};

export default {
  getArticleList,
  getArticleDetail,
  insertArticle,
  updateArticle,
  deleteArticle,
  setArticleDisplayChange,
  getCommentList,
  insertComment,
  updateComment,
  deleteComment,
  setCommentDisplayChange,
};
