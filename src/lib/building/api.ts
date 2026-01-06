import axios from "axios";

import { getCurrentDealYmd } from "@/commons/utils/currentDate";

import type { IBuildingAPI, IBuildingItem } from "@/commons/types";
interface ICreateApiUrlProps {
  regionCode: string;
  buildingType: string;
  pageNo: number;
  dealYmd: string;
}
interface IBuildingApiProps {
  regionCode: string;
  buildingType: string;
  dealYmd: string;
}

// API 설정 상수
const NUM_OF_ROWS = 10;
const API_KEY = process.env.GOVERNMENT_PUBLIC_DATA;
const API_URLS = {
  apartment: "https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade",
  officetel: "https://apis.data.go.kr/1613000/RTMSDataSvcOffiTrade/getRTMSDataSvcOffiTrade",
  singleHouse: "https://apis.data.go.kr/1613000/RTMSDataSvcSHTrade/getRTMSDataSvcSHTrade",
  rowHouse: "https://apis.data.go.kr/1613000/RTMSDataSvcRHTrade/getRTMSDataSvcRHTrade",
  // 추가적인 URL이 있을 경우 여기에 추가
};

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

// dealYmd(해당 달)에 대한 빌딩 데이터 가져오기
export const buildingApi = async ({ regionCode, buildingType, dealYmd }: IBuildingApiProps) => {
  const createApiUrl = ({ regionCode, buildingType, pageNo, dealYmd }: ICreateApiUrlProps) => {
    // const currentDate = getCurrentDate();
    const baseUrl = API_URLS[buildingType as "apartment" | "officetel" | "singleHouse" | "rowHouse"];

    if (typeof baseUrl !== "string") {
      throw new Error(`잘못된 buildingType: ${buildingType}`);
    }
    return `${baseUrl}?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${dealYmd}&pageNo=${pageNo}&numOfRows=${NUM_OF_ROWS}`;
  };

  try {
    // 첫 번째 요청으로 총 페이지 수 계산
    const initialUrl = createApiUrl({ regionCode, buildingType, pageNo: 1, dealYmd });
    const initialResponse = await axios.get(initialUrl);
    const totalCount = initialResponse.data.response.body.totalCount ?? 0;

    if (totalCount === 0) {
      console.warn("buildingApi - 총 데이터 개수가 없습니다.");
      return [];
    }

    const totalPages = Math.max(1, Math.ceil(totalCount / NUM_OF_ROWS));

    // 병렬 요청을 위한 페이지 번호 배열 생성
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // 페이지 요청을 병렬로 실행
    const req = pageNumbers.map(async (pageNo) => {
      const url = createApiUrl({ regionCode, pageNo, buildingType, dealYmd });
      const res = await axios.get<IBuildingAPI | undefined>(url);

      return res.data?.response.body.items.item;
    });
    const allReq = await Promise.all(req);

    return allReq.flat().filter((req) => !!req);
  } catch (error) {
    console.error("[buildingApi] error:", error);
    return [];
  }
};

// 최종 월마다 한달 데이터 반복
export const buildingApiMonths = async ({ regionCode, buildingType }: { regionCode: string; buildingType: string }) => {
  const fetchDate = getCurrentDealYmd(3);

  const results = await Promise.all(
    fetchDate.map((dealYmd) =>
      buildingApi({
        regionCode,
        buildingType,
        dealYmd,
      })
    )
  );

  return getSameBuildingSort(results.flat()); // 월마다 배열로 묶인걸 풀기
};
