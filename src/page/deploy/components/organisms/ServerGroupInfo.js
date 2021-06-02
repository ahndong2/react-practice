/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { getServerGroupDetail } from '../../api/deploy';

const ServerGroupInfo = ({ serverGroupID }) => {
  const [info, setInfo] = useState({
    serverGroupID,
    serverGroupTag: '',
    serverGroupName: '',
    type: '',
    serverGroupPath: '',
  });
  const getServerGroupDetailAPI = async () => {
    const response = await getServerGroupDetail(info.serverGroupID);

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        setInfo(data);
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };
  useEffect(() => {
    getServerGroupDetailAPI();
  }, []);
  return (
    <div className="panel-comm">
      <div className="head-panel">
        <h2 className="tit-panel">
          <i className="fa fa-info-circle" /> 서버 그룹 정보
        </h2>
      </div>
      <div className="body-panel">
        <div className="tbl-comm">
          <table>
            <thead>
              <tr>
                <th scope="col">서버그룹ID</th>
                <th scope="col">서버그룹Tag</th>
                <th scope="col">서버그룹명</th>
                <th scope="col">AWS인스턴스 종류</th>
                <th scope="col">배포경로</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{info.serverGroupID}</td>
                <td>{info.serverGroupTag}</td>
                <td>{info.serverGroupName}</td>
                <td>{info.type}</td>
                <td>{info.serverGroupPath}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ServerGroupInfo;
