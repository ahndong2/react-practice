/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { HOST_DEVOPS, HOST_API, HOST_API_DEVOPS, APP_ENV } from 'Constans';
import { getSessionStorage, setSessionStorage } from 'library/Utils';
import { Dropdown } from 'components/molecules';
import { API } from 'library/API';
import { Debug } from 'library/Debug';

import HeaderLayout from './HeaderLayout';
import styles from './Header.module.scss';

const Header = () => {
  const manager = getSessionStorage('manager');
  let name = '';

  if (manager) {
    name = manager.name;
  }

  const className = {
    wrapper: styles.user,
    button: styles.button,
  };

  const handleClick = () => {
    const { innerWidth } = window;
    const { classList } = document.body;

    if (innerWidth > 960) {
      classList.contains('fold') ? classList.remove('fold') : classList.add('fold');
    } else {
      classList.contains('open') ? classList.remove('open') : classList.add('open');
    }
  };

  const logout = async () => {
    window.sessionStorage.removeItem('menu');
    const cookies = new Cookies();
    let domain;
    if (APP_ENV === 'development') {
      domain = `.${window.location.hostname}`;
    } else {
      const hostName = window.location.hostname.split('.');
      hostName.splice(0, 1);
      domain = hostName.join('.');
    }
    cookies.remove('token', { path: '/', domain });
    window.location.href = HOST_API_DEVOPS;
  };

  const getMenuList = async () => {
    const response = await API({ method: 'GET', url: `${HOST_API}/admin/me` });
    if (response) {
      const { data, result } = response.data;
      if (result.code === 1) {
        if (!data.ID || !data.loginId) {
          window.alert('Manager 정보를 정상적으로 받아오지 못했습니다.');
          return;
        }
        setSessionStorage('manager', {
          ID: data.ID,
          loginID: data.loginId,
          name: data.name,
        });
      } else {
        const msg = `Manager 정보를 정상적으로 받아오지 못했습니다.\n${result.message}`;
        window.alert(msg);
      }
    } else {
      Debug.error('[getMenuList] 서버에서 데이터를 받아오지 못했습니다.');
    }
  };

  useEffect(() => {
    if (!getSessionStorage('manager')) {
      getMenuList();
    }
  }, []);
  return (
    <HeaderLayout>
      <button type="button" className={styles.toggle} onClick={handleClick}>
        <i className="fa fa-bars" />
        <span className="screen-out">접기 &#47; 펼치기</span>
      </button>
      <div className={styles.tools}>
        <Dropdown name={name} className={className}>
          <a href={`${HOST_DEVOPS}/manager/password`}>
            <i className="fa fa-cog" />
            비밀번호 변경
          </a>
          <span className={styles.divider} />
          <a href="#" onClick={logout}>
            <i className="fa fa-power-off" />
            로그아웃
          </a>
        </Dropdown>
      </div>
    </HeaderLayout>
  );
};

export default Header;
