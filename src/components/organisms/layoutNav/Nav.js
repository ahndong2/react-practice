/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { HOST_DEVOPS } from 'Constans';
import './Nav.scss';

const MENU_LIST = [
  {
    icon: 'copy',
    title: '배포',
    link: '',
    sub: [
      { title: '배포 현황', link: '/deploy/index', host: 'HOST_DEVOPS' },
      { title: '배포', link: '/deploy/deploy', host: 'HOST_DEVOPS' },
    ],
  },
  {
    icon: 'sitemap',
    title: '사이트 관리',
    link: '',
    sub: [
      { title: '모바일홈 구성', link: '/sitehome/view', host: 'HOST_DEVOPS' },
      { title: '배너관리', link: '/banner/list', host: 'HOST_DEVOPS' },
    ],
  },
  {
    icon: 'edit',
    title: '게시판 관리',
    link: '',
    sub: [
      { title: '게시판 조회', link: '/board/listBoard', host: 'HOST_DEVOPS' },
      { title: '게시글 조회', link: '/board/listArticle', host: 'HOST_DEVOPS' },
    ],
  },
  {
    icon: 'desktop',
    title: '모니터링',
    link: '',
    sub: [{ title: 'Admin AccessLog', link: '/log/index', host: 'HOST_DEVOPS' }],
  },
  {
    icon: 'map-marker-alt',
    title: 'region',
    link: '',
    sub: [{ title: '지역 선택', link: '/region/index', host: 'HOST_DEVOPS' }],
  },
];
const Menu = ({ data, onClick }) => {
  const { icon, title, url, sub, active, expanded, open } = data;

  if (sub) {
    return (
      <li
        className={cx({
          active,
          expanded,
        })}
      >
        <button type="button" className="btn-menu" title={title} onClick={onClick}>
          <span className="ico-menu">
            <i className={`fa fa-${icon}`} />
          </span>
          <span className="txt-menu">{title}</span>
          <span className="ico-arr">
            <i className="fa fa-angle-right" />
          </span>
        </button>
        <ul data-submenu-title={title} className="list-menu">
          {sub.map((data, key) => {
            return <Menu key={key} data={data} />;
          })}
        </ul>
      </li>
    );
  }
  const newOpenWindow = () => {
    window.open(url, '_blank');
  };

  return (
    <li
      className={cx({
        active,
      })}
    >
      {open ? (
        <button
          type="button"
          className="link-menu"
          onClick={e => {
            newOpenWindow(e);
          }}
        >
          {title}
        </button>
      ) : (
        <a href={url || '#'} className="link-menu">
          {title}
        </a>
      )}
    </li>
  );
};

const Nav = () => {
  const [data, setData] = useState([]);

  const handleClick = e => {
    if (window.innerWidth > 960 && document.body.classList.contains('fold')) return;

    const { currentTarget } = e;
    const { title } = currentTarget;

    const newData = data.map(menu => {
      return { ...menu, expanded: menu.title === title ? !menu.expanded : false };
    });

    setData(newData);
  };

  const handleClose = () => {
    const { classList } = document.body;

    classList.remove('open');
  };

  const setMenuList = menuData => {
    const { pathname } = window.location;

    const newData = menuData.map(menu => {
      let active = false;
      let expanded = false;

      const sub = menu.sub.map(sub => {
        if (pathname.includes(sub.link)) {
          active = true;
          expanded = true;
        }

        let urlLink = '';
        if (sub.host === 'HOST_DEVOPS') {
          urlLink = HOST_DEVOPS + sub.link;
        }
        // else if (sub.host === 'HOST_DEVOPS2') {
        //   urlLink = HOST_DEVOPS2 + sub.link;
        // }

        return {
          ...sub,
          url: urlLink,
          active: pathname.includes(sub.link),
        };
      });

      return { ...menu, sub, active, expanded };
    });

    setData(newData);
  };

  useEffect(() => {
    setMenuList(MENU_LIST);
  }, []);

  return (
    <nav id="wmpoGnb">
      <h2 className="screen-out">메뉴</h2>
      <div className="head-gnb">
        <button type="button" className="btn-close" onClick={handleClose}>
          <i className="fa fa-times" />
          <span className="screen-out">닫기</span>
        </button>
      </div>
      <ul className="list-gnb">
        <li className="tit-menu">
          <i className="fa fa-ellipsis-h" />
          <span className="txt-menu">DEVOPS</span>
        </li>
        {data &&
          data.length > 0 &&
          data.map((data, key) => {
            return <Menu key={key} data={data} onClick={handleClick} />;
          })}
      </ul>
    </nav>
  );
};

export default Nav;
