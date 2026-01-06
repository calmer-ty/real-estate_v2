import axios from "axios";

import type { IGeocodeAPI } from "@/commons/types";

export const geocodeApi = async (address: string) => {
  const apiUrl = `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
  const res = await axios.get<IGeocodeAPI | undefined>(apiUrl, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NCP_CLIENT_ID,
      "X-NCP-APIGW-API-KEY": process.env.NCP_CLIENT_SECRET,
    },
  });
  const addresses = res.data?.addresses ?? [];

  try {
    const { x, y, jibunAddress, roadAddress } = addresses[0]; // 단순히 API 구조가 단일 배열로 구성되어 [0]으로 찾음

    return {
      latitude: y,
      longitude: x,
      jibunAddress,
      roadAddress,
    };
  } catch (error) {
    console.error("[geocodeApi] error:", error);
    return undefined;
  }
};
