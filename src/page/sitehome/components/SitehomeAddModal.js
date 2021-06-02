/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import moment from 'moment';
import { Input } from 'components/molecules';
import { Modal } from 'components/organisms';
import { insertSiteHomeViewList } from '../api/sitehome';

// 날짜 + 시간 합치기
const setDateTime = (date, time) => {
  const dateTime = date ? `${date} ${time}` : '';
  return dateTime;
};
const SitehomeAddModal = ({ serviceType, show, showModal }) => {
  const [data, setData] = useState({
    beginDate: '',
    sDate: '',
    sTime: '00:00',
    title: '',
    isEndDate: false,
    endDate: '',
    eDate: '',
    eTime: '00:00',
    key: '',
    status: '1',
    templateNo: '1',
    type: '1',
  });
  // 필수값 disabled flag
  const isSave = !data.type || !data.status || !data.beginDate || !data.endDate || !data.templateNo;

  const dataChange = (e, id, value) => {
    const updateData = {
      ...data,
      [id]: value,
    };
    setData(updateData);
  };

  // 날짜 시간 validation 및 update
  const dateTimeValidate = (id, value) => {
    // 데이터 입력시 서버에 저장될 beginDate, endDate를 업데이트
    const copyData = { ...data, [id]: value };
    let beginDate = '';
    let endDate = '';
    if (copyData.sDate && copyData.sTime) {
      beginDate = setDateTime(copyData.sDate, copyData.sTime);
      copyData.beginDate = beginDate;
    }

    if (copyData.eDate && copyData.eTime) {
      endDate = setDateTime(copyData.eDate, copyData.eTime);
      copyData.endDate = endDate;
    }
    if (beginDate && endDate) {
      if (moment(beginDate) > moment(endDate)) {
        window.alert('시작일은 종료일보다 클수 없습니다.');
        return;
      }
    }

    setData(copyData);
  };
  // 날짜 변경
  const dateChange = (id, value) => {
    dateTimeValidate(id, value);
  };
  // 시간 변경
  const timeChange = (e, id, value) => {
    dateTimeValidate(id, value);
  };

  // 종료일 없음
  const isEndDateChange = e => {
    const { checked } = e.target;
    const copyData = { ...data, isEndDate: checked };
    if (checked) {
      copyData.endDate = '9999-12-31 00:00:00';
      copyData.eDate = '9999-12-31';
      copyData.eTime = '00:00';
    } else {
      copyData.endDate = '';
      copyData.eDate = '';
      copyData.eTime = '00:00';
    }

    setData(copyData);
  };

  // 템플릿 No.
  const getTemplateNo = () => {
    const options = [];
    for (let i = 1; i < 33; i += 1) {
      options.push({ label: i, value: i });
    }

    return (
      <Input
        type="select"
        id="templateNo"
        name="templateNo"
        value={data.templateNo}
        options={options}
        onChange={dataChange}
      />
    );
  };

  const insertSiteHomeViewListAPICall = async () => {
    const newData = { ...data, isEndDate: data.isEndDate ? 0 : 1 };
    const response = await insertSiteHomeViewList(serviceType, newData);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        window.alert('저장되었습니다.');
        showModal(false, 'save');
      }
    }
  };

  // 모달 푸터 버튼
  const footerBtn = [
    {
      name: '저장',
      className: 'btn-slate',
      disabled: isSave,
      callback: () => {
        insertSiteHomeViewListAPICall();
      },
    },
  ];

  return (
    <Modal
      title="항목 추가"
      footerBtn={footerBtn}
      show={show}
      showModal={showModal}
      bodyStyle={{ overflow: 'visible' }}
    >
      <form onSubmit={e => e.preventDefault()}>
        <fieldset>
          <legend>모바일홈 신규 생성</legend>
          {/* 타입 */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">타입</strong>
            </div>
            <div className="col-10">
              <Input
                type="select"
                id="type"
                name="type"
                value={data.type}
                options={[
                  { label: '배너', value: '1' },
                  { label: '게시판', value: '2' },
                  { label: '기획전', value: '3' },
                  { label: '최근본상품', value: '4' },
                  { label: '고정 템플릿', value: '5' },
                ]}
                onChange={dataChange}
              />
            </div>
          </div>
          <div className="dash" />
          {/* 타이틀/서브타이틀 */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">타이틀/서브타이틀</strong>
            </div>
            <div className="col-10">
              <Input type="text" id="title" name="title" value={data.title} onChange={dataChange} />
            </div>
          </div>
          <div className="dash" />
          {/* Key */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">Key</strong>
            </div>
            <div className="col-10">
              <Input type="text" id="key" name="key" value={data.key} onChange={dataChange} />
            </div>
          </div>
          <div className="dash" />
          {/* 노출여부 */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">노출여부</strong>
            </div>
            <div className="col-10">
              <Input
                type="select"
                id="status"
                name="status"
                value={data.status}
                options={[
                  { label: '노출', value: '1' },
                  { label: '비노출', value: '0' },
                ]}
                onChange={dataChange}
              />
            </div>
          </div>
          <div className="dash" />
          {/* 시작일/종료일 */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">시작일/종료일</strong>
            </div>
            <div className="col-10">
              <div className="inp-group">
                <Input
                  type="date"
                  id="sDate"
                  name="sDate"
                  placeholder="시작일"
                  value={data.sDate}
                  onChange={dateChange}
                />
                <span className="txt-inp">
                  <i className="fa fa-clock" />
                </span>
                <Input type="time" id="sTime" name="sTime" value={data.sTime} onChange={timeChange} />
                <span className="txt-inp">~</span>
                <Input
                  type="date"
                  id="eDate"
                  name="eDate"
                  placeholder="종료일"
                  value={data.eDate}
                  disabled={data.isEndDate}
                  onChange={dateChange}
                />
                <span className="txt-inp">
                  <i className="fa fa-clock" />
                </span>
                <Input
                  type="time"
                  id="eTime"
                  name="eTime"
                  value={data.eTime}
                  disabled={data.isEndDate}
                  onChange={timeChange}
                />
                <span className="txt-inp">
                  <Input
                    type="checkbox"
                    name="isEndDate"
                    options={[
                      {
                        id: `isEndDate`,
                        label: '종료일없음',
                        value: data.isEndDate,
                        checked: data.isEndDate === true,
                      },
                    ]}
                    onChange={isEndDateChange}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="dash" />
          {/* 템플릿 No. */}
          <div className="row">
            <div className="col-2">
              <strong className="lab-comm">템플릿 No.</strong>
            </div>
            <div className="col-10">{getTemplateNo()}</div>
          </div>
        </fieldset>
      </form>
    </Modal>
  );
};
export default SitehomeAddModal;
