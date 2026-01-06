const COLLECTIONS_KOR = {
  apartment: "아파트",
  officetel: "오피스텔",
  rowHouse: "빌라",
  singleHouse: "주택",
};
const COLLECTIONS_ENG = {
  apartment: "apartment",
  officetel: "officetel",
  rowHouse: "rowHouse",
  singleHouse: "singleHouse",
};

export const buildingTypeKorToEng = (type: string): string => {
  switch (type) {
    case COLLECTIONS_KOR.apartment:
      return "apartment";
    case COLLECTIONS_KOR.officetel:
      return "officetel";
    case COLLECTIONS_KOR.rowHouse:
      return "rowHouse";
    case COLLECTIONS_KOR.singleHouse:
      return "singleHouse";
    default:
      return "";
  }
};
export const buildingTypeEngToKor = (type: string): string => {
  switch (type) {
    case COLLECTIONS_ENG.apartment:
      return "아파트";
    case COLLECTIONS_ENG.officetel:
      return "오피스텔";
    case COLLECTIONS_ENG.rowHouse:
      return "빌라";
    case COLLECTIONS_ENG.singleHouse:
      return "주택";
    default:
      return "";
  }
};
