/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { DefaultLayout } from 'components/templates';
import { Debug } from 'library/Debug';
import { fromJS } from 'immutable';
import { getSessionStorage } from 'library/Utils';
import { ArticleDetailForm } from './components/organisms';
import { getArticleDetail, insertArticle, updateArticle } from './api/article';

const ArticleDetailContainer = props => {
  const { location } = props;
  Debug.log(location);
  const manager = getSessionStorage('manager');
  const defArticle = {
    isAPICall: true,
    boardKey: location.state.key || '', // 게시판 key
    boardName: location.state.name || '', // 게시판 명
    articleID: location.state.articleID || '', // 게시글 ID
    loginID: '', // 업주 로그인 아이디
    companyID: '', // 업주 ID
    subject: '', // 제목
    header: '', // 머릿말
    content: '', // 내용
    score: '', // 점수
    orderNo: '', // 주문번호
    paymentDate: '', // 결제일시
    dealID: '', // 딜 ID
    storeID: '', // 매장 ID
    subjectTitle: '', // 후기 대상 타이틀
    subjectImageUrl: '', // 후기 대상 이미지 URL
    product: '', // 구매옵션
    memberID: manager.ID || '', // 작성자 아이디
    memberName: manager.name || '', // 작성자 이름
    memberEmail: '', // 작성자 이메일
    images: [], // 이미지
  };
  const [article, setArticle] = useState(fromJS(defArticle));
  const { isAPICall, articleID } = article.toJS();

  // 게시글 상세 조회 API
  const getArticleDetailAPI = async () => {
    const response = await getArticleDetail(article.toJS());

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        const newData = article.merge({ isAPICall: false }, data);
        setArticle(newData);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        setArticle(defArticle);
      }
    }
  };

  // 게시글 상세 등록 API
  const insertArticleAPI = async data => {
    const newData = data.set('images', data.get('imageUrl'));
    const response = await insertArticle(newData.toJS());

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        window.location.href = '/board/listArticle';
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  // 게시글 상세 수정 API
  const updateArticleAPI = async data => {
    const response = await updateArticle(data.toJS());

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        window.location.href = '/board/listArticle';
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };
  const saveArticleData = data => {
    if (data.paymentDate) {
      data.paymentDate += ' 00:00:00';
    }
    if (!articleID) {
      // 등록
      insertArticleAPI(data);
    } else {
      // 수정
      updateArticleAPI(data);
    }
  };

  // 수정 일때 게시글 상세정보 가져오기 무한 호출 방지
  if (isAPICall) {
    getArticleDetailAPI();
  }
  // articleID 가 없으면 등록 있으면 수정
  return (
    <DefaultLayout path={[{ name: '게시판 관리' }, { name: !articleID ? '게시글 등록' : '게시글 수정' }]}>
      <ArticleDetailForm article={article} saveArticleData={saveArticleData} />
    </DefaultLayout>
  );
};

export default ArticleDetailContainer;
