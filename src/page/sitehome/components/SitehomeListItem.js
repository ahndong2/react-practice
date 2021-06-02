/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Input } from 'components/molecules';
import { HOST_DEVOPS } from 'Constans';

// 날짜 + 시간 합치기
const setDateTime = (date, time) => {
  const dateTime = date ? `${date} ${time}` : '';
  return dateTime;
};

// 날짜 시간 쪼개기
const splitDateTime = dateTime => {
  const dt = dateTime.split(' ');
  return {
    date: dt[0] === '0000-00-00' ? '9999-12-31' : dt[0],
    time: dt[1].substring(0, 5) === '23:59' ? '00:00' : dt[1].substring(0, 5),
  };
};

const SitehomeListItem = props => {
  const { idx, serviceType, item, listItemChange, removeItem } = props;
  const [data, setData] = useState(item);

  const disabledLow =
    (serviceType === '4' && (idx === 0 || idx === 1)) || ((serviceType === '5' || serviceType === '6') && idx === 0);

  // 일반 변경
  const changeData = (e, id, value) => {
    setData({ ...data, [id.split('_')[0]]: value, isUpdate: true });
  };

  // 날짜 시간 validation 및 update
  const dateTimeValidate = (id, value) => {
    // 데이터 입력시 서버에 저장될 beginDate, endDate를 업데이트
    const copyData = { ...data, isUpdate: true, [id]: value };
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
    dateTimeValidate(id.split('_')[0], value);
  };
  // 시간 변경
  const timeChange = (e, id, value) => {
    dateTimeValidate(id.split('_')[0], value);
  };

  // 종료일 없음
  const isEndDateChange = e => {
    const { checked } = e.target;
    const copyData = { ...data, isUpdate: true, isEndDate: checked };
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

  // remove this item
  const remove = () => {
    removeItem(idx);
  };

  // 타입에따른 항목조절
  const type = () => {
    const options = [
      { label: '배너', value: '1' },
      { label: '게시판', value: '2' },
      { label: '기획전', value: '3' },
      { label: '최근본 상품', value: '4' },
      { label: '고정 템플릿', value: '5' },
    ];

    return (
      <Input
        type="select"
        id={`type_${idx}`}
        name={`type_${idx}`}
        value={data.type}
        options={options}
        onChange={changeData}
        disabled={disabledLow}
      />
    );
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
        id={`templateNo_${idx}`}
        name={`templateNo_${idx}`}
        value={data.templateNo}
        options={options}
        onChange={changeData}
        disabled={disabledLow}
      />
    );
  };

  // window banner view open
  const openBannerViewWindow = () => {
    window.open(
      `${HOST_DEVOPS}/banner/view?key=${data.key}`,
      '_blank',
      'width=1460px, height=1000px, menubar=no, status=no, titlebar=no, location=no, toolbar=no',
    );
  };

  useEffect(() => {
    // isUpdate : 무한루프 방지 업데이트 완료되면 false 로 변경 업데이트시 true 변경 추후 고민
    if (data.isUpdate) return;
    // 최초 진입시 서버에서 내려온 beginDate, endDate를 컴포넌트 내부에서 사용할 변수로 분기
    const copyItem = { ...item };
    if (copyItem.beginDate) {
      copyItem.sDate = splitDateTime(copyItem.beginDate).date;
      copyItem.sTime = splitDateTime(copyItem.beginDate).time;
    }
    if (copyItem.endDate) {
      copyItem.eDate = splitDateTime(copyItem.endDate).date;
      copyItem.eTime = splitDateTime(copyItem.endDate).time;
      if (copyItem.eDate === '9999-12-31') {
        copyItem.isEndDate = true;
      } else {
        copyItem.isEndDate = false;
      }
    }
    if (copyItem.isEndDate === 1) {
      copyItem.eDate = '9999-12-31';
      copyItem.eTime = '00:00';
      copyItem.isEndDate = true;
    }

    setData(copyItem);
  }, [item]);

  useEffect(() => {
    if (!data.isUpdate) return;
    listItemChange(idx, data);
  }, [data]);

  return (
    <tr>
      {/* 정렬 */}
      <td className="txt-center">
        <button type="button" className={disabledLow ? '' : 'handleBtn'}>
          <i className="fa fa-bars" />
          <span className="screen-out">move</span>
        </button>
      </td>
      <td className="txt-center">{data.ID}</td>
      {/* 타입 */}
      <td className="txt-center">{type()}</td>
      {/* 타이틀 */}
      <td className="txt-center">
        {data.title}
        <br />
        {data.subTitle}
      </td>
      {/* Key */}
      <td className="txt-center">
        <div className="inp-group">
          <Input
            type="text"
            id={`key_${idx}`}
            name={`key_${idx}`}
            value={data.key}
            onChange={changeData}
            disabled={disabledLow}
          />
          <button type="button" className="btn-blue" onClick={openBannerViewWindow}>
            <i className="fa fa-link" />
          </button>
        </div>
      </td>

      {/* 노출여부 */}
      <td className="txt-center">
        <Input
          type="select"
          id={`status_${idx}`}
          name={`status_${idx}`}
          value={data.status}
          options={[
            { label: '노출', value: 1 },
            { label: '비노출', value: 0 },
          ]}
          onChange={changeData}
          disabled={disabledLow}
        />
      </td>

      {/* 시작일 ~ 종료일 */}
      <td className="txt-center">
        <div className="inp-group">
          <Input
            type="date"
            id={`sDate_${idx}`}
            name="sDate"
            placeholder="시작일"
            value={data.sDate}
            onChange={dateChange}
            disabled={disabledLow}
          />
          <span className="txt-inp">
            <i className="fa fa-clock" />
          </span>
          <Input
            type="time"
            id={`sTime_${idx}`}
            name="sTime"
            value={data.sTime}
            onChange={timeChange}
            disabled={disabledLow}
          />
          <span className="txt-inp">~</span>
          <Input
            type="date"
            id={`eDate_${idx}`}
            name="eDate"
            placeholder="종료일"
            value={data.eDate}
            disabled={disabledLow || data.isEndDate}
            onChange={dateChange}
          />
          <span className="txt-inp">
            <i className="fa fa-clock" />
          </span>
          <Input
            type="time"
            id={`eTime_${idx}`}
            name="eTime"
            value={data.eTime}
            disabled={disabledLow || data.isEndDate}
            onChange={timeChange}
          />
          <span className="txt-inp">
            <Input
              type="checkbox"
              name={`isEndDate_${idx}`}
              options={[
                {
                  id: `isEndDate_${idx}`,
                  label: '종료일없음',
                  value: data.isEndDate,
                  checked: data.isEndDate === true,
                },
              ]}
              onChange={isEndDateChange}
              disabled={disabledLow}
            />
          </span>
        </div>
      </td>

      {/* 템플릿 No. */}
      <td className="txt-center">{getTemplateNo()}</td>

      {/* 삭제 */}
      <td className="txt-center">
        <span className="txt-inp" onClick={remove} disabled={disabledLow}>
          <i className="fa fa-times" />
        </span>
      </td>
    </tr>
  );
};

export default SitehomeListItem;
