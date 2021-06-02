import React, { useEffect, useState } from 'react';
import { Input } from 'components/molecules';
import { ReactSortable } from 'react-sortablejs';
import BannerItems from './BannerItems';
import styles from './BannerItems.module.scss';

const BannerViewForm = ({ banner, saveData }) => {
  // 배너 데이터
  const [data, setData] = useState(banner);

  // 가상 배너 항목 아이디
  const [customID, setCustomID] = useState(0);
  useEffect(() => {
    setData(banner);
  }, [banner]);

  // 배너 데이터 change event
  const dataChange = (e, id, value) => {
    setData({
      ...data,
      isDataChange: true,
      [id]: value,
    });
  };

  // 배너 항목 change event
  const dataBannerItemsChange = (idx, item) => {
    const copyBannerItems = [...data.bannerItems];
    copyBannerItems[idx] = item;

    setData({
      ...data,
      isDataChange: true,
      bannerItems: copyBannerItems,
    });
  };

  // 배너 항목 추가
  const addBannerItems = () => {
    setData({
      ...data,
      bannerItems: [
        ...data.bannerItems,
        {
          bannerItemID: customID,
          info: '',
          imageUrl: '',
          link: '',
          target: '1',
          status: '1',
          beginDate: '',
          endDate: '',
          sDate: '',
          eDate: '',
          sTime: '00:00',
          eTime: '00:00',
          endDateState: false,
          regions: [],
        },
      ],
    });
    setCustomID(customID + 1);
  };

  // 배너 항목 삭제
  const removeBannerItem = i => {
    setData({ ...data, bannerItems: [...data.bannerItems].filter((v, idx) => idx !== i) });
  };

  // 배너 항목 element Draw
  const drawBannerItemsElement = () => {
    if (data.bannerItems.length === 0) {
      return (
        <div className="body-panel">
          <div className="txt-desc txt-center">배너 항목이 존재하지 않습니다.</div>
        </div>
      );
    }

    return (
      <ReactSortable
        className={`body-panel ${styles.body}`}
        list={data.bannerItems}
        setList={bannerList => {
          setData({ ...data, bannerItems: bannerList });
        }}
        handle={`.${styles.button}`}
        ghostClass={styles.ghost}
      >
        {data.bannerItems.map((v, i) => {
          const key = !v.bannerItemID ? `key_${i}` : v.bannerItemID;
          return (
            <BannerItems
              key={key}
              idx={i}
              item={{ ...v, isUpdate: false }}
              dataBannerItemsChange={dataBannerItemsChange}
              removeBannerItem={removeBannerItem}
            />
          );
        })}
      </ReactSortable>
    );
  };

  // 배너 저장 validation
  const validateData = () => {
    const copyData = { ...data, isDataChange: false };

    if (!copyData.title) {
      window.alert('제목을 입력해주세요.');
      return;
    }

    if (copyData.bannerItems.length > 0) {
      for (let i = 0; i < copyData.bannerItems.length; i += 1) {
        const v = copyData.bannerItems[i];
        if (!v.beginDate) {
          window.alert('시작일을 입력해주세요.');
          return;
        }
        // if (v.regions.length === 0) {
        //   window.alert('노출지역을 최소 1개 선택해주세요.');
        //   return;
        // }
      }
    }

    // bannerItems data 에 sort 추가/변경
    copyData.bannerItems.forEach((v, idx) => {
      const val = v;
      val.sort = idx;
    });

    saveData(copyData);
  };

  // 목록 이동
  const goList = () => {
    if (data.isDataChange) {
      const confirm = window.confirm('입력한 내용이 저장되지 않았습니다. 이동하시겠습니까?');
      if (confirm) {
        window.location.href = '/banner/list';
      } else {
        return;
      }
    }
    window.location.href = '/banner/list';
  };
  return (
    <article id="mArticle">
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-info-circle" /> 배너 등록
          </h2>
        </div>
        <div className="body-panel">
          <form onSubmit={e => e.preventDefault()}>
            <fieldset>
              <legend>배너 등록</legend>
              {/* 배너 key */}
              <div className="row">
                <div className="col-2">
                  <strong className="lab-comm">배너 key</strong>
                </div>
                <div className="col-10">
                  {data.mode === 'insert' ? (
                    <Input
                      type="text"
                      id="key"
                      name="key"
                      value={data.key}
                      placeholder="미입력 시 자동 생성됩니다."
                      onChange={dataChange}
                    />
                  ) : (
                    <p className="txt-desc">{data.key}</p>
                  )}
                </div>
              </div>
              <div className="dash" />
              {/* 제목 */}
              <div className="row">
                <div className="col-2">
                  <strong className="lab-comm">제목</strong>
                </div>
                <div className="col-10">
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    placeholder="제목을 입력하세요."
                    onChange={dataChange}
                  />
                </div>
              </div>
              <div className="dash" />
              {/* 설명 */}
              <div className="row">
                <div className="col-2">
                  <strong className="lab-comm">설명</strong>
                </div>
                <div className="col-10">
                  <Input
                    type="text"
                    id="info"
                    name="info"
                    value={data.info}
                    placeholder="배달/픽업, 티켓딜, 게이트 중 어디에 노출하는지 입력하세요."
                    onChange={dataChange}
                  />
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
                    type="radio"
                    id="status"
                    name="status"
                    options={[
                      { label: '노출', value: '1' },
                      { label: '비노출', value: '0' },
                    ]}
                    value={data.status}
                    onChange={dataChange}
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-info-circle" /> 배너 항목 등록
          </h2>
          <div className="tool-panel">
            <button type="button" className="btn-slate" onClick={addBannerItems}>
              항목추가
            </button>
          </div>
        </div>
        {drawBannerItemsElement()}
        <div className="foot-panel">
          <div className="btn-group">
            <button type="button" className="btn-default" onClick={() => goList()}>
              목록
            </button>
            <button type="button" className="btn-slate" onClick={() => validateData()}>
              <i className="fa fa-check" /> {data.mode === 'insert' ? '등록' : '수정'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
export default BannerViewForm;
