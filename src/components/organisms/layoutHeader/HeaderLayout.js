import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const HeaderLayout = ({ children }) => {
  return (
    <header id="wmpoHead" className={styles.head}>
      <h1 className={styles.title}>
        <Link to="/" id="wmpoServiceLogo" className={styles.logo}>
          {/* <img src="//image.thecupping.co.kr/web/logo@3x.png" height="16" alt="위메프오" /> */}
          DEVOPS MANAGER
        </Link>
      </h1>
      {children}
    </header>
  );
};

export default HeaderLayout;
