/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input } from 'components/molecules';
import { Modal } from 'components/organisms';
import { Debug } from 'library/Debug';
import { getSessionStorage } from 'library/Utils';
import { insertBoard, updateBoard } from '../../api/boardList';

const SetBoardListModal = ({ boardKey, show, showModal }) => {
  const manager = getSessionStorage('manager');
  const [data, setData] = useState({
    type: 1,
    key: boardKey || '',
    companyID: '',
    name: '',
    memberID: manager.ID || '',
    memberName: manager.name || '',
    memberEmail: '',
  });

  const dataChange = (e, id, value) => {
    const updateData = {
      ...data,
      [id]: value,
    };
    setData(updateData);
  };

  // 게시판 등록
  const insertBoardAPI = async () => {
    const response = await insertBoard(data);

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        Debug.log('등록 완료', data.key);
        showModal(false, 'save');
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  // 게시판 수정
  const updateBoardAPI = async () => {
    const response = await updateBoard(data);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        showModal(false, 'save');
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  // 저장 전 validation
  const validateSaveData = () => {
    if (!data.name) {
      window.alert('게시판 이름 입력해주세요.');
      return;
    }
    if (boardKey) {
      updateBoardAPI();
      return;
    }
    if (!data.companyID) {
      window.alert('업주ID를 입력해주세요.');
      return;
    }

    insertBoardAPI();
  };

  // 모달 푸터 버튼
  const footerBtn = [
    {
      name: '저장',
      className: 'btn-slate',
      callback: () => {
        Debug.log('저장', data);
        validateSaveData();
      },
    },
  ];

  useEffect(() => {
    if (!boardKey) return;
    setData({ ...data, key: boardKey });
  }, [boardKey]);
  return (
    <Modal title={boardKey ? '게시판 수정' : '게시판 신규생성'} footerBtn={footerBtn} show={show} showModal={showModal}>
      {!boardKey && (
        <form onSubmit={e => e.preventDefault()}>
          <fieldset>
            <legend>게시판 신규 생성</legend>
            {/* 유형 */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">유형</strong>
              </div>
              <div className="col-10">
                <Input
                  type="select"
                  id="type"
                  name="type"
                  value={data.type}
                  options={[
                    { label: '일반', value: 1 },
                    { label: '후기', value: 2 },
                    { label: 'CS', value: 3 },
                  ]}
                  onChange={dataChange}
                />
              </div>
            </div>
            <div className="dash" />
            {/* KEY */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">KEY(미입력시 자동 생성됩니다.)</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="key"
                  name="key"
                  value={data.key}
                  placeholder="15자리 키를 입력해주세요."
                  onChange={dataChange}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 업주 ID */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">업주 ID(companyID)</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="companyID"
                  name="companyID"
                  value={data.companyID}
                  placeholder="게시판 소유자를 입력해주세요."
                  onChange={dataChange}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 게시판 이름 */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">게시판 이름</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  placeholder="게시판 이름을 입력해주세요."
                  onChange={dataChange}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 등록자 ID */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">등록자 ID(memberID)</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="memberID"
                  name="memberID"
                  value={data.memberID}
                  placeholder="등록자 ID를 입력해주세요."
                  onChange={dataChange}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 등록자 이름 */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">등록자 이름(memberName)</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="memberName"
                  name="memberName"
                  value={data.memberName}
                  placeholder="등록자 ID를 입력해주세요."
                  onChange={dataChange}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 등록자 Email */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">등록자 이메일(memberEmail)</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="memberEmail"
                  name="memberEmail"
                  value={data.memberEmail}
                  placeholder="등록자 이메일을 입력해주세요."
                  onChange={dataChange}
                />
              </div>
            </div>
            <div className="dash" />
          </fieldset>
        </form>
      )}
      {boardKey && (
        <form onSubmit={e => e.preventDefault()}>
          <fieldset>
            <legend>게시판 이름 수정</legend>
            {/* 게시판 이름 */}
            <div className="row">
              <div className="col-10">
                <strong className="lab-comm">게시판 이름 변경 - [{boardKey}]</strong>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  placeholder="게시판 이름을 입력해주세요."
                  onChange={dataChange}
                />
              </div>
            </div>
          </fieldset>
        </form>
      )}
    </Modal>
  );
};
export default SetBoardListModal;
