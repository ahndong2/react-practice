/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Input, Pagination } from 'components/molecules';
import { fromJS } from 'immutable';
import { Modal } from 'components/organisms';
import { getSessionStorage } from 'library/Utils';
import {
  getCommentList,
  insertComment,
  updateComment,
  deleteComment,
  setCommentDisplayChange,
} from '../../api/article';
import styles from './Article.module.css';

const ViewCommentModal = ({ boardKey = '', articleID = '', show, showModal }) => {
  const manager = getSessionStorage('manager');
  if (!manager.ID || !manager.name) {
    window.alert('매니저 정보가없습니다. 담당개발자에게 문의주세요.');
  }
  const defCommentData = {
    commentID: '',
    content: '',
    memberID: manager.ID,
    memberName: manager.name,
    memberEmail: '',
  };
  // 답글보기 search , 답변등록 insert, 답변 수정 update
  const [mode, setMode] = useState('search');
  // 검색 parameter
  const [searchParam, setSearchParam] = useState(
    fromJS({
      isAPICall: true,
      boardKey,
      articleID,
      page: 1,
      limit: 20,
      totalItem: 0,
    }),
  );
  const { isAPICall, page, limit, totalItem } = searchParam.toJS();

  // 답글 목록
  const [commentList, setCommentList] = useState([]);

  // 답변 등록
  const [comment, setComment] = useState(fromJS(defCommentData));
  const { content, memberID, memberName, memberEmail } = comment.toJS();

  const changeMode = (mode, data) => {
    setComment(fromJS(data));
    setMode(mode);
  };

  const changeCommentData = (e, id, value) => {
    const newData = comment.set(id, value);
    setComment(newData);
  };

  // 답변 리스트 조회 API
  const searchCommentAPI = async () => {
    const response = await getCommentList(searchParam.toJS());

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        const paging = response.data.paging || {
          current: 1,
          limit: 20,
          totalCount: 0,
        };

        // banner list 추가
        setCommentList(data.comments || []);
        const newData = searchParam.merge({
          isAPICall: false,
          page: paging.page,
          limit: paging.limit,
          totalItem: paging.totalCount,
        });
        setSearchParam(newData);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        setCommentList([]);
        const newData = searchParam.merge({
          isAPICall: false,
          totalItem: 0,
        });
        setSearchParam(newData);
      }
    }
  };

  // 답변 등록 API
  const insertCommentAPI = async () => {
    const response = await insertComment(searchParam.toJS(), comment.toJS());

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        changeMode('search', defCommentData);
        searchCommentAPI();
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        changeMode('search', defCommentData);
      }
    }
  };

  // 답변 수정 API
  const updateCommentAPI = async () => {
    const response = await updateComment(searchParam.toJS(), comment.toJS());

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        changeMode('search', defCommentData);
        searchCommentAPI();
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        changeMode('search', defCommentData);
      }
    }
  };

  // 답변 삭제 API
  const deleteCommentAPI = async data => {
    const response = await deleteComment(searchParam.toJS(), data);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        changeMode('search', defCommentData);
        searchCommentAPI();
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        changeMode('search', defCommentData);
      }
    }
  };

  // 노출 여부 변경 API
  const setDisplay = async (data, v) => {
    const newData = { ...data, isDisplay: v };
    const response = await setCommentDisplayChange(searchParam.toJS(), newData);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        const message = `[${data.commentID}] 답변의 노출상태가 변경 되었습니다.`;
        window.alert(message);
        searchCommentAPI();
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };
  // 검색조건 Effect
  useEffect(() => {
    // 무한 호출 || 등록 모드 || key null
    if (!isAPICall || mode !== 'search' || !boardKey || !articleID) {
      return;
    }
    searchCommentAPI();
  }, [searchParam]);

  // 모달 새로열릴때
  useEffect(() => {
    if (show) {
      // 데이터 초기화
      const newData = searchParam.merge({ boardKey, articleID, isAPICall: true });
      setSearchParam(newData);

      // 검색모드 on
      setMode('search');
    }
  }, [show]);

  const ListItem = ({ data, idx }) => {
    return (
      <tr>
        <td className="txt-center">{data.commentID}</td>
        <td className="txt-center">
          <Input
            type="radio"
            value={data.isDisplay}
            className={`lab-check ${styles.isDisplay}`}
            options={[
              { label: '노출', value: 1 },
              { label: '비노출', value: 0 },
            ]}
            onChange={(e, i, v) => {
              setDisplay(data, v);
            }}
          />
        </td>
        <td className="txt-center">{data.content}</td>
        <td className="txt-center">
          {data.memberName}
          <br />
          {data.memberEmail}
        </td>
        <td className="txt-center">
          {data.created}
          <br />
          {data.lastModified}
        </td>
        <td className="txt-center">
          <div className="btn-group">
            <button
              type="button"
              className="btn-default"
              onClick={() => {
                changeMode('update', data);
              }}
            >
              수정
            </button>
            <button
              type="button"
              className="btn-default"
              onClick={() => {
                deleteCommentAPI(data);
              }}
            >
              삭제
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const commentListItems = () => {
    if (commentList.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="txt-center">
            검색 결과가 존재하지 않습니다.
          </td>
        </tr>
      );
    }
    return commentList.map((v, idx) => {
      return <ListItem key={v.commentID} idx={idx} data={v} />;
    });
  };

  // 모달 푸터 버튼
  const footerBtn = [
    {
      name: '이전',
      className: 'btn-default',
      callback: () => {
        changeMode('search', defCommentData);
      },
    },
    {
      name: '저장',
      className: 'btn-slate',
      callback: () => {
        if (mode === 'insert') {
          insertCommentAPI();
        } else {
          updateCommentAPI();
        }
      },
    },
  ];

  return (
    <Modal
      title={mode === 'search' ? '답글 보기' : '답변 등록'}
      footerBtn={mode === 'search' ? [] : footerBtn}
      show={show}
      showModal={showModal}
    >
      {mode === 'search' && (
        <div className="panel-comm">
          <div className="head-panel">
            <h2 className="tit-panel">
              <i className="fa fa-search" /> 답글 목록
              <small className="txt-muted"> 총 {totalItem} 건</small>
            </h2>
            <div className="tool-panel">
              <button type="button" className="btn-slate" onClick={() => changeMode('insert', defCommentData)}>
                등록
              </button>
            </div>
          </div>
          <div className="body-panel">
            <div className="tbl-comm">
              <table>
                <thead>
                  <tr>
                    <th scope="col" className="txt-center">
                      ID
                    </th>
                    <th scope="col" className="txt-center">
                      노출여부
                    </th>
                    <th scope="col" className="txt-center">
                      내용
                    </th>
                    <th scope="col" className="txt-center">
                      등록자
                    </th>
                    <th scope="col" className="txt-center">
                      등록일시
                      <br />
                      수정일시
                    </th>
                    <th scope="col" className="txt-center">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody>{commentListItems()}</tbody>
              </table>
            </div>
          </div>
          <Pagination
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
      )}
      {mode !== 'search' && (
        <form onSubmit={e => e.preventDefault()}>
          <fieldset>
            <legend>답글 등록</legend>
            {/* 내용 */}
            <div className="row">
              <div className="col-3">
                <strong className="lab-comm">(필수) 내용 : </strong>
              </div>
              <div className="col-9">
                <Input
                  type="textArea"
                  id="content"
                  name="content"
                  rows="7"
                  cols="30"
                  value={content}
                  placeholder="답변을 입력하세요."
                  onChange={changeCommentData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 등록/수정자 ID */}
            <div className="row">
              <div className="col-3">
                <strong className="lab-comm">(필수) 등록/수정자 ID : </strong>
              </div>
              <div className="col-9">
                <Input
                  type="text"
                  id="memberID"
                  name="memberID"
                  value={memberID}
                  placeholder="등록/수정자 아이디를 입력하세요."
                  onChange={changeCommentData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 등록/수정자 이름 */}
            <div className="row">
              <div className="col-3">
                <strong className="lab-comm">등록/수정자 이름 : </strong>
              </div>
              <div className="col-9">
                <Input
                  type="text"
                  id="memberName"
                  name="memberName"
                  // value={memberName === '**' ? '' : memberName}
                  value={memberName}
                  placeholder="등록/수정자 이름을 입력하세요."
                  onChange={changeCommentData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 등록/수정자 이메일 */}
            <div className="row">
              <div className="col-3">
                <strong className="lab-comm">등록/수정자 이메일 : </strong>
              </div>
              <div className="col-9">
                <Input
                  type="text"
                  id="memberEmail"
                  name="memberEmail"
                  value={memberEmail}
                  placeholder="등록/수정자 이메일을 입력하세요."
                  onChange={changeCommentData}
                />
              </div>
            </div>
          </fieldset>
        </form>
      )}
    </Modal>
  );
};
export default ViewCommentModal;
