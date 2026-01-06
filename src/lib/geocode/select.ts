import { geocodeApi } from "./api";
import { getGeocodeCache, setGeocodeCache } from "./cache";

export const getSelectGeocode = async (address: string) => {
  const cacheKey = `geocode_${address}`;
  const cachedData = getGeocodeCache(cacheKey);

  if (cachedData !== undefined) return cachedData;

  try {
    const response = await geocodeApi(address);
    if (response === undefined) return undefined;

    setGeocodeCache(cacheKey, response);
    return response;
  } catch (error) {
    console.error("[getSelectGeocode] error:", error);
    return undefined;
  }
};
