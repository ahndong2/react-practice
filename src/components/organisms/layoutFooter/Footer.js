import React, { Component } from 'react';
import styles from './Footer.module.scss';

class Footer extends Component {
  render() {
    return (
      <footer id="wmpoFoot" className={styles.foot}>
        <h2 className="screen-out">서비스 이용정보</h2>
        <small className={styles.copy}>COPYRIGHT © WMPO</small>
      </footer>
    );
  }
}

export default Footer;
