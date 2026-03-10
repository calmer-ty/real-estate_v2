import axios from "axios";
import { IBuildingAPI, IBuildingItem } from "@/commons/types";
import { getCurrentDealYmd } from "@/commons/utils/currentDate";

interface IBuildingApiProps {
  regionCode: string;
  buildingType: string;
  dealYmd: string;
}

// API 설정 상수
const API_KEY = process.env.GOVERNMENT_PUBLIC_DATA;
const API_URLS = {
  apartment: "https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade",
  officetel: "https://apis.data.go.kr/1613000/RTMSDataSvcOffiTrade/getRTMSDataSvcOffiTrade",
  singleHouse: "https://apis.data.go.kr/1613000/RTMSDataSvcSHTrade/getRTMSDataSvcSHTrade",
  rowHouse: "https://apis.data.go.kr/1613000/RTMSDataSvcRHTrade/getRTMSDataSvcRHTrade",
  // 추가적인 URL이 있을 경우 여기에 추가
};

export const buildingApi = async ({ regionCode, buildingType, dealYmd }: IBuildingApiProps) => {
  const NUM_OF_ROWS = 1000;

  const createApiUrl = (pageNo: number) => {
    const baseUrl = API_URLS[buildingType as keyof typeof API_URLS];
    return `${baseUrl}?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${dealYmd}&pageNo=${pageNo}&numOfRows=${NUM_OF_ROWS}`;
  };

  try {
    // 첫 번째 요청으로 총 페이지 수 계산
    const url = createApiUrl(1);
    const res = await axios.get<IBuildingAPI>(url);

    // 1. 옵셔널 체이닝으로 안전하게 접근
    const body = res.data?.response?.body;
    const rawItems = body?.items?.item;

    // 2. 공공데이터의 '객체 vs 배열' 문제를 해결하는 핵심 로직 (공부 포인트!)
    const items = rawItems ? (Array.isArray(rawItems) ? rawItems : [rawItems]) : [];

    return items;
  } catch (error) {
    console.error("[buildingApi] error:", error);
    return [];
  }
};

// 최종 월마다 한달 데이터 반복
export const buildingResult = async ({ regionCode, buildingType }: { regionCode: string; buildingType: string }) => {
  const fetchDate = getCurrentDealYmd(3);

  const results = await Promise.all(
    fetchDate.map((dealYmd) =>
      buildingApi({
        regionCode,
        buildingType,
        dealYmd,
      }),
    ),
  );

  // 같은 빌딩 데이터까리 묶기
  const getSameBuildingSort = (items: IBuildingItem[]) => {
    const grouped: Map<string, IBuildingItem[]> = new Map();

    items.forEach((item) => {
      const key = `${item.umdNm}_${item.jibun}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)?.push(item);
    });

    return Array.from(grouped.values());
  };

  return getSameBuildingSort(results.flat()); // 월마다 배열로 묶인걸 풀기
};
