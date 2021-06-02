/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListPageLayout } from 'components/templates';
import { SearchForm } from 'components/organisms';
import { Pagination } from 'components/molecules';
import { Debug } from 'library/Debug';
import { getBannerList } from './api/banner';
import { BannerListTable } from './components/organisms';

const BannerListContainer = () => {
  // 검색 parameter
  const [searchParam, setSearchParam] = useState({
    isAPICall: true,
    page: 1,
    limit: 20,
    totalItem: 0,
    status: '',
    brandID: '',
    keywordKey: 'key',
    keywordValue: '',
  });
  const { keywordKey, keywordValue, status } = searchParam;

  // 검색 폼 초기데이터
  const searchInfo = [
    {
      type: 'radioGroup',
      title: '노출 상태',
      name: 'status',
      id: 'status',
      value: status,
      options: [
        { label: '전체', value: '' },
        { label: '노출', value: '1' },
        { label: '미노출', value: '0' },
      ],
    },
    {
      type: 'select',
      title: '키워드',
      id: 'keywordKey',
      value: keywordKey,
      options: [
        { label: 'Key', value: 'key' },
        { label: '제목', value: 'title' },
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
  const [bannerList, setBannerList] = useState([]);

  // Banner Search API Controll
  const searchBanner = async param => {
    const response = await getBannerList(param);

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        const paging = response.data.paging || {
          current: 1,
          limit: 20,
          totalCount: 0,
        };

        // banner list 추가
        setBannerList(data || []);

        setSearchParam({
          ...searchParam,
          isAPICall: false,
          page: paging.current,
          limit: paging.limit,
          totalItem: paging.totalCount,
        });
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        setBannerList([]);
        setSearchParam({
          ...searchParam,
          isAPICall: false,
          totalItem: 0,
        });
      }
    }
  };
  // 검색 버튼 이벤트
  const onSearch = updateSearchParam => {
    const final = { ...searchParam, ...updateSearchParam, page: 1, isAPICall: true };
    Debug.log('최종리턴 obj : ', final);
    setSearchParam(final);
  };

  // 배너 리스트 조회 Effect
  useEffect(() => {
    // 무한 호출 방지
    if (!searchParam.isAPICall) {
      return;
    }
    searchBanner(searchParam);
  }, [searchParam]);

  return (
    <ListPageLayout
      title="배너 관리"
      subtitle={`총 ${searchParam.totalItem} 건`}
      path={[{ name: '사이트 관리' }, { name: '배너관리' }]}
    >
      <SearchForm key="searchForm" searchInfo={searchInfo} onSubmit={onSearch} />
      <div key="tool" className="tool-panel">
        <Link to="/banner/insert" className="btn-slate">
          등록
        </Link>
      </div>
      <BannerListTable key="table" bannerList={bannerList} />
      <Pagination
        key="pagination"
        currentPage={searchParam.page}
        totalItems={searchParam.totalItem}
        itemsPerPage={searchParam.limit}
        maxSize={10}
        search={page => {
          const param = { ...searchParam, page, isAPICall: true };
          setSearchParam(param);
        }}
      />
    </ListPageLayout>
  );
};

export default BannerListContainer;
