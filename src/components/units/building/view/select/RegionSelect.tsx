import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import type { SelectChangeEvent } from "@mui/material/Select";
interface IRegionSelectProps {
  activeRegion: { city: string; district: string; code: string };
  setActiveRegion: React.Dispatch<React.SetStateAction<{ city: string; district: string; code: string }>>;
}

import * as S from "./select.styles";
import { CITIES, REGION_DATA } from "@/commons/constants/regionData";

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
};

export default function RegionSelect({ activeRegion, setActiveRegion }: IRegionSelectProps) {
  // 선택한 시의 관련 구 리스트
  const currentDistricts = REGION_DATA.filter((data) => data.city === activeRegion.city).map((data) => data.district);

  // 시 변경 핸들러
  const handleCityChange = (event: SelectChangeEvent): void => {
    const newCity = event.target.value;
    // 첫 번째 자동 선택
    // REGION_DATA를 필터링하여 newCity & firstDistrict 와 매칭함
    const firstDistrict = REGION_DATA.filter((r) => r.city === newCity)[0].district;
    const firstCode = REGION_DATA.filter((r) => r.city === newCity && r.district === firstDistrict)[0].code;

    setActiveRegion({
      ...activeRegion,
      city: newCity,
      district: firstDistrict,
      code: firstCode,
    });
  };

  // 구 변경 핸들러
  const handleDistrictChange = (event: SelectChangeEvent): void => {
    const newDistrict = event.target.value;
    // REGION_DATA를 필터링하여 newDistrict & regionCity 와 매칭함
    const newCode = REGION_DATA.filter((r) => r.city === activeRegion.city && r.district === newDistrict)[0].code;

    setActiveRegion({
      ...activeRegion,
      district: newDistrict,
      code: newCode,
    });
  };

  return (
    <S.Container>
      <FormControl fullWidth>
        <Select labelId="city-select-label" id="city-select" value={activeRegion.city} onChange={handleCityChange} MenuProps={menuProps}>
          <MenuItem value="" disabled>
            <em>시</em>
          </MenuItem>
          {CITIES.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select labelId="district-select-label" id="district-select" value={activeRegion.district} onChange={handleDistrictChange} disabled={activeRegion.city === ""} MenuProps={menuProps}>
          <MenuItem value="" disabled>
            <em>구</em>
          </MenuItem>
          {currentDistricts.map((district) => (
            <MenuItem key={district} value={district}>
              {district}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </S.Container>
  );
}

// 리전 데이터가 필요할 때
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // 건물 데이터 API 호출
//       const regionRes = await axios.get("/api/region");
//       console.log("regionRes.data: ", regionRes.data);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   void fetchData();
// }, [buildingType, region]);
