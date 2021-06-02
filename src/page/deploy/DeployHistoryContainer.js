/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ListPageLayout } from 'components/templates';
import { SearchForm } from 'components/organisms';
import { Pagination } from 'components/molecules';
import { Debug } from 'library/Debug';
import { getDeployHistory, setDeployRollback } from './api/deploy';
import { HistoryListTable } from './components/organisms';

const DeployHistoryContainer = () => {
  // 검색 parameter
  const [searchParam, setSearchParam] = useState({
    isAPICall: true,
    page: 1,
    limit: 5,
    totalItems: 0,
    keywordType: '1',
    keyword: '',
  });
  const { keywordType, keyword } = searchParam;

  // 검색 폼 초기데이터
  const searchInfo = [
    {
      type: 'radioGroup',
      title: '노출 상태',
      name: 'keywordType',
      id: 'keywordType',
      value: keywordType,
      options: [
        { label: '히스토리상세ID', value: '1' },
        { label: '배포자ID', value: '2' },
      ],
      dash: true,
    },
    {
      type: 'search',
      id: 'keyword',
      name: 'keyword',
      value: keyword,
    },
  ];

  // 배너 리스트
  const [historyList, setHistoryList] = useState([]);

  // History Search API Controll
  const searchHistory = async () => {
    const response = await getDeployHistory(searchParam);

    if (response) {
      const { result, data, paging } = response.data;
      if (result.code === 1) {
        // History list 추가
        setHistoryList(data || []);
        setSearchParam({
          ...searchParam,
          isAPICall: false,
          page: paging.page || 1,
          totalItems: paging.totalCount || 0,
        });
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        setHistoryList([]);
        setSearchParam({
          ...searchParam,
          isAPICall: false,
          page: 1,
          totalItems: 0,
        });
      }
    }
  };

  // 롤백
  const deployRollback = async id => {
    const confirm = window.confirm(`[히스토리 ID : ${id}] 를 롤백 하시겠습니까?`);
    if (confirm) {
      const data = {
        serverGroupHistoryID: id,
      };
      const response = await setDeployRollback(data);

      if (response) {
        const { result } = response.data;
        if (result.code === 1) {
          window.alert('롤백이 완료 되었습니다.\n 리스트를 갱신합니다.');
          searchHistory();
        } else {
          window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        }
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
    searchHistory();
  }, [searchParam]);

  return (
    <ListPageLayout
      title="배포 현황"
      subtitle={`총 ${searchParam.totalItems} 건`}
      path={[{ name: '배포' }, { name: '배포 현황' }]}
    >
      <SearchForm key="searchForm" searchInfo={searchInfo} onSubmit={onSearch} />
      <HistoryListTable key="table" historyList={historyList} deployRollback={deployRollback} />
      <Pagination
        key="pagination"
        currentPage={searchParam.page}
        totalItems={searchParam.totalItems}
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

export default DeployHistoryContainer;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { DefaultLayout } from 'components/templates';
// import { SearchForm } from 'components/organisms';
// import { Pagination } from 'components/molecules';
// import { Debug } from 'library/Debug';
// import { getDeployHistory } from './api/deploy';
// import { HistoryListTable } from './components/organisms';
// import styles from './components/organisms/Deploy.module.css';

// const DeployHistoryContainer = () => {
//   // 검색 parameter
//   const [searchParam, setSearchParam] = useState({
//     isAPICall: true,
//     page: 1,
//     limit: 5,
//     totalItems: 0,
//     keywordType: '1',
//     keyword: '',
//   });
//   const { keywordType, keyword } = searchParam;

//   // 검색 폼 초기데이터
//   const searchInfo = [
//     {
//       type: 'radio',
//       title: '노출 상태',
//       name: 'keywordType',
//       id: 'keywordType',
//       value: keywordType,
//       options: [
//         { label: '히스토리상세ID', value: '1' },
//         { label: '배포자ID', value: '2' },
//         // { label: '히스토리ID', value: '2' },
//         // { label: '서버그룹ID', value: '3' },
//         // { label: '서버그룹명', value: '4' },
//         // { label: '배포경로', value: '5' },
//         // { label: '브랜치명', value: '6' },
//         // { label: '배포결과 (0:실패, 1:성공)', value: '7' },
//       ],
//     },
//     {
//       type: 'search',
//       id: 'keyword',
//       name: 'keyword',
//       value: keyword,
//     },
//   ];

//   // 배너 리스트
//   const [historyList, setHistoryList] = useState([]);

//   // History Search API Controll
//   const searchHistory = async param => {
//     const response = await getDeployHistory(param);

//     if (response) {
//       const { result, data } = response.data;
//       if (result.code === 1) {
//         const paging = {
//           page: data.current || 1,
//           totalItems: data.totalItems || 0,
//         };
//         // History list 추가
//         setHistoryList(data.items || []);

//         setSearchParam({
//           ...searchParam,
//           isAPICall: false,
//           ...paging,
//         });
//       } else {
//         window.alert(`담당 개발자에게 문의주세요.\n${  result.message}`);
//         setHistoryList([]);
//         setSearchParam({
//           ...searchParam,
//           isAPICall: false,
//           page: 1,
//           totalItems: 0,
//         });
//       }
//     }
//   };
//   // 검색 버튼 이벤트
//   const onSearch = updateSearchParam => {
//     const final = { ...searchParam, ...updateSearchParam, page: 1, isAPICall: true };
//     Debug.log('최종리턴 obj : ', final);
//     setSearchParam(final);
//   };

//   // 배너 리스트 조회 Effect
//   useEffect(() => {
//     // 무한 호출 방지
//     if (!searchParam.isAPICall) {
//       return;
//     }
//     searchHistory(searchParam);
//   }, [searchParam]);

//   return (
//     <DefaultLayout path={[{ name: '배포' }, { name: '배포 현황' }]}>
//       <SearchForm key="searchForm" searchInfo={searchInfo} onSubmit={onSearch} />
//       <div className="panel-comm">
//         <h2 className={`tit-panel ${styles.deploy_title_panel}`}>
//           <i className="fa fa-search" /> 배포 현황
//           <small className={`txt-muted ${styles.deploy_txt_muted}`}>{` 총 ${searchParam.totalItems} 건`}</small>
//         </h2>
//         <div className="body-panel">
//           <HistoryListTable key="table" historyList={historyList} />
//           <Pagination
//             key="pagination"
//             currentPage={searchParam.currentPage}
//             totalItems={searchParam.totalItems}
//             itemsPerPage={searchParam.itemsPerPage}
//             maxSize={10}
//             search={page => {
//               const param = { ...searchParam, page, isAPICall: true };
//               setSearchParam(param);
//             }}
//           />
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default DeployHistoryContainer;
