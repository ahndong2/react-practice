/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { fromJS } from 'immutable';
import { Input } from 'components/molecules';
import { Debug } from 'library/Debug';
import { getBranchList, addBranchList, deleteBranchList, branchListChange } from '../../api/deploy';

const BranchList = ({ serverGroupID }) => {
  const [branch, setBranch] = useState(
    fromJS({
      isUpdate: false,
      serverGroupID,
      newBranchName: '',
      branches: [],
      totalItems: 0,
    }),
  );

  const { isUpdate, newBranchName, branches, totalItems } = branch.toJS();

  // 브랜치 리스트 조회
  const getBranchListAPI = async () => {
    const response = await getBranchList(serverGroupID);

    if (response) {
      const { result, data, paging } = response.data;
      if (result.code === 1) {
        const newData = branch.merge({
          isUpdate: false,
          newBranchName: '',
          branches: data || [],
          totalItems: paging.totalCount,
        });
        setBranch(newData);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  // 브랜치 추가
  const addBranchAPI = async () => {
    if (!newBranchName) {
      window.alert('배포 브랜치 명을 입력해주세요.');
      return;
    }
    const branchNameList = [];
    if (newBranchName.split(' ').length > 0) {
      newBranchName.split(' ').forEach(v => branchNameList.push(v));
    } else {
      branchNameList.push(newBranchName);
    }
    const data = {
      serverGroupID,
      branches: branchNameList,
    };
    const response = await addBranchList(data);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        window.alert('서버 그룹이 등록되었습니다.\r\n리스트를 갱신합니다.');
        getBranchListAPI();
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  // 브랜치 삭제
  const deleteBranchAPI = async data => {
    Debug.log(data);
    const flag = window.confirm(`[${data.branchName}] 브랜치를 삭제하시겠습니까?`);
    if (flag) {
      const response = await deleteBranchList(data);

      if (response) {
        const { result } = response.data;
        if (result.code === 1) {
          window.alert('서버 그룹이 삭제되었습니다.\r\n리스트를 갱신합니다.');
          getBranchListAPI();
        } else {
          window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        }
      }
    }
  };

  // 브랜치 순서변경
  const branchListChangeAPI = async () => {
    const flag = window.confirm('브랜치 순서를 변경하시겠습니까?');
    if (flag) {
      const response = await branchListChange(branch.toJS());

      if (response) {
        const { result } = response.data;
        if (result.code === 1) {
          window.alert('변경되었습니다.\r\n리스트를 갱신합니다.');
          getBranchListAPI();
        } else {
          window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        }
      }
    }
  };

  const dataChange = (e, id, value) => {
    const newData = branch.set(id, value);
    setBranch(newData);
  };

  // 브랜치 리스트 아이템
  const ListItem = ({ data }) => {
    return (
      <tr>
        <td className="txt-center">
          <button type="button" className="handleBtn">
            <i className="fa fa-bars" />
            <span className="screen-out">move</span>
          </button>
        </td>
        <td>{data.ID}</td>
        <td>{data.branchName}</td>
        <td>{data.serverGroupID}</td>
        <td>{data.serverGroupTag}</td>
        <td>{data.serverGroupName}</td>
        <td>{data.serverGroupPath}</td>
        <td className="txt-center">
          <button
            type="button"
            className="btn-default"
            onClick={() => {
              deleteBranchAPI({ serverGroupID: data.serverGroupID, branchName: data.branchName });
            }}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  };

  let changeList = [];
  // 브랜치 리스트
  const branchListItems = () => {
    if (branches.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="8" className="txt-center">
              검색 결과가 존재하지 않습니다.
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <ReactSortable
        tag="tbody"
        list={branches}
        setList={list => {
          changeList = list;
        }}
        handle=".handleBtn"
        onEnd={e => {
          e.item.style.transform = null;

          const newData = branch.merge({ isUpdate: true, branches: changeList });
          setBranch(newData);
        }}
      >
        {branches.map((v, idx) => {
          const key = `${v.branchName}_${v.serverGroupID}`;
          return <ListItem key={key} data={v} />;
        })}
      </ReactSortable>
    );
  };

  useEffect(() => {
    getBranchListAPI();
  }, []);
  return (
    <div className="panel-comm">
      <div className="head-panel">
        <h2 className="tit-panel">
          <i className="fa fa-info-circle" /> 브랜치 {totalItems}개
        </h2>
        <div className="tool-panel">
          <div className="inp-group">
            <button type="button" className="btn-default">
              배포 브랜치명
            </button>
            <Input
              type="text"
              id="newBranchName"
              name="newBranchName"
              value={newBranchName}
              placeholder="master"
              onChange={dataChange}
            />
            <button type="button" className="btn-slate" onClick={addBranchAPI}>
              리스트 등록
            </button>
            {isUpdate && (
              <button type="button" className="btn-red" onClick={branchListChangeAPI}>
                저장
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="body-panel">
        <div className="tbl-comm">
          <table>
            <thead>
              <tr>
                <th scope="col">정렬</th>
                <th scope="col">브랜치ID</th>
                <th scope="col">브랜치명</th>
                <th scope="col">서버그룹ID</th>
                <th scope="col">서버그룹Tag</th>
                <th scope="col">서버그룹명</th>
                <th scope="col">배포경로</th>
                <th scope="col">제거</th>
              </tr>
            </thead>
            {branchListItems()}
          </table>
        </div>
      </div>
    </div>
  );
};
export default BranchList;
