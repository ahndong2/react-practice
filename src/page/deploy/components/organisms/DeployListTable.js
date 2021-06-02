/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { fromJS } from 'immutable';
import { Input } from 'components/molecules';

const ListItem = ({ data, idx, selectServer, deleteServerGroup }) => {
  const statusBadge = () => {
    let color;
    let str;
    switch (data.status) {
      case 2:
        color = 'red';
        str = 'fail';
        break;
      case 3:
        color = 'orange';
        str = 'Pending';
        break;
      default:
        color = 'green';
        str = 'success';
        break;
    }

    return <span className={`badge-${color}`}>{str}</span>;
  };

  return (
    <tr
      onClick={e => {
        // stoppropagation 적용 잘안됨. 다시체크
        if (e.target.type === 'checkbox' || e.target.type === 'button') return;
        selectServer(idx);
      }}
    >
      <td className="txt-center">
        <Input
          type="checkbox"
          name="check"
          options={[
            {
              id: `check_${idx}`,
              value: data.check || false,
              checked: data.check === true,
            },
          ]}
          onChange={e => selectServer(idx, e.target.checked)}
        />
      </td>
      <td className="txt-center">{statusBadge()}</td>
      <td className="txt-center">{data.serverGroupID}</td>
      <td className="txt-center">{data.serverGroupTag}</td>
      <td className="txt-center">{data.serverGroupName}</td>
      <td className="txt-center">{data.description}</td>
      <td className="txt-center">{data.serverGroupPath}</td>
      <td className="txt-center">{data.type}</td>
      <td className="txt-center">
        <button
          type="button"
          className="btn-slate"
          onClick={() => {
            const popupX = window.screen.width / 2 - 200 / 2;
            const popupY = window.screen.height / 2 - 300 / 2;
            window.open(
              `/deploy/detail/${data.serverGroupID}`,
              '_blank',
              `status=no, height=1500, width=1200, left=${popupX}, top=${popupY}`,
            );
          }}
        >
          <i className="fa fa-window-restore" /> 상세
        </button>
      </td>
      <td className="txt-center">
        <button
          type="button"
          className="btn-default"
          onClick={() => {
            deleteServerGroup(data.serverGroupID);
          }}
        >
          삭제
        </button>
      </td>
    </tr>
  );
};

const DeployListTable = forwardRef((props, ref) => {
  const { list, deleteServerGroupAPI } = props;
  const [data, setData] = useState(
    fromJS({
      isCheckAll: false,
      deployList: list,
    }),
  );

  const { isCheckAll, deployList } = data.toJS();
  useImperativeHandle(ref, () => ({
    getList() {
      return deployList;
    },
  }));

  // 전체 체크박스 선택
  const isCheckAllChange = () => {
    const chk = !isCheckAll;
    const newList = [...deployList];
    newList.forEach(v => {
      const val = v;
      val.check = !isCheckAll;
    });

    const newData = data.set('deployList', newList).set('isCheckAll', chk);
    setData(newData);
  };

  // 개별 체크박스 선택
  const selectServer = (idx, value) => {
    const val = value || !data.getIn(['deployList', idx, 'check']);

    // 개별 변경
    let newData = data.setIn(['deployList', idx, 'check'], val);
    let count = 0;

    // checkbox 이벤트시 전체갯수 체크
    const checkList = newData.get('deployList');
    checkList.forEach(v => {
      if (v.check) {
        count += 1;
      }
    });

    newData = newData.set('isCheckAll', count === checkList.length);

    setData(newData);
  };

  // 배포 리스트
  const deployListItems = () => {
    if (deployList.length === 0) {
      return (
        <tr>
          <td colSpan="9" className="txt-center">
            검색 결과가 존재하지 않습니다.
          </td>
        </tr>
      );
    }
    return deployList.map((v, idx) => {
      const key = `${v.serverGroupName}_${v.serverGroupID}`;
      return (
        <ListItem key={key} data={v} idx={idx} selectServer={selectServer} deleteServerGroup={deleteServerGroupAPI} />
      );
    });
  };

  useEffect(() => {
    const newData = data.merge({ isCheckAll: false, deployList: list });
    setData(newData);
  }, [list]);

  return (
    <div className="tbl-comm">
      <table>
        <thead>
          <tr>
            <th scope="col" className="txt-center">
              <Input
                type="checkbox"
                name="isCheckAll"
                options={[
                  {
                    id: 'isCheckAll',
                    value: isCheckAll,
                    checked: isCheckAll === true,
                  },
                ]}
                onChange={isCheckAllChange}
              />
            </th>
            <th scope="col" className="txt-center">
              서버그룹 Status
            </th>
            <th scope="col" className="txt-center">
              서버그룹ID
            </th>
            <th scope="col" className="txt-center">
              서버그룹Tag
            </th>
            <th scope="col" className="txt-center">
              서버그룹명
            </th>
            <th scope="col" className="txt-center">
              Description
            </th>
            <th scope="col" className="txt-center">
              배포경로
            </th>
            <th scope="col" className="txt-center">
              서버종류
            </th>
            <th scope="col" className="txt-center">
              상세정보
            </th>
            <th scope="col" className="txt-center">
              관리
            </th>
          </tr>
        </thead>
        <tbody>{deployListItems()}</tbody>
      </table>
    </div>
  );
});
export default DeployListTable;
