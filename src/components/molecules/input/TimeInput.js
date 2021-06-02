import React from 'react';
import SelectInput from './SelectInput';

/**
 * 앞에 0 이 붙은 숫자를 만든다.
 * @param {object} 변경할 대상
 * @param {int} 총 자릿수 (default: 2)
 * @param {string} 앞에 붙일 요소 (default: 0)
 * */
const fixedSize = (target, length, value) => {
  if (typeof length === 'undefined') {
    length = 2;
  }
  if (typeof value === 'undefined') {
    value = '0';
  }

  for (let i = 0; i < length; i++) {
    value += value;
  }
  return (value + target).slice(-length);
};

/*
 *
 * @param minuteBy (string) 지정한 분단위 만큼 설정 가능
 * */
const TimeInput = ({ data }) => {
  const timeList = [];

  let { minuteBy = 30 } = data;
  const { disableBefore } = data;
  let disable = true;

  minuteBy *= 1;

  for (let hour = 0; hour < 25; hour++) {
    if (hour === 24) {
      break;
    }

    for (let minute = 0; minute < 59; minute++) {
      const newMinute = minute * minuteBy;

      if (newMinute > 59) {
        break;
      }

      const time = `${fixedSize(hour)}:${fixedSize(newMinute)}`;

      if (!disableBefore) {
        disable = false;
      } else if (time === disableBefore) {
        disable = false;
      }

      timeList.push({
        label: `${fixedSize(hour)}:${fixedSize(newMinute)}`,
        value: `${fixedSize(hour)}:${fixedSize(newMinute)}`,
        disabled: disable,
      });
    }
  }

  const timeData = {
    ...data,
    options: timeList,
  };
  return (
    <>
      <SelectInput data={timeData} />
    </>
  );
};

export default TimeInput;
