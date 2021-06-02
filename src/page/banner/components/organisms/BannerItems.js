/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input } from 'components/molecules';
import moment from 'moment';
import BannerAddRegionModal from './BannerAddRegionModal';
import styles from './BannerItems.module.scss';

// 날짜 + 시간 합치기
const setDateTime = (date, time) => {
  const dateTime = date ? `${date} ${time}` : '';
  return dateTime;
};

// 날짜 시간 쪼개기
const splitDateTime = dateTime => {
  const dt = dateTime.split(' ');
  return {
    date: dt[0],
    time: dt[1].substring(0, 5),
  };
};

const BannerItems = ({ idx, item, dataBannerItemsChange, removeBannerItem }) => {
  const [data, setData] = useState(item);
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
      copyItem.endDateState = false;
    } else {
      copyItem.eDate = '';
      copyItem.eTime = '00:00';
      copyItem.endDateState = true;
    }

    setData({ ...copyItem });
  }, [item]);

  // parents 에 조합된 데이터 전송
  useEffect(() => {
    if (!data.isUpdate) return;
    dataBannerItemsChange(idx, data);
  }, [data]);

  // 이미지 변경
  const imageChange = (id, imageUrl) => {
    // if (imageUrl === '') return;
    setData({ ...data, imageUrl, isUpdate: true });
  };

  // 일반 데이터 변경
  const dataChange = (e, id, value) => {
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
  const endDateStateChange = e => {
    const { checked } = e.target;
    const copyData = { ...data, isUpdate: true, endDateState: checked };
    if (checked) {
      copyData.endDate = '';
      copyData.eDate = '';
      copyData.eTime = '00:00';
    } else {
      copyData.endDate = data.beginDate;
    }

    setData(copyData);
  };

  // 배너 아이템 삭제
  const removeItem = () => {
    removeBannerItem(idx);
  };
  // 지역설정 전체삭제
  const allDeleteRegionsList = () => {
    setData({
      ...data,
      isUpdate: true,
      regions: [],
    });
  };

  // 지역설정 단일삭제
  const deleteRegionsList = i => {
    const copyRegionList = [...data.regions];
    setData({
      ...data,
      isUpdate: true,
      regions: copyRegionList.filter((v, idx) => idx !== i),
    });
  };

  // 설정지역 element 생성
  const regionsListElement = () => {
    const regions = data.regions || [];
    if (regions.length === 0) {
      return <p className="txt-center">설정된 지역이 존재하지 않습니다.</p>;
    }
    return regions.map((v, i) => {
      const key = `regions_${v.name}${idx}${i}`;
      return (
        <React.Fragment key={key}>
          <div className="inp-group">
            <Input type="text" id={`regions_${idx}_${i}`} name="name" value={v.name} readonly />
            <span className="txt-inp" onClick={e => deleteRegionsList(i)}>
              <i className="fa fa-times" />
            </span>
          </div>
        </React.Fragment>
      );
    });
  };

  const [modal, setModal] = useState(false);
  const showModal = flag => {
    setModal(flag);
  };
  // 지역설정 모달 Open
  const openRegionsModal = () => {
    showModal(true);
  };

  const addRegionData = regionData => {
    const copyRegion = [...data.regions, ...regionData];
    copyRegion.forEach(val => {
      const v = val;
      v.name = v.fullName || v.name;
    });

    // 설정지역 중복 설정
    // const mergeData = copyRegion.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

    setData({
      ...data,
      isUpdate: true,
      regions: copyRegion,
    });
  };

  return (
    <>
      <div className={styles.wrap}>
        <button type="button" className={styles.button}>
          <i className="fa fa-bars" />
          <span className="screen-out">move</span>
        </button>
        <div className={styles.row}>
          {/* 배너 이미지 */}
          <div className={`panel-comm ${styles.panel}`}>
            <div className="head-panel">
              <strong className="tit-panel">배너 이미지</strong>
            </div>
            <div className="body-panel">
              <Input
                type="img"
                id={`imageUrl_${idx}`}
                name="imageUrl"
                className={styles.image}
                url={data.imageUrl}
                onChange={imageChange}
              />
            </div>
          </div>
          <div className={`panel-comm ${styles.panel} ${styles.mid}`}>
            <div className="body-panel">
              <Input
                type="text"
                id={`info_${idx}`}
                name="info"
                value={data.info}
                placeholder="설명을 입력하세요."
                onChange={dataChange}
              />
              <div className={`inp-group ${styles['inp-group']}`}>
                <Input
                  type="select"
                  id={`target_${idx}`}
                  value={data.target}
                  options={[
                    { label: '_blank', value: '1' },
                    { label: '_self', value: '2' },
                    { label: '_parent', value: '3' },
                    { label: '_top', value: '4' },
                  ]}
                  onChange={dataChange}
                />
                <Input
                  type="text"
                  id={`link_${idx}`}
                  name="link"
                  value={data.link}
                  placeholder="링크를 입력하세요."
                  onChange={dataChange}
                />
              </div>
              <div className="inp-group">
                <Input
                  type="date"
                  id={`sDate_${idx}`}
                  name="sDate"
                  placeholder="시작일"
                  value={data.sDate}
                  onChange={dateChange}
                />
                <span className="txt-inp">
                  <i className="fa fa-clock" />
                </span>
                <Input type="time" id={`sTime_${idx}`} name="sTime" value={data.sTime} onChange={timeChange} />
                <span className="txt-inp">~</span>
                <Input
                  type="date"
                  id={`eDate_${idx}`}
                  name="eDate"
                  placeholder="종료일"
                  value={data.eDate}
                  disabled={data.endDateState}
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
                  disabled={data.endDateState}
                  onChange={timeChange}
                />
                <span className="txt-inp">
                  <Input
                    type="checkbox"
                    name={`endDateState_${idx}`}
                    options={[
                      {
                        id: `endDateState_${idx}`,
                        label: '종료일없음',
                        value: data.endDateState,
                        checked: data.endDateState === true,
                      },
                    ]}
                    onChange={endDateStateChange}
                  />
                </span>
              </div>
              <Input
                type="radio"
                id={`status_${idx}`}
                name={`status_${idx}`}
                options={[
                  { label: '노출', value: '1' },
                  { label: '비노출', value: '0' },
                ]}
                value={data.status}
                checked={data.status === '1'}
                onChange={dataChange}
              />
            </div>
          </div>
          {/* 노출 지역설정 */}
          <div className={`panel-comm ${styles.panel}`}>
            <div className="head-panel">
              <strong className="tit-panel">설정지역</strong>
              <span className="tool-panel">
                <div className="btn-group">
                  <button type="button" className="btn-red" onClick={allDeleteRegionsList}>
                    전체삭제
                  </button>
                  <button type="button" className="btn-blue" onClick={openRegionsModal}>
                    노출지역설정
                  </button>
                </div>
              </span>
            </div>
            <div className={`body-panel ${styles.scroll}`}>{regionsListElement()}</div>
          </div>
        </div>
        <button type="button" className={styles.button} onClick={removeItem}>
          <i className="fa fa-times" />
          <span className="screen-out">삭제</span>
        </button>
      </div>
      <BannerAddRegionModal show={modal} showModal={showModal} addRegionData={addRegionData} />
    </>
  );
};

export default BannerItems;
