import { useEffect, useRef } from "react";

import LoadingSpinner from "@/components/commons/loadingSpinner";
import { formatPrice } from "@/commons/utils/priceFormatter";

import type { IGeocodeBuildings } from "@/commons/types";
import "./marker.css";
interface INaverMapsProps {
  activeRegion: { city: string; district: string; code: string };
  geocodeBuildings: IGeocodeBuildings[];
  setActiveMarker: React.Dispatch<React.SetStateAction<IGeocodeBuildings | null>>;
}
interface IMapsServiceRes {
  v2: { addresses: [{ x: string; y: string }] };
}

export default function NaverMaps({ activeRegion, geocodeBuildings, setActiveMarker }: INaverMapsProps) {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const activeMarkerRef = useRef<any>(null);
  const clusterRef = useRef<any>(null);
  // React state가 아닌 ref를 쓰는 이유:
  // - 마커 객체 자체가 지도 API와 연결된 DOM 요소임
  // - state로 관리하면 리렌더링이 발생하고 성능 저하 가능
  // - ref는 렌더링과 무관하게 마커를 유지/제거/갱신 가능

  // Map 생성 (1회)
  useEffect(() => {
    if (mapRef.current) {
      console.log("⚠️ 맵 갱신 중 맵이 이미 있습니다!");
      return;
    }

    // 1️⃣ 네이버 지도 스크립트
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=visualization`;
    script.async = true;

    script.onload = () => {
      // 2️⃣ 클러스터 스크립트
      const clusterScript = document.createElement("script");
      clusterScript.src = "/lib/MarkerClustering.js";
      clusterScript.async = true;

      clusterScript.onload = () => {
        // 3️⃣ 지도 생성
        mapRef.current = new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(37.3595704, 127.105399),
          zoom: 12,
        });
      };
      document.head.appendChild(clusterScript);
    };
    document.head.appendChild(script);

    // 점지도
  }, []);

  // 마커 및 클러스터 갱신
  useEffect(() => {
    if (!mapRef.current) {
      console.log("⚠️ 마커 갱신 중 mapRef가 없습니다!");
      return;
    }

    // 기존 마커 제거
    // markersRef.current에 담겨 있는 이전 마커들을 모두 지도에서 제거합니다.
    // 이렇게 해야 화면에 이전 마커가 남지 않고 새 마커로 깔끔하게 갱신됩니다.
    markersRef.current.forEach((m) => m.setMap(null));

    // 새 마커 추가
    markersRef.current = geocodeBuildings
      .filter((item) => item.geocode) // geocode 없는 아이템 제거
      .map((item) => {
        // if (!item.geocode) return;
        const defaultIcon = {
          content: `
          <div class="custom-marker">
            <span>${formatPrice(item.buildings[0].dealAmount)}</span>
          </div>
        `,
        };

        const activeIcon = {
          content: `
          <div class="custom-marker active">
            <span>${formatPrice(item.buildings[0].dealAmount)}</span>
          </div>
        `,
        };

        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(item.geocode.latitude, item.geocode.longitude),
          map: mapRef.current,
          icon: defaultIcon,
        });

        // 🔹 마커 클릭 이벤트
        window.naver.maps.Event.addListener(marker, "click", () => {
          // 이전에 선택된 마커 원래대로
          if (activeMarkerRef.current) {
            activeMarkerRef.current.setIcon(activeMarkerRef.current.defaultIcon);
          }

          // 현재 마커 활성화
          marker.setIcon(activeIcon);
          activeMarkerRef.current = marker;
          marker.defaultIcon = defaultIcon; // 기존 마커 디폴트로 초기화
          setActiveMarker(item);
        });

        return marker; // map이 새 배열로 반환
      });

    // 클러스터 생성
    if (markersRef.current.length > 0) {
      // 기존 클러스터 제거 함수
      const clearCluster = () => {
        if (!clusterRef.current) return;
        clusterRef.current.setMap(null);
        clusterRef.current = null;
      };

      // 첫 진입 시 클러스터 클리어
      clearCluster();

      const icons = Array.from({ length: 5 }, (_, idx) => ({
        content: `<div
        style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;
        background:url(/images/cluster-marker-${idx + 1}.png);background-size:contain;"></div>`,
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20),
      }));

      clusterRef.current = new window.MarkerClustering({
        minClusterSize: 2,
        maxZoom: 14, // 이 줌 레벨 이하까지만 클러스터 유지
        map: mapRef.current,
        markers: markersRef.current,
        disableClickZoom: false,
        gridSize: 120,
        icons: icons,
        indexGenerator: [10, 20, 50, 100, 200],
        stylingFunction: function (clusterMarker: any, count: any) {
          // clusterMarker.getElement().find("div:first-child").text(count);
          clusterMarker.getElement().firstElementChild.textContent = count;
        },
      });

      // 종료 전 클러스터 클리어
      return () => clearCluster();
    }
  }, [geocodeBuildings, setActiveMarker]);

  // 셀렉트 선택 시 위치 이동
  useEffect(() => {
    if (!mapRef.current) return;

    window.naver.maps.Service?.geocode({ query: `${activeRegion.city} ${activeRegion.district}` }, (status: number, res: IMapsServiceRes) => {
      const position = new window.naver.maps.LatLng(res.v2.addresses[0].y, res.v2.addresses[0].x);
      mapRef.current.setCenter(position);
    });
  }, [activeRegion]);

  return (
    <>
      <div id="map" style={{ position: "relative", width: "100%", height: "100%" }}>
        {geocodeBuildings.length === 0 && <LoadingSpinner />}
      </div>
    </>
  );
}
