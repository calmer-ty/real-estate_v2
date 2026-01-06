import { regionApi } from "./api";
import { getCachedRegionData, setRegionCache } from "./cache";

import { CITIES } from "@/commons/constants/regionData";
import type { IRegionItemFiltered } from "@/commons/types";

// 특정 도시의 지역 데이터를 가져오는 함수
const fetchRegion = async (city: string): Promise<IRegionItemFiltered[]> => {
  const cacheKey = `region_${city}`;
  const cached = getCachedRegionData(cacheKey);

  if (cached !== undefined) return cached;

  try {
    const res = await regionApi(city);
    setRegionCache(cacheKey, res);

    return res;
  } catch (error) {
    console.error("[fetchRegion] error:", error);
    return [];
  }
};

// 지역 데이터를 가져오는 함수
export const getRegion = async (): Promise<IRegionItemFiltered[]> => {
  try {
    const promise = CITIES.map((city) => fetchRegion(city)); // 각 도시에 대해 데이터를 가져오는 Promise 배열을 생성합니다
    const regions = await Promise.all(promise); // Promise.all을 사용해 모든 데이터를 병렬로 가져옵니다

    // 지역 코드와 위치 이름을 그룹화하여 배열로 반환
    return regions.flat().map((item) => ({
      city: item.city,
      district: item.district,
      regionCode: item.regionCode,
    }));

    // return regionDataList.flat(); // 도시별 지역 코드 그룹화된 객체 반환
  } catch (error) {
    console.error("[fetchRegion] error:", error);
    return [];
  }
};
