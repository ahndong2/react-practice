import React from 'react';
import { HeaderLayout, Main, Footer } from 'components/organisms';
import styles from './LoginLayout.module.scss';

const LoginLayout = ({ children }) => {
  return (
    <div id="wmpoWrap" className={styles.wrapper}>
      <HeaderLayout />
      <Main className={styles.container}>{children}</Main>
      <Footer />
    </div>
  );
};

export default LoginLayout;
