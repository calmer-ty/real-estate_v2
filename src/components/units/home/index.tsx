"use client";

import * as S from "./index.styles";

export const motionLinks = [
  {
    href: "/view",
    className: "link-1",
    title: "매물 실거래 비교",
    desc: "매물을 실거래가 정보와 함께 지도에서 확인해보세요!",
  },

  {
    href: "https://apply.lh.or.kr/lhapply/main.do#gnrlPop/",
    className: "link-4",
    title: "청약",
    desc: "최신 아파트 청약 일정과 조건을 빠르게 확인하세요!",
    target: "_blank",
  },
  {
    href: "https://www.reby24.com/",
    className: "link-5",
    title: "분양",
    desc: "신규 아파트 및 오피스텔 분양 정보를 한눈에 찾아보세요.",
    target: "_blank",
  },
];

export default function Home() {
  // const router = useRouter();
  // const isSmall = useMediaQuery("(max-width:480px)");

  // useEffect(() => {
  //   if (isSmall) {
  //     router.push("/apartment");
  //   }
  // }, [router, isSmall]);

  return (
    <S.Container>
      <S.Card
      // initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}
      >
        <S.ImageWrapper>
          <img src="/images/apt.jpg" alt="Featured Property" />
        </S.ImageWrapper>

        <S.Title>실거래 매물 보기</S.Title>
        <S.Description>최신 건물 실거래가 정보를 한눈에 확인하고, 관심 매물을 자세히 살펴보세요.</S.Description>

        <S.Button href="/view">매물 보러 가기</S.Button>
      </S.Card>
    </S.Container>
  );
}
