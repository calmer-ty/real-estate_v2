import NodeCache from "node-cache";

import type { IRegionItemFiltered } from "@/commons/types";

// TTL을 7200초(1시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const regionCache = new NodeCache({ stdTTL: 3600 });

// 임시타입
export const getCachedRegionData = (key: string): IRegionItemFiltered[] | undefined => {
  return regionCache.get<IRegionItemFiltered[]>(key);
};

export const setRegionCache = (key: string, data: IRegionItemFiltered[]): void => {
  regionCache.set(key, data);
};
