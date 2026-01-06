import { FormControl, MenuItem, Select } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

import * as S from "./select.styles";
interface IBuildingSelectProps {
  buildingType: string;
  setBuildingType: React.Dispatch<React.SetStateAction<string>>;
}
const buildingMenu = [
  { type: "apartment", title: "아파트", icon: <ApartmentIcon fontSize="medium" color="primary" /> },
  { type: "officetel", title: "오피스텔", icon: <HomeWorkIcon fontSize="medium" color="primary" /> },
  { type: "rowHouse", title: "빌라", icon: <OtherHousesIcon fontSize="medium" color="primary" /> },
  { type: "singleHouse", title: "주택", icon: <OtherHousesIcon fontSize="medium" color="primary" /> },
];

export default function BuildingSelect({ buildingType, setBuildingType }: IBuildingSelectProps) {
  return (
    <S.Container>
      <FormControl fullWidth className="formControl">
        <Select
          labelId="buildingType-select-label"
          id="buildingType-select"
          value={buildingType}
          onChange={(e) => {
            setBuildingType(e.target.value);
          }}
        >
          <MenuItem value="" disabled>
            <em>건물 유형</em>
          </MenuItem>
          {buildingMenu.map((building) => (
            <MenuItem key={building.type} value={building.type}>
              {building.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </S.Container>
  );
}
