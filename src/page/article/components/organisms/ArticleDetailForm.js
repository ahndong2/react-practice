/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'components/molecules';
import { Debug } from 'library/Debug';

const ListArticleDetailForm = ({ article, saveArticleData }) => {
  const [data, setData] = useState(article);
  const {
    boardKey,
    boardName,
    loginID,
    subject,
    header,
    content,
    score,
    orderNo,
    paymentDate,
    dealID,
    storeID,
    subjectTitle,
    subjectImageUrl,
    product,
    memberID,
    memberName,
    memberEmail,
    imageUrl = [],
  } = data.toJS();

  const changeData = (e, id, value) => {
    const newData = data.set(id, value);
    setData(newData);
  };

  const imgChange = (id, value) => {
    const img = value.map(v => {
      return {
        imageID: '',
        imageUrl: v,
      };
    });
    const newData = data.set('imageUrl', value).set('images', img);
    setData(newData);
  };

  useEffect(() => {
    if (article.get('images').length > 0) {
      const newImg = article.get('images').map(v => {
        return v.imageUrl;
      });

      const newData = article.set('imageUrl', newImg);
      Debug.log(newData);
      setData(newData);
      return;
    }
    setData(article);
  }, [article]);
  return (
    <div className="panel-comm">
      <div className="head-panel">
        <h2 className="tit-panel">
          <i className="fa fa-info-circle" /> {boardName}
          <small className="txt-muted"> {boardKey}</small>
        </h2>
      </div>
      <div className="body-panel">
        <form onSubmit={e => e.preventDefault()}>
          <fieldset>
            <legend>게시글 등록/수정</legend>
            {/* 제목 */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">제목</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={subject}
                  placeholder="제목을 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 머릿말 */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">머릿말</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="header"
                  name="header"
                  value={header}
                  placeholder="제목을 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 내용 */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">내용(필수)</strong>
              </div>
              <div className="col-10">
                <Input
                  type="textArea"
                  id="content"
                  name="content"
                  value={content}
                  placeholder="내용을 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 업주아이디 */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">업주아이디</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="loginID"
                  name="loginID"
                  value={loginID}
                  placeholder="업주아이디를 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 점수 */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">[후기]점수</strong>
              </div>
              <div className="col-10">
                <Input
                  type="number"
                  id="score"
                  name="score"
                  value={score}
                  placeholder="5점 만점입니다. (ex: 4.5)"
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 주문번호 orderNo */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">[후기]주문번호 orderNo</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="orderNo"
                  name="orderNo"
                  value={orderNo}
                  placeholder="주문번호를 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 결제일시 paymentDate */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">[후기]결제일시 paymentDate</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="paymentDate"
                  name="paymentDate"
                  value={paymentDate === '0000-00-00 00:00:00' ? '' : paymentDate}
                  placeholder="결제일시를 입력하세요. (ex: 2020-05-27)"
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 딜 아이디 dealID */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">[후기]딜 아이디 dealID</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="dealID"
                  name="dealID"
                  value={dealID}
                  placeholder="딜 아이디를 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 매장 아이디 storeID */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">[후기]매장 아이디 storeID</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="storeID"
                  name="storeID"
                  value={storeID}
                  placeholder="딜 아이디를 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 대상 타이틀 subjectTitle */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">[후기]대상 타이틀 subjectTitle</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="subjectTitle"
                  name="subjectTitle"
                  value={subjectTitle}
                  placeholder="후기 대상 타이틀을 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 대상 이미지 url subjectImageUrl */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">[후기]대상 이미지 url subjectImageUrl</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="subjectImageUrl"
                  name="subjectImageUrl"
                  value={subjectImageUrl}
                  placeholder="후기 대상 이미지url을 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 구매옵션 product */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">[후기]구매옵션 product</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="product"
                  name="product"
                  value={product}
                  placeholder="구매옵션을 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 작성자 아이디 memberID */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">작성자 아이디 memberID(필수)</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="memberID"
                  name="memberID"
                  value={memberID}
                  placeholder="작성자 아이디를 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 작성자 이름 memberName */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">작성자 이름 memberName(필수)</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="memberName"
                  name="memberName"
                  value={memberName}
                  placeholder="작성자 이름을 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 작성자 이메일 memberEmail */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">작성자 이메일 memberEmail(필수)</strong>
              </div>
              <div className="col-10">
                <Input
                  type="text"
                  id="memberEmail"
                  name="memberEmail"
                  value={memberEmail}
                  placeholder="작성자 이메일을 입력하세요."
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="dash" />
            {/* 이미지 */}
            <div className="row">
              <div className="col-2">
                <strong className="lab-comm">이미지</strong>
              </div>
              <div className="col-10">
                <Input type="multiImg" id="imageUrl" name="imageUrl" url={imageUrl} alt="" onChange={imgChange} />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="foot-panel">
        <div className="btn-group">
          <Link
            to={{
              pathname: `/board/listArticle`,
            }}
            className="btn-default"
          >
            목록
          </Link>
          <button type="button" className="btn-slate" onClick={() => saveArticleData(data)}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};
export default ListArticleDetailForm;
