import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ data, openEditModal, deleteBoard }) => {
  const typeBadge = () => {
    let color;
    let str;
    switch (data.type) {
      case 2:
        str = '후기';
        color = 'blue';
        break;
      case 3:
        str = 'CS';
        color = 'red';
        break;
      default:
        str = '일반';
        color = 'green';
        break;
    }
    return <span className={`badge-${color}`}>{str}</span>;
  };

  return (
    <tr>
      <td className="txt-center">{data.key}</td>
      <td className="txt-center">{typeBadge()}</td>
      <td className="txt-center">{data.companyID}</td>
      <td className="txt-center">{data.name}</td>
      <td className="txt-center">{data.articleCount}</td>
      <td className="txt-center">
        <div className="btn-group">
          <Link
            to={{
              pathname: `/board/detailArticle`,
              state: {
                key: data.key,
                name: data.name,
              },
            }}
            className="btn-blue"
          >
            게시글 작성
          </Link>
          <Link
            to={{
              pathname: `/board/listArticle/${data.key}`,
              state: {
                key: data.key,
              },
            }}
            className="btn-default"
          >
            게시글 보기
          </Link>
          <button
            type="button"
            className="btn-default"
            onClick={() => {
              openEditModal(data.key);
            }}
          >
            수정
          </button>
          <button
            type="button"
            className="btn-default"
            onClick={() => {
              deleteBoard(data.key);
            }}
          >
            삭제
          </button>
        </div>
      </td>
    </tr>
  );
};

const BoardListTable = ({ boardList, openSetBoardListModal, deleteBoardList }) => {
  // 배너 리스트
  const boardListItems = () => {
    if (boardList.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="txt-center">
            검색 결과가 존재하지 않습니다.
          </td>
        </tr>
      );
    }
    return boardList.map(v => {
      return <ListItem key={v.key} data={v} openEditModal={openSetBoardListModal} deleteBoard={deleteBoardList} />;
    });
  };

  return (
    <div className="tbl-comm">
      <table>
        <thead>
          <tr>
            <th scope="col" className="txt-center">
              KEY
            </th>
            <th scope="col" className="txt-center">
              유형
            </th>
            <th scope="col" className="txt-center">
              업주 ID
            </th>
            <th scope="col" className="txt-center">
              게시판 이름
            </th>
            <th scope="col" className="txt-center">
              게시판 갯수
            </th>
            <th scope="col" className="txt-center">
              관리
            </th>
          </tr>
        </thead>
        <tbody>{boardListItems()}</tbody>
      </table>
    </div>
  );
};
export default BoardListTable;
