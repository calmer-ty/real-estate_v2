// import { useEffect, useRef, useState } from "react";

// import LoadingSpinner from "@/components/commons/loadingSpinner";

// import type { IGeocodeBuildings } from "@/commons/types";
// interface INaverMapsProps {
//   activeRegion: { city: string; district: string; code: string };
//   geocodeBuildings: IGeocodeBuildings[];
//   loading: boolean;
//   setActiveMarker: React.Dispatch<React.SetStateAction<IGeocodeBuildings | null>>;
// }
// interface IMapsServiceRes {
//   v2: { addresses: [{ x: string; y: string }] };
// }

// export default function NaverMaps({ activeRegion, geocodeBuildings, loading, setActiveMarker }: INaverMapsProps) {
//   const mapRef = useRef<any>(null);
//   const markersRef = useRef<any[]>([]);
//   const clusterRef = useRef<any>(null);

//   // console.log("ref 1,2,3: ", mapRef, markersRef, clusterRef);
//   // const [markersReady, setMarkersReady] = useState(false);
//   // React state가 아닌 ref를 쓰는 이유:
//   // - 마커 객체 자체가 지도 API와 연결된 DOM 요소임
//   // - state로 관리하면 리렌더링이 발생하고 성능 저하 가능
//   // - ref는 렌더링과 무관하게 마커를 유지/제거/갱신 가능

//   // Map 생성 (1회)
//   useEffect(() => {
//     if (mapRef.current) {
//       console.log("⚠️ 맵 갱신 중 맵이 이미 있습니다!");
//       return;
//     }

//     // 1️⃣ 네이버 지도 스크립트
//     const script = document.createElement("script");
//     script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`;
//     script.async = true;

//     script.onload = () => {
//       const mapOptions = {
//         center: new window.naver.maps.LatLng(37.3595704, 127.105399),
//         zoom: 12,
//       };

//       mapRef.current = new window.naver.maps.Map("map", mapOptions);
//       // 2️⃣ 클러스터 스크립트
//       // const clusterScript = document.createElement("script");
//       // clusterScript.src = "/lib/MarkerClustering.js";
//       // clusterScript.async = true;

//       // clusterScript.onload = () => {
//       //   // 3️⃣ 지도 생성
//       //   const mapOptions = {
//       //     center: new window.naver.maps.LatLng(37.3595704, 127.105399),
//       //     zoom: 12,
//       //   };

//       //   mapRef.current = new window.naver.maps.Map("map", mapOptions);
//       // };
//       // document.head.appendChild(clusterScript);
//     };
//     document.head.appendChild(script);
//   }, []);

//   // 마커 갱신
//   useEffect(() => {
//     if (!mapRef.current) {
//       console.log("⚠️ 마커 갱신 중 맵이 없습니다!");
//       return;
//     }

//     // 1️⃣ 기존 마커 제거
//     // markersRef.current에 담겨 있는 이전 마커들을 모두 지도에서 제거합니다.
//     // 이렇게 해야 화면에 이전 마커가 남지 않고 새 마커로 깔끔하게 갱신됩니다.
//     markersRef.current.forEach((m) => m.setMap(null));

//     // markersRef.current = [];   // markersRef.current 배열을 빈 배열로 초기화합니다.

//     // 2️⃣ 새 마커 추가
//     // ❌ forEach 사용 시 새 배열을 만들지 않고 순회만 하기 때문에,
//     //    push로 하나씩 넣어야 하고, 실수로 undefined가 들어갈 수 있음.
//     //    map()을 사용하면 새 배열이 자동 생성되므로 더 안전함.
//     markersRef.current = geocodeBuildings
//       .filter((item) => item.geocode) // geocode 없는 아이템 제거
//       .map((item) => {
//         // if (!item.geocode) return;

//         const marker = new window.naver.maps.Marker({
//           position: new window.naver.maps.LatLng(item.geocode.latitude, item.geocode.longitude),
//           map: mapRef.current,
//           // icon: {
//           //   content: `
//           //     <div class="custom-marker">
//           //       <span>${Math.round(item.data.excluUseAr * 0.3025)}평</span>
//           //       <span>🏠</span>
//           //     </div>
//           //   `,
//           // },
//         });

//         // 🔹 마커 클릭 이벤트
//         window.naver.maps.Event.addListener(marker, "click", () => {
//           setActiveMarker(item);
//         });
//         // 3️⃣ 새 마커 저장 ❌ forEach 사용 시 push 필요
//         // markersRef.current.push(marker);
//         return marker; // map이 새 배열로 반환
//       });

//     console.log("markersRef: ", markersRef.current);
//   }, [geocodeBuildings, setActiveMarker]);

//   // 마커 클러스터
//   // useEffect(() => {
//   //   if (!mapRef.current) {
//   //     console.log("⚠️ 클러스터 갱신 중 맵이 없습니다!");
//   //     return;
//   //   }

//   //   if (markersRef.current.length === 0) {
//   //     console.log("⚠️ 클러스터 갱신 중 마커가 없습니다!");
//   //     return;
//   //   }

//   //   // 기존 클러스터 제거 함수
//   //   const clearCluster = () => {
//   //     if (!clusterRef.current) return;
//   //     clusterRef.current.setMap(null);
//   //     clusterRef.current = null;
//   //   };

//   //   // 첫 진입 시 클러스터 클리어
//   //   clearCluster();

//   //   const icons = Array.from({ length: 5 }, (_, idx) => ({
//   //     content: `<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(/images/cluster-marker-${
//   //       idx + 1
//   //     }.png);background-size:contain;"></div>`,
//   //     size: new naver.maps.Size(40, 40),
//   //     anchor: new naver.maps.Point(20, 20),
//   //   }));

//   //   clusterRef.current = new window.MarkerClustering({
//   //     minClusterSize: 2,
//   //     maxZoom: 14, // 이 줌 레벨 이하까지만 클러스터 유지
//   //     map: mapRef.current,
//   //     markers: markersRef.current,
//   //     disableClickZoom: false,
//   //     gridSize: 120,
//   //     icons: icons,
//   //     indexGenerator: [10, 20, 50, 100, 200],
//   //     stylingFunction: function (clusterMarker, count) {
//   //       // clusterMarker.getElement().find("div:first-child").text(count);
//   //       clusterMarker.getElement().firstElementChild.textContent = count;
//   //     },
//   //   });

//   //   // 종료 전 클러스터 클리어
//   //   return () => {
//   //     clearCluster();
//   //   };
//   //   // geocodeBuildings가 바뀔 때마다 새로운 클러스터가 필요하므로 의존성 추가
//   // }, [geocodeBuildings]);

//   // 셀렉트 선택 시 위치 이동
//   useEffect(() => {
//     if (!mapRef.current) return;

//     window.naver.maps.Service?.geocode({ query: `${activeRegion.city} ${activeRegion.district}` }, (status: number, res: IMapsServiceRes) => {
//       const position = new window.naver.maps.LatLng(res.v2.addresses[0].y, res.v2.addresses[0].x);
//       mapRef.current.setCenter(position);
//     });
//   }, [activeRegion]);

//   return (
//     <>
//       <div id="map" style={{ position: "relative", width: "100%", height: "100%" }}>
//         {loading && <LoadingSpinner />}
//       </div>
//     </>
//   );
// }
