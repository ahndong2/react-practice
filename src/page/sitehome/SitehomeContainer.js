/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DefaultLayout } from 'components/templates';
import { fromJS } from 'immutable';
import { Input } from 'components/molecules/index';
import { getSiteHomeViewList, setSiteHomeViewList } from './api/sitehome';
import { SitehomeListTable, SitehomeAddModal } from './components';

const SitehomeContainer = () => {
  // serviceType 관리 (게이트: 1, 배달픽업: 2, 티켓: 3)
  const [serviceType, setServiceType] = useState('4');
  // sitehomeList
  const [sitehomeList, setSitehomeList] = useState(fromJS([]));

  // 모달 show/hide
  const [modal, setModal] = useState(false);

  // 서비스 타입 데이터 변경
  const serviceTypeChangeEvent = (e, id, value) => {
    const v = value;
    setServiceType(v);
  };

  const getSiteHomeViewListAPICall = async () => {
    const response = await getSiteHomeViewList(serviceType);

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        setSitehomeList(fromJS(data.items));
      }
    }
  };

  const setSiteHomeViewListAPICall = async () => {
    const list = sitehomeList.toJS();
    const newData = [...list];
    newData.forEach((v, i) => {
      const val = v;
      val.sort = i;
    });
    const response = await setSiteHomeViewList(serviceType, newData);

    if (response) {
      const { result } = response.data;
      if (result.code === 1) {
        window.alert('저장되었습니다.');
      }
    }
  };

  const showModal = (flag, mode) => {
    setModal(flag);

    // 모달 hide / 저장 또는 수정시 리스트 업데이트
    if (!flag && mode === 'save') {
      getSiteHomeViewListAPICall();
    }
  };

  // 항목 추가
  const addSitehomeItems = () => {
    showModal(true);
  };

  // 리스트 데이터 변경
  const sitehomeListDataChange = data => {
    setSitehomeList(data);
  };

  // remove List item
  const removeListItem = idx => {
    const removeData = sitehomeList.filter((_, i) => i !== idx);
    setSitehomeList(removeData);
  };

  // serviceType 이 업데이트되면 리스트 조회
  useEffect(() => {
    getSiteHomeViewListAPICall();
  }, [serviceType]);

  return (
    <DefaultLayout path={[{ name: '사이트 관리' }, { name: '모바일홈 구성' }]}>
      <article id="mArticle">
        <form>
          <fieldset>
            <legend>모바일홈 구성</legend>
            <div className="panel-comm">
              <div className="head-panel">
                <h2 className="tit-panel">
                  <i className="fa fa-dot-circle" /> 모바일홈 구성
                </h2>
              </div>
              <div className="body-panel">
                <div className="row">
                  <div className="col-10">
                    <button type="button" className="btn-blue" onClick={addSitehomeItems}>
                      <i className="fa fa-plus-circle" /> 항목추가
                    </button>
                  </div>
                  <div className="col-2">
                    <Input
                      type="select"
                      id="serviceType"
                      name="serviceType"
                      value={serviceType}
                      options={[
                        // { label: '게이트', value: '1' },
                        // { label: '배달픽업', value: '2' },
                        // { label: '티켓', value: '3' },
                        { label: '홈', value: '4' },
                        { label: '배달', value: '5' },
                        { label: '티켓', value: '6' },
                      ]}
                      onChange={serviceTypeChangeEvent}
                    />
                  </div>
                </div>
                <SitehomeListTable
                  serviceType={serviceType}
                  sitehomeListData={sitehomeList}
                  sitehomeListDataChange={sitehomeListDataChange}
                  removeListItem={removeListItem}
                />
              </div>
              <div className="foot-panel">
                <button type="button" className="btn-slate" onClick={setSiteHomeViewListAPICall}>
                  저장
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </article>
      {modal && <SitehomeAddModal serviceType={serviceType} show={modal} showModal={showModal} />}
    </DefaultLayout>
  );
};

export default SitehomeContainer;
