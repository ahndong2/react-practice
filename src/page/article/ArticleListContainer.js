/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DefaultLayout } from 'components/templates';
import { SearchForm } from 'components/organisms';
import { Pagination } from 'components/molecules';
import { fromJS } from 'immutable';
import { getArticleList } from './api/article';
import { ArticleListTable, CommentModal } from './components/organisms';
import styles from './components/organisms/Article.module.css';

const ArticleListContainer = props => {
  const { location } = props;
  let key;
  let defKeywordkey;
  let defKeywordvalue;
  if (location.state) {
    key = props.location.state.key;
    defKeywordkey = 'key';
    defKeywordvalue = key;
  }

  // 검색 parameter
  const [searchParam, setSearchParam] = useState(
    fromJS({
      isAPICall: true,
      boardKey: key || '',
      page: 1,
      limit: 20,
      totalItem: 0,
      keywordKey: defKeywordkey || 'companyID',
      keywordValue: defKeywordvalue || '',
    }),
  );
  const { isAPICall, page, limit, totalItem, keywordKey, keywordValue } = searchParam.toJS();

  // 게시글 목록
  const [articleList, setArticleList] = useState(fromJS([]));

  // 모달 show/hide
  const [modal, setModal] = useState(
    fromJS({
      show: false,
      key,
      articleID: '',
    }),
  );

  // 검색 폼 초기데이터
  const searchInfo = [
    {
      type: 'radio',
      id: 'keywordKey',
      value: keywordKey,
      options: [
        { label: '업주번호', value: 'companyID' },
        { label: '딜ID', value: 'dealID' },
        { label: '게시판 Key', value: 'key' },
        { label: '주문번호', value: 'orderNo' },
        { label: '제목', value: 'subject' },
        { label: '내용', value: 'content' },
        { label: '게시글 번호', value: 'articleID' },
      ],
    },
    {
      type: 'search',
      id: 'keywordValue',
      name: 'keywordValue',
      value: keywordValue,
    },
  ];

  // 검색 버튼 이벤트
  const onSearch = updateSearchParam => {
    if (Object.keys(updateSearchParam).length === 0) {
      window.alert('키워드를 입력해 주세요.');
    }

    const final = searchParam.merge(updateSearchParam, { page: 1, isAPICall: true });
    setSearchParam(final);
  };

  // 게시판 리스트 조회 API
  const searchArticleList = async param => {
    const response = await getArticleList(param);

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        const paging = response.data.paging || {
          current: 1,
          limit: 20,
          totalCount: 0,
        };

        // article list 추가
        setArticleList(data.article || []);
        const newData = searchParam.merge({
          isAPICall: false,
          page: paging.page,
          limit: paging.limit,
          totalItem: paging.totalCount,
        });

        setSearchParam(newData);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        setArticleList([]);
        const newData = searchParam.merge({
          isAPICall: false,
          totalItem: 0,
        });
        setSearchParam(newData);
      }
    }
  };

  // 게시판 모달 open/hide
  const showModal = (flag, key, articleID) => {
    if (flag === false) {
      const newData = searchParam.merge({
        isAPICall: true,
        totalItem: 0,
      });
      setSearchParam(newData);
    }
    // 모달 open/hide
    setModal({
      show: flag,
      key,
      articleID,
    });
  };

  // 검색조건 Effect
  useEffect(() => {
    // 무한 호출 방지
    if (!isAPICall) {
      return;
    }

    // key : value 로 검색조건 추가 후 검색
    if (keywordValue) {
      const newData = searchParam.set(keywordKey, keywordValue);
      searchArticleList(newData.toJS());
    } else {
      searchArticleList(searchParam);
    }
  }, [searchParam]);

  return (
    <DefaultLayout path={[{ name: '게시판 관리' }, { name: '게시글 조회' }]}>
      <SearchForm key="searchForm" searchInfo={searchInfo} onSubmit={onSearch} />

      <div className="panel-comm">
        <h2 className={`tit-panel ${styles.article_title_panel}`}>
          <i className="fa fa-search" /> 게시글조회
          <small className={`txt-muted ${styles.article_txt_muted}`}>{` 총 ${totalItem} 건`}</small>
        </h2>
        <div className="body-panel">
          <ArticleListTable key="table" articleList={articleList} showCommentModal={showModal} />
          <Pagination
            key="pagination"
            currentPage={page}
            totalItems={totalItem}
            itemsPerPage={limit}
            maxSize={10}
            search={page => {
              const param = searchParam.merge({ page, isAPICall: true });
              setSearchParam(param);
            }}
          />
        </div>
      </div>
      <CommentModal
        key="modal"
        boardKey={modal.key}
        articleID={modal.articleID}
        show={modal.show}
        showModal={showModal}
      />
    </DefaultLayout>
  );
};

export default ArticleListContainer;
