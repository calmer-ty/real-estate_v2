import Home from "@/components/units/home";

import type { IMetadata } from "@/commons/types";

export const generateMetadata = async (): Promise<IMetadata> => {
  return {
    title: "부동산 거래 서비스",
    description: "거래된 매물을 조회하고, 직접 매물을 등록해보세요.",
    openGraph: {
      title: "부동산 거래 서비스",
      description: "거래된 매물을 조회하고, 직접 매물을 등록해보세요.",
      images: ["https://www.calmer96.store/images/apt.jpg"],
      url: "/images/apt.jpg",
    },
  };
};

export default function HomePage() {
  return <Home />;
}
