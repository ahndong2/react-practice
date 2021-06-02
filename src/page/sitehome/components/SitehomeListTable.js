import React from 'react';
import { fromJS } from 'immutable';
import { ReactSortable } from 'react-sortablejs';
import { SitehomeListItem } from './index';
import styles from './SitehomeListTable.module.css';

const SitehomeListTable = ({ serviceType, sitehomeListData, sitehomeListDataChange, removeListItem }) => {
  const sitehomeList = sitehomeListData.toJS();
  // item 변경
  const listItemChange = (idx, item) => {
    const newData = sitehomeListData.set(idx, item);
    sitehomeListDataChange(fromJS(newData));
  };

  // 모바일 홈구성 table List 항목
  const getListItems = () => {
    if (sitehomeList.length === 0) {
      return (
        <tbody>
          <tr>
            <td className="txt-center" colSpan="9">
              등록된 항목이 없습니다.
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <ReactSortable
        tag="tbody"
        list={sitehomeList}
        setList={list => {
          sitehomeListDataChange(fromJS(list));
        }}
        handle=".handleBtn"
        onEnd={e => {
          e.item.style.transform = null;
        }}
      >
        {sitehomeList.map((v, idx) => {
          return (
            <SitehomeListItem
              key={v.ID || `sitehomeList_${idx}`}
              idx={idx}
              serviceType={serviceType}
              item={{ ...v, isUpdate: false }}
              listItemChange={listItemChange}
              removeItem={removeListItem}
            />
          );
        })}
      </ReactSortable>
    );
  };

  return (
    <div className={`tbl-comm ${styles.tbl_sitehome}`}>
      <table>
        <colgroup>
          <col width="3%" />
          <col width="10%" />
          <col width="10%" />
          <col width="20%" />
          <col width="10%" />
          <col />
          <col width="10%" />
          <col width="3%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="txt-center">
              정렬
            </th>
            <th scope="col" className="txt-center">
              ID
            </th>
            <th scope="col" className="txt-center">
              타입
            </th>
            <th scope="col" className="txt-center">
              타이틀 / <br />
              서브타이틀
            </th>
            <th scope="col" className="txt-center">
              key
            </th>
            <th scope="col" className="txt-center">
              노출여부
            </th>
            <th scope="col" className="txt-center">
              시작일 ~ 종료일
            </th>
            <th scope="col" className="txt-center">
              템플릿 No.
            </th>
            <th scope="col" className="txt-center">
              삭제
            </th>
          </tr>
        </thead>
        {getListItems()}
      </table>
    </div>
  );
};

export default SitehomeListTable;
