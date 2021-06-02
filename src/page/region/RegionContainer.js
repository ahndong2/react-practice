/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { fromJS } from 'immutable';
import { Input } from 'components/molecules';
import { ListPageLayout } from 'components/templates';
import { SearchForm } from 'components/organisms';
import { Debug } from 'library/Debug';
import { donMyunDataContorll, drawPolygonDataControll } from './utils/region';
import { getRegionSiList, getRegionDoGunList, getRegionDongList } from './api/region';
import { KakaoMap } from './components';

const LoginContainer = () => {
  const [region, setRegion] = useState(
    fromJS({
      sidoList: [],
      gugunList: [],
      dongList: [],
      sido: '',
      gugun: '',
      dong: '',
      selectDong: {},
      polygonData: [],
      polygonDBData: '',
    }),
  );
  // region Data immutable -> js
  const { sidoList, gugunList, dongList, sido, gugun, dong, selectDong, polygonData, polygonDBData } = region.toJS();
  // 검색 폼 초기데이터
  const searchInfo = [
    {
      type: 'select',
      title: '시/도',
      id: 'sido',
      options: sidoList,
      value: sido,
    },
    {
      type: 'select',
      title: '시/구/군',
      id: 'gugun',
      dash: true,
      options: gugunList,
      value: gugun,
    },
    {
      type: 'select',
      title: '동/면',
      id: 'dong',
      dash: true,
      options: dongList,
      value: dong,
    },
  ];

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

        const newData = region.merge({
          isAPICall: false,
          sidoList: data,
        });
        setRegion(newData);
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

        const newData = region.merge({
          isAPICall: false,
          sido: value,
          gugun: '',
          gugunList: data,
          dong: '',
          dongList: [],
          selectDong: {},
        });
        setRegion(newData);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  // 동 정보 가져오기
  const getDongList = async value => {
    if (value === '') return;
    const response = await getRegionDongList(sido, value);
    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        data.forEach(val => {
          const v = val;
          v.label = v.name;
          v.value = v.code;
        });
        data.unshift({ label: '동/면', value: '' });
        const newData = region.merge({
          isAPICall: false,
          gugun: value,
          dongList: data,
          dong: '',
        });
        setRegion(newData);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  const onSearch = () => {
    if (!sido || !gugun || !dong) {
      window.alert('모든 항목을 선택해 주세요.');
      return;
    }
    const newData = region.merge(donMyunDataContorll(selectDong.polygon));
    setRegion(newData);
  };

  // search form 데이터 변경시
  const onChange = data => {
    Debug.log(data);
    const newData = region.merge(data);
    setRegion(newData);
    // if (Object.keys(data).length === 1) {
    //   getGugunList(data[Object.keys(data)[Object.keys(data).length - 1]]);
    // } else if (Object.keys(data).length === 2) {
    //   getDongList(data[Object.keys(data)[Object.keys(data).length - 1]]);
    // } else if (Object.keys(data).length === 3) {
    //   const code = data[Object.keys(data)[Object.keys(data).length - 1]];
    //   const selectDong = dongList.find(v => v.code === code);
    //   const newData = region.merge(
    //     {
    //       selectDong,
    //       dong: selectDong.code,
    //     },
    //     donMyunDataContorll(selectDong.polygon),
    //   );

    //   setRegion(newData);
    // }
  };

  // draw polygonData 직접 그린 polygonData
  const updatePolygonData = data => {
    const newData = region.merge(drawPolygonDataControll(data));
    setRegion(newData);
  };

  useEffect(() => {
    if (!sido) return;
    getGugunList(sido);
  }, [sido]);

  useEffect(() => {
    if (!gugun) return;
    getDongList(gugun);
  }, [gugun]);

  useEffect(() => {
    if (!dong) return;
    const selectDong = dongList.find(v => v.code === dong);
    const newData = region.merge(
      {
        selectDong,
      },
      donMyunDataContorll(selectDong.polygon),
    );

    setRegion(newData);
  }, [dong]);

  // 최초 로드 시/구 조회
  useEffect(() => {
    getSiList();
  }, []);

  return (
    <ListPageLayout title="지역 선택" path={[{ name: '지역 선택' }]}>
      <SearchForm
        key="searchForm"
        searchInfo={searchInfo}
        onChange={onChange}
        onSubmit={onSearch}
        hideSearchButton={false}
      />

      <KakaoMap key="table" polygonData={polygonData} updatePolygonData={updatePolygonData} />
      <Input key="pagination" type="textArea" rows="7" cols="30" value={polygonDBData} readOnly />
    </ListPageLayout>
  );
};

export default LoginContainer;
