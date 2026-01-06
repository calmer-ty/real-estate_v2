import { getRegion } from "@/lib/region";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getRegion(); // 지역 데이터 처리 함수를 호출하고 결과를 기다립니다
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
