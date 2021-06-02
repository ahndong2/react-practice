/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ListPageLayout } from 'components/templates';
import { SearchForm } from 'components/organisms';
import { Pagination } from 'components/molecules';
import { Debug } from 'library/Debug';
import { fromJS } from 'immutable';
import { getAccessLogList } from './api/accessLog';
import { AccessLogListTable } from './components/organisms';

const AccessLogContainer = () => {
  // 검색 parameter
  const [searchParam, setSearchParam] = useState(
    fromJS({
      isAPICall: true,
      page: 1,
      limit: 20,
      totalItem: 0,
      keywordKey: 'key',
      keywordValue: '',
    }),
  );
  const { isAPICall, page, limit, totalItem, keywordKey, keywordValue } = searchParam.toJS();

  // 검색 폼 초기데이터
  const searchInfo = [
    {
      type: 'select',
      title: '키워드',
      id: 'keywordKey',
      value: keywordKey,
      options: [
        { label: '관리자ID', value: 'ID' },
        { label: 'IP', value: 'ip' },
        { label: 'URI*', value: 'uri' },
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

  // 배너 리스트
  const [accessLogList, setAccessLogList] = useState([]);

  // AccessLog Search API Controll
  const searchAccessLog = async param => {
    const response = await getAccessLogList(param);

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        const paging = response.data.paging || {
          current: 1,
          limit: 20,
          totalCount: 0,
        };
        // banner list 추가
        setAccessLogList(data.items || []);

        const newData = searchParam.merge({
          isAPICall: false,
          page: paging.page,
          limit: paging.count,
          totalItem: paging.totalCount,
        });
        setSearchParam(newData);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${  result.message}`);
        setAccessLogList([]);
        const newData = searchParam.merge({
          isAPICall: false,
          totalItem: 0,
        });
        setSearchParam(newData);
      }
    }
  };

  // 검색 버튼 이벤트
  const onSearch = updateSearchParam => {
    if (Object.keys(updateSearchParam).length === 0) {
      window.alert('키워드를 입력해 주세요.');
    }

    const final = searchParam.merge(updateSearchParam, { page: 1, isAPICall: true });
    Debug.log('최종리턴 obj : ', final);
    setSearchParam(final);
  };

  // 배너 리스트 조회 Effect
  useEffect(() => {
    // 무한 호출 방지
    if (!isAPICall) {
      return;
    }
    searchAccessLog(searchParam);
  }, [searchParam]);

  return (
    <ListPageLayout
      title="Admin AccessLog"
      subtitle={`총 ${totalItem} 건`}
      path={[{ name: '모니터링' }, { name: 'Admin AccessLog' }]}
    >
      <SearchForm key="searchForm" searchInfo={searchInfo} onSubmit={onSearch} />
      <AccessLogListTable key="table" accessLogList={accessLogList} />
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
    </ListPageLayout>
  );
};

export default AccessLogContainer;
