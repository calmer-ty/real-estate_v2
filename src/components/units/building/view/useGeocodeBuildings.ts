import { useEffect, useState } from "react";
import axios from "axios";

import type { IGeocodeBuildings } from "@/commons/types";
interface IUseGeocodeBuildingsProps {
  buildingType: string;
  activeRegion: { city: string; district: string; code: string };
}

export function useGeocodeBuildings({ buildingType, activeRegion }: IUseGeocodeBuildingsProps) {
  const [geocodeBuildings, setGeocodeBuildings] = useState<IGeocodeBuildings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeRegion.code) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        // 전체 위치 API 호출
        const geocodeBuildingsRes = await axios.get<IGeocodeBuildings[]>("/api/geocodeBuildings", {
          params: { regionCode: activeRegion.code, buildingType },
        });

        setGeocodeBuildings(geocodeBuildingsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeRegion, buildingType]);

  return { geocodeBuildings, loading };
}
