import React from 'react';
import { Main } from 'components/organisms';

const WithoutHeaderLayout = ({ children }) => {
  return (
    <div id="wmpoWrap">
      <Main>{children}</Main>
    </div>
  );
};

export default WithoutHeaderLayout;
