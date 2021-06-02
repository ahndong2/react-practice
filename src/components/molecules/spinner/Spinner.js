import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from 'store/reducer/spinner/Spinner';
import styles from './Spinner.module.scss';

const Spinner = props => {
  const { show } = props;
  const { classList } = document.body;

  show ? classList.add(styles.visible) : classList.remove(styles.visible);

  return <>{show ? <div className={styles.Spinner} role="progressbar" /> : null}</>;
};

const mapStateToProps = state => ({
  show: state.spinner.show,
});

// 이런 구조로 하면 나중에 다양한 리덕스 모듈을 적용해야 하는 상황에서 유용합니다.
const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(action, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
