/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { getSessionStorage } from 'library/Utils';
import { DefaultLayout } from 'components/templates';
import { HOST_DEVOPS } from 'Constans';
import { BannerViewForm } from './components/organisms';
import { getBannerDetail, insertBanner, updateBanner } from './api/banner';

const BannerviewContainer = props => {
  const { match } = props;
  // defData
  const [banner, setBanner] = useState({
    isAPICall: true,
    isDataChange: false,
    mode: match.path === '/banner/insert' ? 'insert' : 'view',
    key: '',
    title: '',
    info: '',
    status: 1,
    bannerItems: [],
  });

  const getBannerData = async key => {
    const response = await getBannerDetail(key);
    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        // 배너 정보 추가
        setBanner({ ...banner, isAPICall: false, ...data.banner, bannerItems: [...data.bannerItems] });
      } else if (result.code === 401) {
        window.alert('삭제된 배너입니다.');
        window.location.href = `${HOST_DEVOPS}/banner/list`;
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
        setBanner({ key, isAPICall: false, title: '', info: '', status: 1, bannerItems: [] });
      }
    }
  };

  const saveData = async detail => {
    let response;
    if (detail.mode === 'insert') {
      const sendData = {
        ...detail,
        createdID: getSessionStorage('manager').ID,
        createdName: getSessionStorage('manager').name,
        createdEmail: getSessionStorage('manager').loginID,
      };
      response = await insertBanner(sendData);
    } else {
      const sendData = {
        ...detail,
        modifiedID: getSessionStorage('manager').ID,
        modifiedName: getSessionStorage('manager').name,
        modifiedEmail: getSessionStorage('manager').loginID,
      };
      response = await updateBanner(sendData);
    }
    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        if (detail.mode === 'insert') {
          const { key } = response.data.data;
          window.alert('등록 되었습니다.');
          window.location.href = `${HOST_DEVOPS}/banner/view/?key=${key}`;
        } else {
          window.alert('수정 되었습니다.');
          window.location.reload();
        }
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  useEffect(() => {
    if (!banner.isAPICall) {
      return;
    }
    if (banner.mode === 'view') {
      // get query String
      const query = queryString.parse(props.location.search);
      getBannerData(query.key);
    }
  }, [banner]);
  return (
    <DefaultLayout
      path={[
        { name: '사이트 관리' },
        { name: '배너관리' },
        { name: banner.mode === 'insert' ? '배너등록' : '배너수정' },
      ]}
    >
      <BannerViewForm banner={banner} saveData={saveData} />
    </DefaultLayout>
  );
};

export default BannerviewContainer;
