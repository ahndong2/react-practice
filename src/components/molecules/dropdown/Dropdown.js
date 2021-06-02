import React, { useState } from 'react';
import styles from './Dropdown.module.scss';

const Dropdown = ({ name, className, children }) => {
  const [show, setShow] = useState(false);
  const { wrapper, button, content } = className;

  window.addEventListener('click', e => {
    if (!e.target.matches(`.${styles.button}`)) {
      setShow(false);
    }
  });

  return (
    <div className={styles.wrapper + (wrapper ? ` ${wrapper}` : '')}>
      <button
        type="button"
        className={styles.button + (button ? ` ${button}` : '')}
        onClick={() => {
          setShow(!show);
        }}
      >
        {name} <i className="fa fa-chevron-down" />
      </button>
      {show && <div className={styles.content + (content ? ` ${content}` : '')}>{children}</div>}
    </div>
  );
};

Dropdown.defaultProps = {
  className: {
    component: '',
    button: '',
    content: '',
  },
};

export default Dropdown;
