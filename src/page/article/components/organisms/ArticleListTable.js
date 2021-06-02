import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Debug } from 'library/Debug';
import { Input } from 'components/molecules';
import { getSessionStorage } from 'library/Utils';
import { setArticleDisplayChange } from '../../api/article';
import styles from './Article.module.css';

const ListItem = ({ data, commentModal }) => {
  const [isDisplay, setIsDisplay] = useState(data.isDisplay);

  // 게시판 리스트 조회 API
  const setDisplay = async v => {
    const manager = getSessionStorage('manager');
    const param = {
      boardKey: data.key,
      articleID: data.articleID,
      isDisplay: v,
      memberID: manager.ID,
      memberName: manager.name,
    };
    const response = await setArticleDisplayChange(param);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        const message = `[${data.key}] ${data.boardName}의 노출상태가 변경 되었습니다.`;
        window.alert(message);
        setIsDisplay(v);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  const info = () => {
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

  const img = () => {
    if (data.images.length > 0) {
      return data.images.map(v => {
        return (
          <div key={v.imageID} className={styles.imageWrap}>
            <img id={v.imageID} name="imageUrl" className={styles.image} src={v.imageUrl} alt="" />
          </div>
        );
      });
    }
  };
  return (
    <tr>
      <td className="txt-center">{data.articleID}</td>
      <td className="txt-center">
        {data.key}
        <br />
        {info()}
        {data.boardName}
      </td>
      <td className="txt-center">
        {data.header && <span>[{data.header}] </span>}
        <b>{data.subject}</b>
        <br />
        {img()}
        <br />
        {data.content}
      </td>
      <td className="txt-center">{data.commentCount}</td>
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
        <Input
          type="radio"
          value={isDisplay}
          className={`lab-check ${styles.isDisplay}`}
          options={[
            { label: '노출', value: 1 },
            { label: '비노출', value: 0 },
          ]}
          onChange={(e, i, v) => {
            setDisplay(v);
          }}
        />
        <div className="btn-group">
          <button
            type="button"
            className="btn-default"
            onClick={() => {
              commentModal(true, data.key, data.articleID);
            }}
          >
            답글보기
          </button>
          <Link
            to={{
              pathname: `/board/detailArticle`,
              state: {
                key: data.key,
                name: data.boardName,
                articleID: data.articleID,
              },
            }}
            className="btn-default"
          >
            수정
          </Link>
          <button
            type="button"
            className="btn-default"
            onClick={() => {
              Debug.log('dd');
            }}
          >
            삭제
          </button>
        </div>
      </td>
    </tr>
  );
};

const ArticleListTable = ({ articleList, showCommentModal }) => {
  // 배너 리스트
  const articleListItems = () => {
    if (articleList.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="txt-center">
            검색 결과가 존재하지 않습니다.
          </td>
        </tr>
      );
    }
    return articleList.map((v, i) => {
      const key = `article_${v.key}_${i}`;
      return <ListItem key={key} data={v} commentModal={showCommentModal} />;
    });
  };

  return (
    <div className="tbl-comm">
      <table>
        <thead>
          <tr>
            <th scope="col" className="txt-center">
              ID
            </th>
            <th scope="col" className="txt-center">
              게시판정보
            </th>
            <th scope="col" className="txt-center">
              내용
            </th>
            <th scope="col" className="txt-center">
              노출답글수
            </th>
            <th scope="col" className="txt-center">
              등록자
            </th>
            <th scope="col" className="txt-center">
              등록일시
              <br /> / 수정일시
            </th>
            <th scope="col" className="txt-center">
              관리
            </th>
          </tr>
        </thead>
        <tbody>{articleListItems()}</tbody>
      </table>
    </div>
  );
};
export default ArticleListTable;
