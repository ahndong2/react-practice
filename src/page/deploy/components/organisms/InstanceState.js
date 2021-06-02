/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Input, Pagination } from 'components/molecules';
import { Debug } from 'library/Debug';
import { getInstanceList, getDeployResult } from '../../api/deploy';

const InstanceState = ({ serverGroupID }) => {
  const [instance, setInstance] = useState({
    serverGroupID,
    instanceId: '',
    page: 1,
    limit: 5,
    totalItems: 0,
    instanceResult: '',
  });
  const [instanceList, setInstanceList] = useState([]);

  // Deploy API Controll
  const getInstanceListAPI = async param => {
    const response = await getInstanceList(param);

    if (response) {
      const { result, data, paging } = response.data;
      if (result.code === 1) {
        setInstanceList(data || []);
        setInstance({ ...instance, page: paging.page, totalItems: paging.totalCount });
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };

  const instanceChange = data => {
    setInstance({ ...instance, ...data });
    Debug.log({ ...instance, ...data });
  };

  const deployResultAPI = async () => {
    if (!instance.instanceId) {
      window.alert('인스턴스를 선택 해주세요.');
      return;
    }
    const param = {
      instanceId: instance.instanceId,
      serverGroupID: instance.serverGroupID,
    };
    const response = await getDeployResult(param);

    if (response) {
      const { result, data } = response.data;
      if (result.code === 1) {
        setInstance({ ...instance, instanceResult: data });
      } else {
        window.alert(`담당 개발자에게 문의주세요.\n${result.message}`);
      }
    }
  };
  const ListItem = ({ data }) => {
    const status = () => {
      let color;
      let str;
      switch (data.status) {
        case 16:
          str = 'running';
          color = 'green';
          break;
        case 48:
          str = 'terminated';
          color = 'red';
          break;
        case 64:
          str = 'stopping';
          color = 'orange';
          break;
        case 80:
          str = 'stopped';
          color = 'red';
          break;
        default:
          str = 'pending';
          color = 'orange';
          break;
      }
      return <span className={`badge-${color}`}>{str}</span>;
    };
    const ssmStatus = () => {
      let color;
      let str;
      switch (data.ssmStatus) {
        case 0:
          str = 'disable';
          color = 'default';
          break;
        default:
          str = 'enable';
          color = 'green';
          break;
      }
      return <span className={`badge-${color}`}>{str}</span>;
    };
    const commandStatus = () => {
      let color = '';
      if (data.commandStatus === 'Success') {
        color = 'green';
      } else if (
        data.commandStatus === 'Failed' ||
        data.commandStatus === 'Cancelled' ||
        data.commandStatus === 'TimedOut' ||
        data.commandStatus === 'Cancelling'
      ) {
        color = 'red';
      } else if (
        data.commandStatus === 'Pending' ||
        data.commandStatus === 'InProgress' ||
        data.commandStatus === 'Delayed'
      ) {
        color = 'orange';
      } else {
        color = 'default';
      }
      return <span className={`badge-${color}`}>{data.commandStatus}</span>;
    };
    return (
      <tr>
        <td className="txt-center">
          <Input
            type="radio"
            id={`${data.serverID}_${data.serverName}`}
            name="radio"
            options={[{ id: 'radio', value: true }]}
            value={instance.instanceId === data.serverID}
            onChange={() => instanceChange({ instanceId: data.serverID, serverGroupID })}
          />
        </td>
        <td className="txt-center">{data.serverID}</td>
        <td className="txt-center">{data.serverName}</td>
        <td className="txt-center">{data.serverDns}</td>
        <td className="txt-center">{data.serverIp}</td>
        <td className="txt-center">{data.description}</td>
        <td className="txt-center">{status()}</td>
        <td className="txt-center">{ssmStatus()}</td>
        <td className="txt-center">{commandStatus()}</td>
      </tr>
    );
  };
  // 인스턴스 리스트
  const instanceListItems = () => {
    if (instanceList.length === 0) {
      return (
        <tr>
          <td colSpan="9" className="txt-center">
            검색 결과가 존재하지 않습니다.
          </td>
        </tr>
      );
    }
    return instanceList.map(v => {
      const key = `${v.serverName}_${v.serverID}`;
      return <ListItem key={key} data={v} />;
    });
  };
  useEffect(() => {
    // api
    getInstanceListAPI(instance);
  }, []);

  return (
    <>
      <div className="panel-comm">
        <div className="head-panel">
          <h2 className="tit-panel">
            <i className="fa fa-info-circle" /> 인스턴스 {instance.totalItems}개
          </h2>
          <div className="tool-panel">
            <button type="button" className="btn-slate" onClick={deployResultAPI}>
              출력보기
            </button>
          </div>
        </div>
        <div className="body-panel">
          <div className="tbl-comm">
            <table>
              <thead>
                <tr>
                  <th scope="col">선택</th>
                  <th scope="col">인스턴스ID</th>
                  <th scope="col">인스턴스명</th>
                  <th scope="col">인스턴스DNS</th>
                  <th scope="col">인스턴스IP</th>
                  <th scope="col">인스턴스종류</th>
                  <th scope="col">인스턴스상태</th>
                  <th scope="col">SSM 연결 상태</th>
                  <th scope="col">배포 상태</th>
                </tr>
              </thead>
              <tbody>{instanceListItems()}</tbody>
            </table>
            {instance.totalItems > 5 && (
              <Pagination
                currentPage={instance.page}
                totalItems={instance.totalItems}
                itemsPerPage={instance.limit}
                maxSize={10}
                search={page => {
                  const param = { ...instance, page };
                  getInstanceListAPI(param);
                }}
              />
            )}
          </div>
        </div>
      </div>
      {instance.instanceResult && (
        <div className="panel-comm">
          <div className="head-panel">
            <h2 className="tit-panel">
              <i className="fa fa-info-circle" /> 인스턴스 결과
            </h2>
          </div>
          <div className="body-panel">
            <pre>{instance.instanceResult}</pre>
          </div>
        </div>
      )}
    </>
  );
};
export default InstanceState;
