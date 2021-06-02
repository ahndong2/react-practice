import React, { useEffect, useState } from 'react';
import { Debug } from '../../../library/Debug';

const Pagination2 = props => {
  const [data, setData] = useState({
    currentPage: 1,
    itemsPerPage: 1,
    totalItems: 0,
    maxSize: 1,
    search: () => {},
  });

  const [page, setPage] = useState({
    startPage: data.currentPage,
    endPage: data.maxSize,
  });

  const [pageList, setPageList] = useState([]);

  const totalPage = () => {
    const total = data.totalItems;
    const items = data.itemsPerPage;

    return total % items === 0 ? Math.floor(total / items) : Math.floor(total / items) + 1;
  };

  const calculateStartPage = () => {
    const { currentPage, maxSize } = data;

    return currentPage % maxSize === 0
      ? maxSize * (Math.floor(currentPage / maxSize) - 1) + 1
      : maxSize * Math.floor(currentPage / maxSize) + 1;
  };

  const calculateEndPage = () => {
    const page = data.currentPage;
    const limit = data.maxSize;
    const total = totalPage();

    let endPage = limit * (Math.floor(page / limit) + 1);

    if (page % limit === 0) {
      endPage = limit * Math.floor(page / limit);
    }

    return total < endPage ? total : endPage;
  };

  // 부모 데이터 변경되면
  useEffect(() => {
    setData({
      ...data,
      ...props,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // page 변경하고
  useEffect(() => {
    setStartEndPage(data);
    // drawPaging();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // 그림을 그려준다.
  useEffect(() => {
    drawPaging();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const setStartEndPage = data => {
    setPage({
      startPage: calculateStartPage(),
      endPage: calculateEndPage(),
    });
  };

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

  const getPage = () => {
    return pageList.map((v, i) => {
      return (
        <li key={i} className={v === data.currentPage ? 'active' : ''}>
          <a
            href="#none"
            onClick={e => {
              e.preventDefault();
              data.search(v);
            }}
          >
            {v}
          </a>
        </li>
      );
    });
  };

  const prevPage = n => {
    if (data.currentPage === 1) {
      return;
    }

    if (n === 0) {
      return;
    }

    data.search(n);
  };

  const nextPage = n => {
    const total = totalPage();

    if (data.currentPage < total) {
      data.search(n);
    }

    if (n >= total) {
      return;
    }

    data.search(n);
  };

  return (
    <ul className="paging-comm">
      <li className={data.currentPage === 1 ? 'disabled' : ''}>
        <a
          href="#none"
          onClick={e => {
            e.preventDefault();
            prevPage(1);
          }}
        >
          <i className="fa fa-angle-double-left" />
          <span className="screen-out">처음</span>
        </a>
      </li>
      <li className={data.currentPage === 1 ? 'disabled' : ''}>
        <a
          href="#none"
          onClick={e => {
            e.preventDefault();
            prevPage(data.currentPage - 1);
          }}
        >
          <i className="fa fa-angle-left" />
          <span className="screen-out">이전</span>
        </a>
      </li>
      {getPage()}
      <li className={data.currentPage === totalPage() ? 'disabled' : ''}>
        <a
          href="#none"
          onClick={e => {
            e.preventDefault();
            nextPage(data.currentPage + 1);
          }}
        >
          <span className="screen-out">다음</span>
          <i className="fa fa-angle-right" />
        </a>
      </li>
      <li className={data.currentPage === totalPage() ? 'disabled' : ''}>
        <a
          href="#none"
          onClick={e => {
            e.preventDefault();
            nextPage(totalPage());
          }}
        >
          <span className="screen-out">끝</span>
          <i className="fa fa-angle-double-right" />
        </a>
      </li>
    </ul>
  );
};

export default Pagination2;
