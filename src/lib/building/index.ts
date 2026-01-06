import { buildingApiMonths } from "./api";
import { getBuildingsCache, setBuildingsCache } from "./cache";

import type { IGetBuildingsProps } from "@/commons/types";

export const getBuildings = async ({ regionCode, buildingType }: IGetBuildingsProps) => {
  const cacheKey = `${buildingType}_${regionCode}`;
  const cached = getBuildingsCache(cacheKey);

  if (cached !== undefined) return cached;

  try {
    const res = await buildingApiMonths({ regionCode, buildingType });
    setBuildingsCache(cacheKey, res);

    return res;
  } catch (error) {
    console.error("[getBuildingsData] error:", error);
    return []; // 에러가 발생하면 빈 배열 반환
  }
};
