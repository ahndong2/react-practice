import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ data }) => {
  const statusBadge = status => {
    const str = status === '1' ? '노출' : '비노출';
    const color = status === '1' ? 'default' : 'red';
    return <span className={`badge-${color}`}>{str}</span>;
  };
  return (
    <tr>
      <td className="txt-center">{data.key}</td>
      <td className="txt-center">{data.title}</td>
      <td className="txt-center">{data.info}</td>
      <td className="txt-center">{statusBadge(data.status)}</td>
      <td className="txt-center">
        {data.createdName}
        <br />({data.createdID}/{data.createdEmail})
      </td>
      <td className="txt-center">
        {data.created}
        <br /> ({data.modified})
      </td>
      <td className="txt-center">
        <Link to={`/banner/view?key=${data.key}`} className="btn-slate">
          상세
        </Link>
      </td>
    </tr>
  );
};

const BannerListTable = ({ bannerList }) => {
  // 배너 리스트
  const bannerListItems = () => {
    if (bannerList.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="txt-center">
            검색 결과가 존재하지 않습니다.
          </td>
        </tr>
      );
    }
    return bannerList.map(v => {
      return <ListItem key={v.key} data={v} />;
    });
  };

  return (
    <div className="tbl-comm">
      <table>
        <thead>
          <tr>
            <th scope="col" className="txt-center">
              Key
            </th>
            <th scope="col" className="txt-center">
              제목
            </th>
            <th scope="col" className="txt-center">
              설명
            </th>
            <th scope="col" className="txt-center">
              노출여부
            </th>
            <th scope="col" className="txt-center">
              생성자
            </th>
            <th scope="col" className="txt-center">
              등록일시
              <br />
              (수정일시)
            </th>
            <th scope="col" className="txt-center">
              관리
            </th>
          </tr>
        </thead>
        <tbody>{bannerListItems()}</tbody>
      </table>
    </div>
  );
};
export default BannerListTable;
