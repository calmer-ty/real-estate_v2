import axios from "axios";
import { getGeocodeCache, setGeocodeCache } from "./cache";
import { getBuildings } from "@/app/api/building/service";
import { getBuildingsCache } from "@/app/api/building/cache";

import type { IBuildingItem, IGeocodeAPI, IGetBuildingsProps } from "@/commons/types";

export const geocodeApi = async (address: string) => {
  const apiUrl = `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
  const res = await axios.get<IGeocodeAPI | undefined>(apiUrl, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
      "X-NCP-APIGW-API-KEY": process.env.NCP_CLIENT_SECRET,
    },
  });
  const addresses = res.data?.addresses ?? [];

  // 핵심: 데이터가 없으면 바로 undefined를 리턴해서 에러를 방지합니다.
  if (addresses.length === 0) {
    console.warn(`[geocodeApi] 검색 결과 없음: ${address}`);
    return undefined;
  }

  try {
    const { x, y, jibunAddress, roadAddress } = addresses[0]; // 단순히 API 구조가 단일 배열로 구성되어 [0]으로 찾음

    return {
      longitude: x,
      latitude: y,
      jibunAddress,
      roadAddress,
    };
  } catch (error) {
    console.error("[geocodeApi] error:", error);
    return undefined;
  }
};

// 캐시가 있을 경우 해당 데이터를 반환하고, 없으면 API 요청 후 결과를 캐싱합니다.
const getGeocode = async (address: string) => {
  const cacheKey = `geocode_${address}`;
  const cached = getGeocodeCache(cacheKey);

  if (cached !== undefined) return cached;

  try {
    const res = await geocodeApi(address);
    if (res === undefined) return undefined;

    setGeocodeCache(cacheKey, res);
    return res;
  } catch (error) {
    console.error("[getGeocode] error:", error);
    return undefined;
  }
};

// 전체 지오코딩 데이터를 가져오는 메인 함수
export const getGeocodeBuildings = async ({ regionCode, buildingType }: IGetBuildingsProps) => {
  const buildings = await getBuildings({ regionCode, buildingType });
  const buildingsCache = getBuildingsCache(`${buildingType}_${regionCode}`);
  // console.log("buildings", buildings.length);

  let currentData: IBuildingItem[][] = [];

  if (buildingsCache !== undefined) {
    currentData = buildingsCache;
  } else if (buildings.length > 0) {
    currentData = buildings;
  } else {
    currentData = [];
  }

  const geocodeBuildings = await Promise.all(
    currentData.map(async (buildings) => {
      try {
        // 거래된 건물 데이터에서 같은 주소는 묶어서 저장했기 때문에 같은 건물 첫번째로 들어온 데이터로 주소 넘겨줌
        const address = `${buildings[0].estateAgentSggNm} ${buildings[0].umdNm} ${buildings[0].jibun}`;
        const geocode = await getGeocode(address);

        return { buildings, geocode };
      } catch (error) {
        // 개별 요청에서 발생한 오류를 잡고, null로 처리하고 계속 진행
        console.error(`Error processing geocode building`, error);
        return { buildings, geocode: null }; // 기본값 리턴
      }
    }),
  );

  return geocodeBuildings.filter((item) => item.geocode !== null);
};
