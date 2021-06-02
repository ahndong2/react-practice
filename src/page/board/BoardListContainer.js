/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ListPageLayout } from 'components/templates';
import { fromJS } from 'immutable';
import { SearchForm } from 'components/organisms';
import { Pagination } from 'components/molecules';
import { Debug } from 'library/Debug';
import { getBoardList, deleteBoard } from './api/boardList';
import { BoardListTable, SetBoardListModal } from './components/organisms';

const BoardListContainer = () => {
  // 검색 parameter
  const [searchParam, setSearchParam] = useState(
    fromJS({
      isAPICall: true,
      page: 1,
      limit: 20,
      totalItem: 0,
      keywordKey: 'name',
      keywordValue: '',
    }),
  );
  // 게시판 목록
  const [boardList, setBoardList] = useState(fromJS([]));
  // 모달 show/hide
  const [modal, setModal] = useState(false);
  // 게시판 key 신규/수정 에사용
  const [boardKey, setBoardKey] = useState(null);

  // searchParam 변수
  const { isAPICall, page, limit, totalItem, keywordKey, keywordValue } = searchParam.toJS();

  // 검색 폼 초기데이터
  const searchInfo = [
    {
      type: 'radioGroup',
      title: '상세검색',
      id: 'keywordKey',
      value: keywordKey,
      options: [
        { label: '게시판이름', value: 'name' },
        { label: '업주 ID', value: 'companyID' },
        { label: 'key', value: 'key' },
      ],
      dash: true,
    },
    {
      type: 'search',
      id: 'keywordValue',
      name: 'keywordValue',
      value: keywordValue,
    },
  ];

  // 게시판 리스트 조회
  const searchBoardList = async param => {
    const response = await getBoardList(param);

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        const paging = response.data.paging || {
          current: 1,
          limit: 20,
          totalCount: 0,
        };

        // banner list 추가
        setBoardList(data || []);

        const newData = searchParam.merge({
          isAPICall: false,
          page: paging.page,
          limit: paging.limit,
          totalItem: paging.totalCount,
        });
        setSearchParam(newData);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        setBoardList([]);
        const newData = searchParam.merge({
          isAPICall: false,
          totalItem: 0,
        });
        setSearchParam(newData);
      }
    }
  };

  // 게시판 리스트 삭제
  const deleteBoardList = async key => {
    const response = await deleteBoard(key);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        searchBoardList(searchParam.toJS());
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };
  // 검색 버튼 이벤트
  const onSearch = updateSearchParam => {
    if (Object.keys(updateSearchParam).length === 0) {
      window.alert('키워드를 입력해 주세요.');
    }

    const final = searchParam.merge(updateSearchParam, { page: 1, isAPICall: true });
    setSearchParam(final);
  };

  // 게시판 모달 open/hide
  const showModal = (flag, mode) => {
    // 모달 open
    setModal(flag);
    setBoardKey(null);

    // 모달 hide / 저장 또는 수정시 리스트 업데이트
    if (!flag && mode === 'save') {
      searchBoardList(searchParam.toJS());
    }
  };

  // 게시판 등록
  const openSetBoardListModal = key => {
    if (key) {
      setBoardKey(key);
    } else {
      setModal(true);
    }
  };

  // boardKey Effect - boardKey 업데이트시 수정모드
  useEffect(() => {
    if (!boardKey) return;
    setModal(true);
  }, [boardKey]);

  // 검색 조건 Effect
  useEffect(() => {
    // 무한 호출 방지
    if (!isAPICall) {
      return;
    }
    // key : value 로 검색조건 추가 후 검색
    const newData = searchParam.set(keywordKey, keywordValue);
    Debug.log('searchParam : ', searchParam.toJS());
    searchBoardList(newData.toJS());
  }, [searchParam]);

  return (
    <ListPageLayout
      title="게시판 조회"
      subtitle={`총 ${totalItem} 건`}
      path={[{ name: '게시판 관리' }, { name: '게시판 조회' }]}
    >
      <div key="tool" className="tool-panel">
        <button
          type="button"
          className="btn-slate"
          onClick={() => {
            openSetBoardListModal();
          }}
        >
          등록
        </button>
      </div>
      <SearchForm key="searchForm" searchInfo={searchInfo} onSubmit={onSearch} />
      <BoardListTable
        key="table"
        boardList={boardList}
        openSetBoardListModal={openSetBoardListModal}
        deleteBoardList={deleteBoardList}
      />
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
      <SetBoardListModal key="modal" boardKey={boardKey} show={modal} showModal={showModal} />
    </ListPageLayout>
  );
};

export default BoardListContainer;
