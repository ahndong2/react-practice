/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Modal } from 'components/organisms';
import { Input } from 'components/molecules';
import { Debug } from 'library/Debug';
import { getRegionSiList, getRegionDoGunList, getRegionDongList } from '../../api/banner';
import styles from './BannerAddRegionModal.module.scss';

const defRegionData = {
  sidoList: [],
  gugunList: [],
  dongList: [],
  sido: '',
  gugun: '',
  dong: [],
  isAll: false,
};
const BannerAddRegionModal = ({ show, showModal, addRegionData }) => {
  const [region, setRegion] = useState({
    ...defRegionData,
    isAPICall: true,
  });

  // 시 정보 가져오기
  const getSiList = async () => {
    const response = await getRegionSiList();
    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        data.forEach(val => {
          const v = val;
          v.label = v.name;
          v.value = v.code;
        });
        data.unshift({ label: '시/도', value: '' });
        setRegion({
          ...region,
          isAPICall: false,
          sidoList: data,
        });
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  // 구/군 정보 가져오기
  const getGugunList = async value => {
    if (value === '') return;
    const response = await getRegionDoGunList(value);
    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        data.forEach(val => {
          const v = val;
          v.label = v.name;
          v.value = v.code;
        });
        data.unshift({ label: '구/군', value: '' });
        setRegion({
          ...region,
          isAPICall: false,
          sido: value,
          gugun: '',
          gugunList: data,
          dongList: [],
        });
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };
  // 동 정보 가져오기
  const getDongList = async value => {
    if (value === '') return;
    const response = await getRegionDongList(region.sido, value);
    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        data.forEach(val => {
          const v = val;
          v.label = v.name;
          v.value = v.code;
        });
        setRegion({
          ...region,
          isAPICall: false,
          gugun: value,
          dongList: data,
          dong: [],
        });
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  // 셀렉트 박스 변경
  const selectRegionInfo = (e, id, value) => {
    if (id === 'sido') {
      // 시/도 선택시
      if (value === '') {
        setRegion({
          ...defRegionData,
          sidoList: region.sidoList,
          sido: value,
        });
        return;
      }
      getGugunList(value);
    } else if (id === 'gugun') {
      // 구/군 선택시
      if (value === '') {
        setRegion({
          ...defRegionData,
          sidoList: region.sidoList,
          sido: region.sido,
          gugunList: region.gugunList,
          gugun: value,
        });
        return;
      }

      getDongList(value);
      const el = document.querySelector(`.${styles.scroll}`);
      el.scrollTop = 0;
    } else if (id === 'dong') {
      const copyData = [...region.dongList];
      copyData.forEach(val => {
        const v = val;
        if (v.value === value) {
          v.className = v.className ? null : styles.select;
        }
      });
      setRegion({
        ...region,
        dongList: copyData,
      });
    }
  };

  // 지역 전체 선택
  const selectAllRegion = () => {
    if (region.gugunList.length === 0 || region.dongList.length === 0) {
      return;
    }
    const copyData = [...region.dongList];
    const isAll = region.isAll !== true;
    copyData.forEach(val => {
      const v = val;
      v.className = region.isAll ? null : styles.select;
    });

    setRegion({
      ...region,
      isAll,
      dongList: copyData,
    });
  };

  // 모달 footer Button Setting
  const footerBtn = [
    {
      name: '저장',
      className: 'btn-slate',
      callback: () => {
        const regionData = [...region.dongList].filter(v => v.className);
        addRegionData(regionData);

        setRegion({
          ...defRegionData,
          sidoList: region.sidoList,
          isAPICall: false,
        });
        showModal(false);
      },
    },
  ];

  // 최초 진입시 시 정보 조회
  useEffect(() => {
    if (show) {
      setRegion({
        ...region,
        ...defRegionData,
        sidoList: region.sidoList,
      });
      Debug.log(show);
    }
    if (!region.isAPICall) {
      return;
    }
    if (show) {
      getSiList();
    }
  }, [show]);

  return (
    <Modal title="노출 지역 설정" show={show} footerBtn={footerBtn} showModal={showModal}>
      <Input
        type="select"
        id="sido"
        name="sido"
        value={region.sido}
        options={region.sidoList}
        onChange={selectRegionInfo}
      />
      <Input
        type="select"
        id="gugun"
        name="gugun"
        value={region.gugun}
        options={region.gugunList}
        onChange={selectRegionInfo}
      />
      <button type="button" className={`btn-default ${styles.button}`} onClick={selectAllRegion}>
        지역 전체 선택
      </button>
      <div className={`box-comm ${styles.scroll}`}>
        {region.dongList.map((v, i) => {
          return (
            <button
              key={`dong_${i}`}
              className={`btn-default ${styles.item}${v.className ? ` ${v.className}` : ''}`}
              onClick={e => {
                selectRegionInfo(e, 'dong', v.value);
              }}
            >
              {v.label}
            </button>
          );
        })}
      </div>
    </Modal>
  );
};
export default BannerAddRegionModal;
