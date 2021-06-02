import React, { useState } from 'react';
import axios from 'axios';
import store from 'store';
import { spinnerAction } from 'store/reducer';
import { HOST_API_DEVOPS } from 'Constans';
import { Debug } from 'library/Debug';
import styles from './Login.module.scss';

const Login = () => {
  const [user, setUser] = useState({
    loginId: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e, id, value) => {
    setUser({
      ...user,
      [id]: value,
    });
  };
  const handleClick = async () => {
    let response;
    try {
      // spinner 시작
      store.dispatch(spinnerAction.setSpinner(true));
      const request = {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        method: 'POST',
        url: `${HOST_API_DEVOPS}/member/signin`,
        data: user,
        type: 'json',
      };

      response = await axios(request);
      if (response) {
        const { result } = response.data;
        if (result.code === 1) {
          window.location.href = '/deploy/index';
        } else {
          window.alert(result.message);
        }
      }
      Debug.log('[response API]: ', response);
    } catch (error) {
      Debug.log('[response API error]: ', error);
    } finally {
      // spinner 종료
      store.dispatch(spinnerAction.setSpinner(false));
    }
  };

  return (
    <article id="mArticle" className={styles.article}>
      <div className={styles.box}>
        <form onSubmit={e => e.preventDefault()}>
          <fieldset>
            <legend>Login to your account</legend>
            <h2 className={styles.title}>
              DEVOPS<small> Beta 2.0</small>
            </h2>
            <p className={styles.subtitle}>Enter your credentials below</p>
            <div className="inp-group">
              <label htmlFor="loginId" className={`txt-inp ${styles.label}`}>
                <i className="fa fa-user" />
              </label>
              <input
                type="text"
                id="loginId"
                placeholder="아이디를 입력하세요."
                value={user.loginId || ''}
                onChange={e => {
                  handleChange(e, 'loginId', e.target.value);
                }}
              />
            </div>
            <div className={`inp-group ${styles.input}`}>
              <label htmlFor="password" className={`txt-inp ${styles.label}`}>
                <i className="fa fa-lock" />
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="비밀번호를 입력하세요."
                value={user.password || ''}
                onChange={e => {
                  handleChange(e, 'password', e.target.value);
                }}
              />
              <button
                type="button"
                className={`btn-default ${styles.label}`}
                title={`${showPassword ? 'Hide' : 'Show'} Password`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa fa-eye${showPassword ? '-slash' : ''}`} />
                <span className="screen-out">{showPassword ? 'Hide' : 'Show'} Password</span>
              </button>
            </div>
            <button type="submit" className={`btn-slate ${styles.button}`} onClick={handleClick}>
              Sign in
            </button>
          </fieldset>
        </form>
      </div>
      {/* <p className={styles.info}>
        위메프오 어드민은{' '}
        <a href="https://www.google.com/intl/ko/chrome/" target="_blank" rel="noopener noreferrer">
          Chrome 브라우저
        </a>
        에 최적화 되어있습니다.
        <br />
        <a href="https://www.google.com/intl/ko/chrome/" target="_blank" rel="noopener noreferrer">
          Chrome 브라우저
        </a>
        를 이용해주세요.
      </p> */}
    </article>
  );
};

export default Login;
