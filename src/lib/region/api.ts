import axios from "axios";

import type { IRegionAPI, IRegionItem, IRegionItemFiltered } from "@/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

import pLimit from "p-limit";
const limit = pLimit(10); // 병렬 요청 수를 10개로 제한

const API_KEY = process.env.GOVERNMENT_PUBLIC_DATA;
const BASE_URL = "http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList";
const NUM_OF_ROWS = 100;

const createApiUrl = (city: string, pageNo: number): string => {
  return `${BASE_URL}?ServiceKey=${API_KEY}&pageNo=${pageNo}&type=json&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
};

// 특정 페이지 데이터 요청
const fetchPageData = async (city: string, pageNo: number) => {
  try {
    const url = createApiUrl(city, pageNo);
    const response = await axios.get<IRegionAPI | undefined>(url);

    return response.data;
  } catch (error) {
    console.error("[fetchPageData] error:", error);
    return undefined;
  }
};

// 지역 코드 추출 및 필터링
const processRegionData = (rows: IRegionItem[]): Map<string, IRegionItemFiltered> => {
  const regionCodeMap = new Map<string, IRegionItemFiltered>();
  rows.forEach((el) => {
    const isValidRegion = el.umd_cd === "000" && el.sgg_cd !== "000";
    if (el.locatadd_nm !== undefined && isValidRegion) {
      const regionCode = el.sido_cd + el.sgg_cd;

      // locatadd_nm을 공백 기준으로 나누기
      const parts = el.locatadd_nm.split(" ");
      const city = parts[0]; // 첫 번째 값 (예: "경상남도")
      const district = parts.slice(1).join(" "); // 나머지 값 (예: "창원시 성산구")

      // 객체를 Map에 저장
      regionCodeMap.set(`${city}_${district}`, {
        city,
        district,
        regionCode,
      });
    }
  });
  return regionCodeMap;
};

const getUniqueRegionCodes = async (city: string, totalPages: number) => {
  // 병렬로 요청 보내기
  const requests = Array.from({ length: totalPages }, (_, i) => limit(() => fetchPageData(city, i + 1)));
  const responses = await Promise.all(requests);

  const regionCodeMap = new Map<string, IRegionItemFiltered>();

  responses.forEach((response) => {
    const rows = response?.StanReginCd?.[1]?.row ?? [];
    const filteredCodes = processRegionData(rows);

    // Map에서 각 regionCode와 locallowNm을 추가
    filteredCodes.forEach((value, key) => {
      regionCodeMap.set(key, { city: value.city, district: value.district, regionCode: value.regionCode });
    });
  });

  return regionCodeMap;
};
export const regionApi = async (city: string) => {
  try {
    const initialUrl = createApiUrl(city, 1);
    const initialResponse = await axios.get<IRegionAPI | undefined>(initialUrl);

    const totalCount = initialResponse.data?.StanReginCd?.[0]?.head?.[0].totalCount ?? 0; // row 데이터 추출
    if (totalCount === undefined) {
      console.warn("regionApi - 총 데이터 개수가 없습니다.");
      return [];
    }

    const totalPages = Math.ceil(totalCount / NUM_OF_ROWS);
    const regionCodeMap = await getUniqueRegionCodes(city, totalPages);

    // Map에서 regionCode와 locallowNm을 각각 배열로 추출
    const result = Array.from(regionCodeMap.values()).map((item) => ({
      city: item.city,
      district: item.district,
      regionCode: item.regionCode,
    }));

    return result; // 각각 따로 배열로 반환
  } catch (error) {
    console.error("[regionApi] error:", error);
    return [];
  }
};
