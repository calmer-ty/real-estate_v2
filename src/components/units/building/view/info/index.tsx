import { useEffect, useState } from "react";

import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import InfoGraph from "./graph";
import InfoTable from "./table";

import * as S from "./index.styles";
import type { IGeocodeBuildings } from "@/commons/types";

import { DEFAULT_STRING_VALUE } from "@/commons/constants";
import { formatPrice } from "@/commons/utils/priceFormatter";
import { buildingTypeEngToKor } from "@/commons/utils/convertCollection";

interface IViewInfoProps {
  buildingType: string;
  activeMarker: IGeocodeBuildings | null;
}

export default function ViewInfo({ buildingType, activeMarker }: IViewInfoProps) {
  const [scroll, setScroll] = useState(false);

  // 마커 선택시 탭 스크롤 업
  useEffect(() => {
    setScroll(activeMarker !== undefined);
  }, [activeMarker]);

  // const onClickClose = (): void => {
  //   setActiveMarker(null);
  // };

  if (!activeMarker)
    return (
      <S.UnMarker>
        <div className="inner">
          <NotListedLocationIcon sx={{ color: "red", fontSize: 28 }} />
          <p>
            지도 <strong>마커</strong>를 선택해주세요.
          </p>
        </div>
      </S.UnMarker>
    );
  return (
    <>
      <S.Container scroll={scroll}>
        <S.Info>
          <h3>
            {buildingType === "apartment"
              ? activeMarker.buildings[0].aptNm
              : buildingType === "officetel"
              ? activeMarker.buildings[0].offiNm
              : buildingType === "rowHouse"
              ? activeMarker.buildings[0].mhouseNm
              : buildingType === "singleHouse"
              ? activeMarker.buildings[0].houseType
              : DEFAULT_STRING_VALUE}
          </h3>

          <p className="desc">
            <span className="type">{buildingTypeEngToKor(buildingType)}</span> ・ {activeMarker.buildings[0].buildYear}년
          </p>

          <div className="bottom">
            <h4>
              <span className="title">최근 실거래</span>
              <span className="date">
                ({activeMarker.buildings[0].dealYear}.{activeMarker.buildings[0].dealMonth}.{activeMarker.buildings[0].dealDay})
              </span>
            </h4>
            <strong>{formatPrice(activeMarker.buildings[0].dealAmount)}</strong>
          </div>
        </S.Info>
        <InfoGraph activeMarker={activeMarker} />
        <InfoTable activeMarker={activeMarker} />
      </S.Container>

      {/* 모바일 해상도일 때 리스트 여닫이 버튼 */}
      {/* <S.TabButton
        type="button"
        onClick={() => {
          setScroll((prev) => !prev);
        }}
      >
        <div className="stroke"></div>
        <span>매물 정보 {scroll ? "닫기" : "열기"}</span>
      </S.TabButton> */}
    </>
  );
}
