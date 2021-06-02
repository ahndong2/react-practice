// 마지막 , 지우기
export const removeLastStr = str => {
  let rtn = '';
  if (str.substr(str.length - 1) === ',') {
    rtn = str.substr(0, str.length - 1);
  }
  if (str.substr(str.length - 2) === ', ') {
    rtn = str.substring(0, str.length - 2);
  }
  return rtn;
};

// 동면읍 선택시 polygonData 정비
export const donMyunDataContorll = data => {
  const strDongMyunPolygon = data.substring(9, data.length - 2);
  const splitDongMyunPolygon = strDongMyunPolygon.split(',');
  const polygonData = [];

  let polygonXYData = '';
  let polygonDBData = 'POLYGON(({{polygon}}))';
  let polygonStr = '';
  splitDongMyunPolygon.forEach(function(v) {
    const dmp = {
      x: v.split(' ')[0],
      y: v.split(' ')[1],
    };
    polygonData.push(dmp);
    polygonXYData += `{x:${dmp.x},y:${dmp.y}},`;

    polygonStr += `${dmp.y} ${dmp.x}, `;
  });

  polygonXYData = removeLastStr(polygonXYData);
  polygonStr = removeLastStr(polygonStr);
  polygonDBData = polygonDBData.replace('{{polygon}}', polygonStr);

  return {
    polygonData,
    polygonXYData,
    polygonDBData,
  };
};

// 맵에서 폴리곤 그리고 polygonData 정비
export const drawPolygonDataControll = data => {
  const polygonData = [];
  let polygonXYData = '';
  let polygonDBData = 'POLYGON(({{polygon}}))';
  let polygonStr = '';
  data.forEach(v => {
    const dmp = {
      x: v.y,
      y: v.x,
    };
    polygonData.push(dmp);
    polygonXYData += `{x:${v.y},y:${v.x}},`;

    polygonStr += `${v.y} ${dmp.x}, `;
  });
  polygonXYData = removeLastStr(polygonXYData);
  polygonStr = removeLastStr(polygonStr);
  polygonDBData = polygonDBData.replace('{{polygon}}', polygonStr);

  return {
    polygonData,
    polygonXYData,
    polygonDBData,
  };
};
export default {
  removeLastStr,
  donMyunDataContorll,
};
