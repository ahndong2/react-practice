import React from 'react';
import styles from './Deploy.module.css';

const ListItem = ({ data, rollback }) => {
  const successBadge = isSuccess => {
    let color;
    let str;
    switch (isSuccess) {
      case 1:
        color = 'green';
        str = 'success';
        break;
      default:
        color = 'red';
        str = 'fail';
        break;
    }

    return <span className={`badge-${color}`}>{str}</span>;
  };

  const historyClassName = `txt-center ${data.isRollback ? styles.isRollback : null}`;
  const branchsList = data.branches.map(v => {
    return (
      <tr key={v.ID}>
        <td className={historyClassName}>{v.ID}</td>
        <td className={historyClassName}>{v.deployHistoryID}</td>
        <td className={historyClassName}>{v.serverGroupID}</td>
        <td className={historyClassName}>{v.commitId}</td>
        <td className={historyClassName}>{v.serverGroupName}</td>
        <td className={historyClassName}>{v.serverGroupPath}</td>
        <td className={historyClassName}>{v.branchName}</td>
        <td className={historyClassName}>{successBadge(v.isSuccess)}</td>
        <td className={historyClassName}>{v.created}</td>
      </tr>
    );
  });

  return (
    <tbody>
      <tr>
        {data.enableRollback ? (
          <>
            <th colSpan="8">
              히스토리ID : {data.ID} / 배포자ID : {data.loginId} / 배포일시 : {data.created}
            </th>
            <th className="txt-center">
              <button type="button" className="btn-teal" onClick={() => rollback(data.ID)}>
                롤백
              </button>
            </th>
          </>
        ) : (
          <th colSpan="9">
            히스토리ID : {data.ID} / 배포자ID : {data.loginId} / 배포일시 : {data.created}
          </th>
        )}
      </tr>
      <tr>
        <th className="txt-center">히스토리상세ID</th>
        <th className="txt-center">히스토리ID</th>
        <th className="txt-center">서버그룹ID</th>
        <th className="txt-center">커밋ID</th>
        <th className="txt-center">서버그룹명</th>
        <th className="txt-center">배포경로</th>
        <th className="txt-center">브랜치명</th>
        <th className="txt-center">배포상태</th>
        <th className="txt-center">배포일시</th>
      </tr>
      {branchsList}
    </tbody>
  );
};

const HistoryListTable = ({ historyList, deployRollback }) => {
  // 배포현황 리스트
  const historyListItems = historyList.map(v => {
    return <ListItem key={v.ID} data={v} rollback={deployRollback} />;
  });

  return (
    <div className="tbl-comm">
      <table>
        {historyList.length > 0 && historyListItems}
        {historyList.length === 0 && (
          <tbody>
            <tr>
              <td colSpan="9" className="txt-center">
                검색 결과가 존재하지 않습니다.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
export default HistoryListTable;
