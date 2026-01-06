// Chart
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

import { getCurrentDealYmd } from "@/commons/utils/currentDate";

import * as S from "./graph.styles";
import type { IGeocodeBuildings } from "@/commons/types";
interface IInfoGraphProps {
  activeMarker: IGeocodeBuildings;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "3개월 내 거래가 평균",
    },
  },
};

const labels = getCurrentDealYmd(3).reverse();
const formattedLabels = labels.map((label) => {
  const year = label.slice(2, 4);
  const month = label.slice(4, 6);
  return `${year}.${month}`;
});

export default function InfoGraph({ activeMarker }: IInfoGraphProps) {
  // 반복문으로 key에 해당 달을 넣고 가격데이터 저장
  const monthlyMap = new Map<string, { sum: number; count: number }>();
  for (const b of activeMarker.buildings) {
    const key = `${String(b.dealYear).slice(2, 4)}.${String(b.dealMonth).padStart(2, "0")}`;
    const amount = Number(b.dealAmount.replace(/,/g, ""));

    // 초기값 설정
    const stat = monthlyMap.get(key) ?? { count: 0, sum: 0 };

    stat.sum += amount;
    stat.count += 1;

    monthlyMap.set(key, stat);
  }

  const data = {
    labels: formattedLabels,
    datasets: [
      {
        label: "거래가 평균",
        data: formattedLabels.map((label) => {
          const stat = monthlyMap.get(label);
          return stat ? stat.sum / stat.count : null;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <S.Container>
      <Line options={options} data={data} />
    </S.Container>
  );
}
