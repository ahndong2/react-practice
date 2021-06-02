import React from 'react';
import { Header, Nav, Main, Footer } from 'components/organisms';
import styles from './DefaultLayout.module.scss';

const DefaultLayout = ({ title, path, children }) => {
  return (
    <div id="wmpoWrap" className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Nav />
        <div className={styles.page}>
          <Main className="wmpo-cont" title={title} path={path}>
            {children}
          </Main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
