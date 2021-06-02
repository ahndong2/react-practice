import React, { useState } from 'react';
import styles from './AccessLog.module.css';

const ListItem = ({ data }) => {
  const [fold, setFold] = useState(false);
  const statusBadge = () => {
    const color = data.method === 'GET' ? 'blue' : 'green';
    return <span className={`badge-${color}`}>{data.method}</span>;
  };

  const openDetail = () => {
    setFold(!fold);
  };

  return (
    <tr>
      <td className="txt-center">{data.ID}</td>
      <td className="txt-center">{data.userID}</td>
      <td className="txt-center">{data.ip}</td>
      <td className="txt-center">{data.created}</td>
      <td className="txt-center">{statusBadge()}</td>
      <td className="txt-center">{data.function}</td>
      <td className={`${styles.url} txt-left`}>
        <span className={styles.span_icon} onClick={openDetail} onKeyPress={openDetail} role="button" tabIndex="0">
          <i className="fa fa-angle-double-right" />
          {data.url}
        </span>
        {fold && (
          <div>
            <div className={`${styles.boxWrap} row`}>
              <span className="badge-default">QUERY STRING</span>
              <div className={`${styles.box} col-12`}>{JSON.stringify(data.queryString)}</div>
            </div>
            <div className={`${styles.boxWrap} row`}>
              <span className="badge-default">POST DATA</span>
              <div className={`${styles.box} col-12`}>
                <pre>{JSON.stringify(data.body, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

const AccessLogListTable = ({ accessLogList }) => {
  // 배너 리스트
  const accessLogListItems = () => {
    if (accessLogList.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="txt-center">
            검색 결과가 존재하지 않습니다.
          </td>
        </tr>
      );
    }
    return accessLogList.map(v => {
      return <ListItem key={v.ID} data={v} />;
    });
  };

  return (
    <div className="tbl-comm">
      <table>
        <thead>
          <tr>
            <th scope="col" className="txt-center">
              No.
            </th>
            <th scope="col" className="txt-center">
              UserID
            </th>
            <th scope="col" className="txt-center">
              IP
            </th>
            <th scope="col" className="txt-center">
              Created
            </th>
            <th scope="col" className="txt-center">
              Method
            </th>
            <th scope="col" className="txt-center">
              Function
            </th>
            <th scope="col" className="txt-center">
              URL & RequestData
            </th>
          </tr>
        </thead>
        <tbody>{accessLogListItems()}</tbody>
      </table>
    </div>
  );
};
export default AccessLogListTable;
