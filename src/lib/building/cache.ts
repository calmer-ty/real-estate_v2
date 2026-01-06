import NodeCache from "node-cache";
import type { IBuildingItem } from "@/commons/types";

// TTL을 7200초(1시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const buildingsCache = new NodeCache({ stdTTL: 3600 });

export const getBuildingsCache = (key: string) => {
  try {
    return buildingsCache.get<IBuildingItem[][]>(key);
  } catch (error) {
    console.error(`Error getting cache for key ${key}:`, error);
    return [];
  }
};

export const setBuildingsCache = (key: string, data: IBuildingItem[][]) => {
  try {
    buildingsCache.set(key, data);
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
  }
};
