/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Modal } from 'components/organisms';
import { Input } from 'components/molecules';
import { Debug } from 'library/Debug';
import { setServerGroup } from '../../api/deploy';

const ServerGroupSetModal = ({ serverGroupData, showModal }) => {
  const [data, setData] = useState({
    serverGroupID: '',
    serverGroupTag: '',
    serverGroupName: '',
    serverGroupPath: '',
    description: '',
    show: false,
  });

  const dataChange = (e, id, value) => {
    setData({ ...data, [id]: value });
  };

  // serverGroup 저장/수정
  const setServerGroupAPI = async () => {
    const response = await setServerGroup(data);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        window.alert('서버그룹이 등록되었습니다.\r\n리스트를 갱신합니다.');
        showModal(false);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  const AddServerGroupValidate = () => {
    if (!data.serverGroupTag) {
      window.alert('서버그룹Tag를 입력해주세요');
      return;
    }
    if (!data.serverGroupName) {
      window.alert('서버그룹명을 입력해주세요');
      return;
    }
    if (!data.serverGroupPath) {
      window.alert('배포경로를 입력해주세요');
      return;
    }
    setServerGroupAPI();
  };
  // 모달 footer Button Setting
  const footerBtn = [
    {
      name: '저장',
      className: 'btn-slate',
      callback: () => {
        AddServerGroupValidate();
      },
    },
  ];

  useEffect(() => {
    setData({
      ...data,
      ...serverGroupData,
    });
    Debug.log({
      ...data,
      ...serverGroupData,
    });
  }, [serverGroupData]);
  return (
    <Modal
      title={data.serverGroupID ? '서버 그룹 수정' : '서버 그룹 추가'}
      show={data.show}
      footerBtn={footerBtn}
      showModal={showModal}
    >
      <form onSubmit={e => e.preventDefault()}>
        <fieldset>
          <legend>서버 그룹 추가</legend>
          {/* 서버그룹 Tag */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">서버그룹 Tag</strong>
            </div>
            <div className="col-10">
              <Input
                type="text"
                id="serverGroupTag"
                name="serverGroupTag"
                value={data.serverGroupTag}
                placeholder="최대 30자"
                maxLength={30}
                onChange={dataChange}
              />
            </div>
          </div>
          <div className="dash" />
          {/* 서버그룹 명 */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">서버그룹 명</strong>
            </div>
            <div className="col-10">
              <Input
                type="text"
                id="serverGroupName"
                name="serverGroupName"
                value={data.serverGroupName}
                placeholder="최대 30자"
                maxLength={30}
                onChange={dataChange}
              />
            </div>
          </div>
          <div className="dash" />
          {/* 배포경로 */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">배포경로</strong>
            </div>
            <div className="col-10">
              <Input
                type="text"
                id="serverGroupPath"
                name="serverGroupPath"
                value={data.serverGroupPath}
                placeholder="/home/httpd"
                maxLength={30}
                onChange={dataChange}
              />
            </div>
          </div>
          <div className="dash" />
          {/* 서버그룹 명 */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">서버그룹 명</strong>
            </div>
            <div className="col-10">
              <Input type="text" id="description" name="description" value={data.description} onChange={dataChange} />
            </div>
          </div>
          <div className="dash" />
        </fieldset>
      </form>
    </Modal>
  );
};
export default ServerGroupSetModal;
