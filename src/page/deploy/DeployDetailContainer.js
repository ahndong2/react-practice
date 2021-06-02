/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ServerGroupInfo, BranchList, InstanceState } from './components/organisms/index';

const DeployDetailContainer = props => {
  const { location } = props;
  const serverGroupID = location.pathname.split('/')[3] || '';
  if (!serverGroupID) {
    window.alert('서버그룹 ID가 없습니다. 재시도 해주세요.');
    window.close();
  }
  return (
    <>
      <ServerGroupInfo serverGroupID={serverGroupID} />
      <BranchList serverGroupID={serverGroupID} />
      <InstanceState serverGroupID={serverGroupID} />
    </>
  );
};
export default DeployDetailContainer;
