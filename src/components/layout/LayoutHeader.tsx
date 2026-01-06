"use client";

import Link from "next/link";

import * as S from "./layout.styles";

export default function LayoutHeader() {
  return (
    <S.Header>
      <h1 id="logo">
        <Link href="/">
          <img src="/images/icon_house.png" alt="" style={{ width: "100%", height: "100%" }} />
        </Link>
      </h1>
      {/* <LayoutNav /> */}
    </S.Header>
  );
}
