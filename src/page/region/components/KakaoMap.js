/* global kakao */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Debug } from 'library/Debug';
import styles from './KakaoMap.module.css';

let drawingMap;
let manager;
const KakaoMap = ({ polygonData, updatePolygonData }) => {
  const [data, setData] = useState([]);
  const [polygonInstance, setPolygonInstance] = useState([]);
  const loadKakaoMap = () => {
    // Drawing Manager로 도형을 그릴 지도 div
    const drawingMapContainer = document.getElementById('drawingMap');
    const lat = 37.507171;
    const lng = 127.058612;
    drawingMap = {
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: 6, // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    drawingMap = new kakao.maps.Map(drawingMapContainer, drawingMap);

    const options = {
      // Drawing Manager를 생성할 때 사용할 옵션입니다
      map: drawingMap, // Drawing Manager로 그리기 요소를 그릴 map 객체입니다
      drawingMode: [
        // Drawing Manager로 제공할 그리기 요소 모드입니다
        // kakao.maps.drawing.OverlayType.POLYLINE,
        // kakao.maps.drawing.OverlayType.CIRCLE,
        kakao.maps.drawing.OverlayType.POLYGON,
      ],
      // 사용자에게 제공할 그리기 가이드 툴팁입니다
      // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
      guideTooltip: ['draw', 'drag', 'edit'],
      polylineOptions: {
        // 선 옵션입니다
        draggable: true, // 그린 후 드래그가 가능하도록 설정합니다
        removable: true, // 그린 후 삭제 할 수 있도록 x 버튼이 표시됩니다
        editable: true, // 그린 후 수정할 수 있도록 설정합니다
        strokeColor: '#39f', // 선 색
        hintStrokeStyle: 'dash', // 그리중 마우스를 따라다니는 보조선의 선 스타일
        hintStrokeOpacity: 0.5, // 그리중 마우스를 따라다니는 보조선의 투명도
      },
      circleOptions: {
        draggable: true,
        removable: true,
        editable: true,
        strokeColor: '#39f',
        fillColor: '#39f',
        fillOpacity: 0.5,
      },
      polygonOptions: {
        draggable: true,
        removable: false,
        editable: true,
        strokeColor: '#39f',
        fillColor: '#39f',
        fillOpacity: 0.5,
        hintStrokeStyle: 'dash',
        hintStrokeOpacity: 0.5,
      },
    };
    // 위에 작성한 옵션으로 Drawing Manager를 생성합니다
    manager = new kakao.maps.drawing.DrawingManager(options);
    // 생성한 manager 객체를 toolbox의 DrawingManager로 설정한다
    const toolbox = new kakao.maps.drawing.Toolbox({ drawingManager: manager });

    // 지도에 toolbox를 표시한다
    drawingMap.addControl(toolbox.getElement(), kakao.maps.ControlPosition.TOP);
    manager.addListener('drawstart', () => {
      const { polygon } = manager.getOverlays();

      if (polygon.length > 0) {
        const len = polygon.length;

        for (let i = 0; i < len; i += 1) {
          polygon[i].setMap(null);
        }
      }
    });

    manager.addListener('state_changed', () => {
      // Drawing Manager에서 그려진 데이터 정보를 가져옵니다
      const regionData = manager.getData().polygon;
      const points = regionData.length === 0 ? [] : regionData[regionData.length - 1].points;
      setData(points);
    });

    manager.addListener('remove', function() {
      setData([]);
    });
  };

  // 지도에 폴리곤 그리기
  const setPolygon = polygonArr => {
    resetPolygon();
    const linePath = [];
    polygonArr.forEach(v => {
      linePath.push(new kakao.maps.LatLng(v.x, v.y));
    });

    // 지도에 표시할 다각형을 생성합니다
    const polygon = new kakao.maps.Polygon({
      map: drawingMap,
      path: linePath, // 그려질 다각형의 좌표 배열
      strokeWeight: 3, // 선의 두께
      strokeColor: '#7a89ef', // 선의 색깔
      strokeOpacity: 0.8, // 선의 불투명도  1에서 0 사이의 값이며 0에 가까울수록 투명
      strokeStyle: 'longdash', // 선의 스타일
      fillColor: '#7a89ef', // 채우기 색깔
      fillOpacity: 0.7, // 채우기 불투명도
    });
    Debug.log(polygon);

    // 지도에 다각형을 표시합니다
    polygon.setMap(drawingMap);

    const polyArr = [...polygonInstance, polygon];
    setPolygonInstance(polyArr);
    drawingMap.panTo(linePath[0]);
  };

  // 지도에 표시된 폴리곤 삭제
  const resetPolygon = () => {
    if (polygonInstance.length > 0) {
      polygonInstance.forEach(v => {
        v.setMap(null);
      });
    }
    setPolygonInstance([]);
  };

  // 그려질 폴리곤 데이터
  useEffect(() => {
    if (polygonData.length === 0) return;
    resetPolygon();
    setPolygon(polygonData);
  }, [polygonData]);

  // 그려진 폴리곤 데이터 상위에 전달
  useEffect(() => {
    if (data.length === 0) return;
    // polygon데이터
    updatePolygonData(data);
  }, [data]);

  const kakaoMapInit = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=9aad4643560330950298e3e65e623b3f&libraries=drawing&autoload=false';
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        loadKakaoMap();
      });
    };
  };

  useEffect(() => {
    kakaoMapInit();
  }, []);

  return (
    <>
      <div className={styles.map_wrap} />
      <div id="drawingMap" className={styles.drawingMap} />
    </>
  );
};
export default KakaoMap;
