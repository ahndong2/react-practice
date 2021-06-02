import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Input from './Input';

/**
 * DateRangePicker input
 * 필요한 옵션은 추가적으로 더사용
 * @param {Object} {data}
 * @param {String} {data.name}
 * @param {String} {data.startDateId} - 'startDate'
 * @param {String} {data.startDate}
 * @param {String} {data.startDatePlaceholder} - '시작일'
 * @param {String} {data.endDateId} - 'endDate'
 * @param {String} {data.endDate}
 * @param {String} {data.endDatePlaceholder} - '종료일'
 * @param {String} {data.endDatebleId} - 'endDateble'
 * @param {function} {data.onChange} *필수
 * @return {(id, value)} id, value
 * @example
 * <Input type="daterangeSingle" startDate={{ value: String }} endDate={{ value: String }} onChange={function} />
 */

const DateRangeSingle = ({ data }) => {
  const {
    startDateId = 'startDate',
    endDateId = 'endDate',
    endDatebleId = 'endDateble',
    name,
    startDate = '',
    endDate = '',
    startDatePlaceholder = '시작일',
    endDatePlaceholder = '종료일',
    onChange = () => {},
  } = data;

  const [endDateble, setEndDateble] = useState(false);

  const handleChange = (id, value) => {
    if (moment(id === endDateId ? value : endDate).isBefore(id === endDateId ? startDate : value)) {
      alert(`${endDatePlaceholder}이 ${startDatePlaceholder}보다 빠름으로 선택할 수 없습니다.`);
    } else {
      onChange(id, value);
    }
  };

  const handleEndDateble = e => {
    const { checked } = e.target;
    if (checked) onChange(endDateId, '9999-12-31');
    setEndDateble(checked);
  };

  useEffect(() => {
    setEndDateble(endDate === '9999-12-31');
  }, [endDate]);

  return (
    <div className="inp-group">
      <Input
        type="date"
        id={startDateId}
        name={name}
        placeholder={startDatePlaceholder}
        value={startDate}
        onChange={handleChange}
      />
      <span className="txt-inp">~</span>
      <Input
        type="date"
        id={endDateId}
        name={name}
        placeholder={endDatePlaceholder}
        value={endDate === '9999-12-31' ? '' : endDate}
        disabled={endDateble}
        onChange={handleChange}
      />
      <span className="txt-inp">
        <Input
          type="checkbox"
          id={endDatebleId}
          onChange={handleEndDateble}
          options={[{ label: '종료일 없음', value: 1, checked: endDateble }]}
        />
      </span>
    </div>
  );
};

export default DateRangeSingle;
