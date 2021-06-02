import React, { useState, useEffect } from 'react';
import styles from './Modal.module.scss';

/**
 * Modal component
 * @param {string} title
 * @param {object} style : {{width:'700px'}}
 * @param {boolean} show : true/false
 * @param {stirng} search.key : key
 * @param {element} children
 * @param {object} footerBtn : [{ name: '확인', className: 'btn-slate', callback: () => {}, disabled: data.memo === ''}],
 * @param {function} showModal : 열고 닫는 function
 * @example
 * import { Modal } from 'components/organisms';
 * const [modal, setModal] = useState(false);
 * const showModal = flag => {
 *    setModal(flag);
 * };
 * footerBtn은 없으면 footer 영역 사라짐
 * const footerBtn = [{name: '등록하기',className: 'btn-slate',callback: () => {setAdjustmentBtnClick();},disabled: true,}];
 * <Modal title="임의조정 등록" show={show} style={{ width: '700px' }} footerBtn={footerBtn} showModal={showModal}>
 * {children}
 * </Modal>
 */

const Modal = ({ title, style, bodyStyle, show, children, headerBtn, footerBtn = [], showModal = () => {} }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const footerBtnList = footerBtn.map((footer, i) => {
    const k = `_${String(i)}`;
    return (
      <button
        type="button"
        key={k}
        className={footer.className}
        onClick={() => footer.callback()}
        disabled={footer.disabled}
      >
        {footer.name}
      </button>
    );
  });
  if (visible) {
    document.body.classList.add(styles.visible);
    return (
      <div className={styles.outer}>
        <div className={styles.inner} width="fit-content" style={style}>
          <div className={styles.head}>
            <strong className={styles.title}>{title}</strong>
            {headerBtn && (
              <button type="button" className={styles.close} onClick={() => showModal(false)}>
                <i className="fa fa-times" />
                <span className="screen-out">닫기</span>
              </button>
            )}
          </div>
          <div className={styles.body} style={bodyStyle}>
            {children}
          </div>
          <div className={styles.foot}>{footerBtnList}</div>
        </div>
      </div>
    );
  }
  document.body.classList.remove(styles.visible);
  return null;
};

Modal.defaultProps = {
  title: '',
  headerBtn: true,
  footerBtn: [
    {
      name: '확인',
      className: 'btn-slate',
      callback: () => {},
    },
  ],
  style: {},
  show: false,
  showModal: () => {},
};

export default Modal;
