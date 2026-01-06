import { getGeocodeBuildings } from "@/lib/geocode";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const regionCode = searchParams.get("regionCode");
  const buildingType = searchParams.get("buildingType");

  // 필수 파라미터 체크
  if (!regionCode || !buildingType) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  try {
    const data = await getGeocodeBuildings({ regionCode, buildingType }); // 지역 데이터 처리 함수를 호출하고 결과를 기다립니다
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
