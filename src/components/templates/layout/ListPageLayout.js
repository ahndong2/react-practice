import React from 'react';
import DefaultLayout from './DefaultLayout';
import styles from './ListPageLayout.module.scss';

const ListPageLayout = ({ path, title, subtitle, children }) => {
  const createElement = key => {
    if (children && children.length) return children.map(v => v.key === key && v);
    return children && children.key === key && children;
  };

  const searchForm = createElement('searchForm');
  const tool = createElement('tool');
  const table = createElement('table');
  const pagination = createElement('pagination');
  const foot = createElement('foot');
  const modal = createElement('modal');

  return (
    <>
      <DefaultLayout path={path}>
        <div className="row">
          <aside id="mAside" className={styles.aside}>
            {searchForm}
          </aside>
          <article id="mArticle" className={styles.article}>
            <div className="panel-comm">
              <div className="head-panel">
                <h2 className="tit-panel">
                  <i className="fa fa-search" /> {title} {subtitle && <small className="txt-muted">{subtitle}</small>}
                </h2>
                {tool}
              </div>
              <div className="body-panel">
                {table}
                {pagination}
              </div>
              {foot}
            </div>
          </article>
        </div>
      </DefaultLayout>
      {modal}
    </>
  );
};

export default ListPageLayout;
