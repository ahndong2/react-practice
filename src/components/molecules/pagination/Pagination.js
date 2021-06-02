/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { Debug } from 'library/Debug';

const Pagination = ({ currentPage, itemsPerPage, totalItems = 0, maxSize = 10, search }) => {
  const [page, setPage] = useState({
    startPage: 1,
    endPage: maxSize,
  });
  const [totalPage, setTotalPage] = useState(0);
  const [pageList, setPageList] = useState([]);

  // 시작 페이지 변경
  useEffect(() => {
    drawPaging();
  }, [page]);

  useEffect(() => {
    const tp = Math.ceil(totalItems / itemsPerPage);
    setTotalPage(tp);

    const data = {
      startPage: 1,
      endPage: tp > maxSize ? maxSize : tp,
    };
    setPage(data);
  }, [totalItems]);

  const drawPaging = () => {
    const newArr = [];
    for (let i = page.startPage; i <= page.endPage; i += 1) {
      newArr.push(i);
    }
    if (newArr.length === 0) {
      newArr.push(1);
    }
    setPageList(newArr);
  };

  const getPage = pageList.map((v, i) => {
    return (
      <li key={i} className={v === currentPage ? 'active' : ''}>
        <a
          href="#none"
          onClick={e => {
            e.preventDefault();
            search(v);
          }}
        >
          {v}
        </a>
      </li>
    );
  });

  const prevPage = n => {
    if (n === 0) return;
    const sp = page.startPage;
    const ep = page.endPage;

    if (n === 1) {
      // 맨앞
      const data = {
        startPage: 1,
        endPage: maxSize > totalPage ? totalPage : maxSize,
      };
      setPage(data);
    } else if (n < sp) {
      // 화면에 보이는 첫 페이지 번호
      const s = sp - maxSize < 1 ? 1 : sp - maxSize;
      const e = sp - maxSize < 1 ? maxSize : ep - maxSize;

      const data = {
        startPage: s,
        endPage: e,
      };
      setPage(data);
    }
    search(n);
  };
  const nextPage = n => {
    if (n > totalPage) return;
    const ep = page.endPage;
    if (n === totalPage) {
      // 맨뒤
      const data = {
        startPage: totalPage - (maxSize - 1) > 1 ? totalPage - (maxSize - 1) : 1,
        endPage: totalPage,
      };
      setPage(data);
    } else if (n > page.endPage) {
      // 화면에 보이는 마지막 페이지 번호
      const s = ep + maxSize > totalPage ? totalPage - (maxSize - 1) : ep + 1;
      const e = ep + maxSize > totalPage ? totalPage : ep + maxSize;
      // maxsize만큼 증가
      const data = {
        startPage: s,
        endPage: e,
      };
      setPage(data);
    }
    search(n);
  };

  return (
    <ul className="paging-comm">
      <li className={currentPage === 1 ? 'disabled' : ''}>
        <a
          href="#none"
          onClick={e => {
            e.preventDefault();
            if (currentPage === 1) {
              return;
            }
            prevPage(1);
          }}
        >
          <i className="fa fa-angle-double-left" />
          <span className="screen-out">처음</span>
        </a>
      </li>
      <li className={currentPage === 1 ? 'disabled' : ''}>
        <a
          href="#none"
          onClick={e => {
            e.preventDefault();
            if (currentPage === 1) {
              return;
            }
            prevPage(currentPage - 1);
          }}
        >
          <i className="fa fa-angle-left" />
          <span className="screen-out">이전</span>
        </a>
      </li>
      {getPage}
      <li className={totalItems === 0 || currentPage === Math.ceil(totalItems / itemsPerPage) ? 'disabled' : ''}>
        <a
          href="#none"
          onClick={e => {
            e.preventDefault();
            if (totalItems === 0 || currentPage === Math.ceil(totalItems / itemsPerPage)) {
              return;
            }
            nextPage(currentPage + 1);
          }}
        >
          <span className="screen-out">다음</span>
          <i className="fa fa-angle-right" />
        </a>
      </li>
      <li className={totalItems === 0 || currentPage === Math.ceil(totalItems / itemsPerPage) ? 'disabled' : ''}>
        <a
          href="#none"
          onClick={e => {
            e.preventDefault();
            if (totalItems === 0 || currentPage === Math.ceil(totalItems / itemsPerPage)) {
              return;
            }
            nextPage(totalPage);
          }}
        >
          <span className="screen-out">끝</span>
          <i className="fa fa-angle-double-right" />
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
