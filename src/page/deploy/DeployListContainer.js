/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { DefaultLayout } from 'components/templates';
import { Pagination } from 'components/molecules';
import { Link } from 'react-router-dom';
import { Debug } from 'library/Debug';
import { getDeployList, setDeployMerge, deleteServerGroup } from './api/deploy';
import { DeployListTable, ServerGroupSetModal } from './components/organisms';

const DeployListContainer = () => {
  const childRef = useRef();
  // 검색 parameter
  const [searchParam, setSearchParam] = useState({
    isAPICall: true,
    page: 1,
    limit: 20,
    totalItems: 0,
  });
  const [deployList, setDeployList] = useState([]);

  // Deploy Search API Controll
  const searchDeploy = async () => {
    const response = await getDeployList(searchParam);

    if (response) {
      const { result, data, paging } = response.data;
      if (result.code === 1) {
        // Deploy list 추가
        setDeployList(data || []);

        setSearchParam({
          ...searchParam,
          isAPICall: false,
          page: paging.page || 1,
          totalItems: paging.totalCount || 0,
        });
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${  result.message}`);
        setDeployList([]);
        setSearchParam({
          ...searchParam,
          isAPICall: false,
          page: 1,
          totalItems: 0,
        });
      }
    }
  };

  // Deploy API Controll
  const deployMerge = async idList => {
    const response = await setDeployMerge(idList);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        window.alert('배포가 완료되었습니다.');
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${  result.message}`);
      }
    }
  };

  // Delete ServerGroup
  const deleteServerGroupAPI = async serverGroupID => {
    const flag = window.confirm('서버그룹을 삭제하시겠습니까?');
    if (flag) {
      const response = await deleteServerGroup(serverGroupID);

      if (response) {
        const { result } = response.data;
        if (result.code === 1) {
          window.alert('서버그룹이 삭제되었습니다.\r\n리스트를 갱신합니다.');
          searchDeploy();
        } else {
          window.alert(`담당 개발자에게 문의주세요.\n${  result.message}`);
        }
      }
    }
  };
  // 서버그룹 추가/수정 모달
  const [sgmData, setSgmData] = useState({
    serverGroupID: '',
    serverGroupTag: '',
    serverGroupName: '',
    serverGroupPath: '',
    description: '',
    show: false,
  });
  const serverGroupModalShowModal = flag => {
    setSgmData({
      ...sgmData,
      show: flag,
    });
    if (!flag) {
      searchDeploy();
    }
  };
  const openServerGroupModal = () => {
    const serverGroupList = childRef.current.getList();
    const selectServerGroup = serverGroupList.filter(v => {
      return v.check;
    });
    if (selectServerGroup.length > 1) {
      window.alert('서버 그룹을 한개만 선택해주세요.');
      return;
    }

    setSgmData({
      ...selectServerGroup[0],
      show: true,
    });
  };

  // 배포
  const deployServerGroup = () => {
    const serverGroupList = childRef.current.getList();
    const selectServerGroupIDList = [];
    serverGroupList.forEach(v => {
      if (v.check) {
        selectServerGroupIDList.push(v.serverGroupID);
      }
    });
    if (selectServerGroupIDList.length === 0) return;

    deployMerge(selectServerGroupIDList);
  };

  // 배너 리스트 조회 Effect
  useEffect(() => {
    // 무한 호출 방지
    if (!searchParam.isAPICall) {
      return;
    }
    searchDeploy();
  }, [searchParam]);
  return (
    <DefaultLayout path={[{ name: '배포' }, { name: '배포' }]}>
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-search" /> 배포 서버 그룹
            <small className="txt-muted">{` ${searchParam.totalItems} 개`}</small>
          </h2>
          <div className="tool-panel">
            <div className="btn-group">
              <button type="button" className="btn-default" onClick={openServerGroupModal}>
                서버그룹추가/수정
              </button>
              <Link to="/deploy/index" className="btn-slate">
                배포이력확인
              </Link>
              <button type="button" className="btn-red" onClick={deployServerGroup}>
                배포
              </button>
            </div>
          </div>
        </div>
        <div className="body-panel">
          <DeployListTable ref={childRef} list={deployList} deleteServerGroupAPI={deleteServerGroupAPI} />
          <Pagination
            currentPage={searchParam.page}
            totalItems={searchParam.totalItems}
            itemsPerPage={searchParam.limit}
            maxSize={10}
            search={page => {
              const param = { ...searchParam, page, isAPICall: true };
              Debug.log(param);
              setSearchParam(param);
            }}
          />
        </div>
        <ServerGroupSetModal serverGroupData={sgmData} showModal={serverGroupModalShowModal} />
      </div>
    </DefaultLayout>
  );
};

export default DeployListContainer;
