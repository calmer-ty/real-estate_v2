import NodeCache from "node-cache";
import type { IBuildingItem } from "@/commons/types";

// 캐시
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
