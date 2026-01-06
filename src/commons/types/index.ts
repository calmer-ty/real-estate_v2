// 지역코드 API
export interface IRegionAPI {
  StanReginCd: [
    { head: [IRegionHeadTotalCount, IRegionHeadPageInfo] }, // 첫 번째 요소는 head
    { row: IRegionItem[] } // 두 번째 요소는 row
  ];
}

export interface IRegionHeadTotalCount {
  totalCount: number;
}
export interface IRegionHeadPageInfo {
  numOfRows: number;
  pageNo: number;
}

export interface IRegionItem {
  region_cd: string;
  locatadd_nm: string;
  umd_cd: string;
  sido_cd: string;
  sgg_cd: string;
  locallow_nm: string;
}

export interface IRegionItemFiltered {
  city: string;
  district: string;
  regionCode: string;
}

// 건물 API
export interface IBuildingAPI {
  response: {
    body: {
      items: {
        item: IBuildingItem[]; // Item 배열 형태로 정의
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}
export interface IBuildingItem {
  estateAgentSggNm: string;
  regionName: string;
  umdNm: string;
  jibun: string;
  floor: number;
  dealAmount: string; // 초기엔 string, 변환 후 number
  excluUseAr: number;
  dealDay: number;
  dealMonth: number;
  dealYear: number;
  buildYear: number;
  rgstDate: string;

  // 건물 이름
  aptNm: string;
  offiNm: string;
  mhouseNm: string;
  houseType: string;

  // 인덱스 시그니처 추가
  [key: string]: string | number;
}

// Geocode API
export interface IGeocodeAPI {
  addresses: Array<{
    x: string; // 경도
    y: string; // 위도
    roadAddress: string;
    jibunAddress: string;
    addressElements: string[];
  }>;
}
export interface IGeocode {
  latitude: string;
  longitude: string;
  roadAddress: string;
  jibunAddress: string;
}
export interface IGeocodeBuildings {
  buildings: IBuildingItem[];
  geocode: IGeocode;
}

export interface IGetBuildingsProps {
  regionCode: string;
  buildingType: string;
}

// firestore
export interface IFirestore {
  _id: string;
  buildingType: string;
  transactionType: string;
  address: string;
  addressDetail: string;
  area: number;
  roomCount: number;
  price: number;
  rent: number;
  manageCost: number;
  floor: number;
  bathroomCount: number;
  elevator: string;
  desc?: string;
  imageUrls?: string[];
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  deletedAt: {
    seconds: number;
    nanoseconds: number;
  };
}
export interface IFirestoreAsset {
  _id: string;
  won: number;
  AS: number;
  ASGrowth: number;
  FA: number;
  FAGrowth: number;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

// maps
declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
    maps: any;
    HOME_PATH: any;
  }
}

// Asset Form
export interface IAssetForm {
  cash: number; // 원화
  monthlySavings: number; // 월 저축 금액
  monthlyInvestment: number; // 월 투자 금액
  investmentAssets: number; // 투자 자산
  investmentAssetsGrowthRate: number; // 투자 자산 연 상승률
}
// Write Form
export interface IWriteForm {
  buildingType: string;
  transactionType: string;
  address: string;
  addressDetail: string;
  area: number;
  roomCount: number;
  price: number;
  rent: number;
  manageCost: number;
  floor: number;
  bathroomCount: number;
  elevator: string;
  desc: string;
  imageUrls: string[];
}

export interface IBuildingListParams {
  buildingType: string;
  listId: string;
}
export interface IBuildingListParamsProps {
  // 디테일 작업사 삭제나 수정 필요
  params: IBuildingListParams;
}

// metaData
export interface IOpenGraphMetadata {
  title: string;
  description: string;
  images: string | string[];
  url?: string;
}
export interface IMetadata {
  title?: string;
  description?: string;
  openGraph: IOpenGraphMetadata;
}
