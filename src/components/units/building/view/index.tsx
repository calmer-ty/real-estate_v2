import { useState } from "react";

// import { useFirestore } from "@/hooks/firebase/useFirestore";
import { useGeocodeBuildings } from "./useGeocodeBuildings";

import RegionSelect from "./select/RegionSelect";
import BuildingSelect from "./select/BuildingSelect";
import NaverMaps from "./naverMaps";
import ViewInfo from "./info";

import type { IGeocodeBuildings } from "@/commons/types";
import * as S from "./index.styles";

export default function BuildingView() {
  // 셀렉트 상태
  const [buildingType, setBuildingType] = useState("apartment");
  const [activeRegion, setActiveRegion] = useState({ city: "경기도", district: "성남시 분당구", code: "41135" });
  //
  const [activeMarker, setActiveMarker] = useState<IGeocodeBuildings | null>(null);

  const { geocodeBuildings, loading } = useGeocodeBuildings({ buildingType, activeRegion });
  // const { userBuildings } = useFirestore();

  return (
    <S.Container>
      <div className="selectContent">
        <BuildingSelect buildingType={buildingType} setBuildingType={setBuildingType} />
        <RegionSelect activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      </div>

      <div className="mapContent">
        <ViewInfo buildingType={buildingType} activeMarker={activeMarker} />
        <NaverMaps activeRegion={activeRegion} geocodeBuildings={geocodeBuildings} loading={loading} setActiveMarker={setActiveMarker} />
      </div>
    </S.Container>
  );
}
