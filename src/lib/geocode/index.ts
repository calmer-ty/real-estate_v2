import { geocodeApi } from "./api";
import { getGeocodeCache, setGeocodeCache } from "./cache";
import { getBuildings } from "../building";
import { getBuildingsCache } from "../building/cache";

import type { IBuildingItem, IGetBuildingsProps } from "@/commons/types";

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
    })
  );

  return geocodeBuildings.filter((item) => item.geocode !== null);
};
