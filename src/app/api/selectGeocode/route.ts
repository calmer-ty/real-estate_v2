import { NextResponse } from "next/server";
import { getSelectGeocode } from "../geocode/select";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const regionName = searchParams.get("regionName");

  // 필수 파라미터 체크
  if (!regionName) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  try {
    const data = await getSelectGeocode(regionName);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
