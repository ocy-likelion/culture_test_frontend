// components/Chart.jsx
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartProps } from "@/models/common";
import { ChartData, ChartOptions } from "chart.js";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ChartDataLabels
);

export default function Chart({ label, left, right, color }: ChartProps) {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);

  useEffect(() => {
    const leftScore = left.score;
    const rightScore = right.score;

    const leftColor = leftScore > rightScore ? color : "#E5E7EB";
    const rightColor = rightScore > leftScore ? color : "#E5E7EB";

    const leftRadii = {
      topLeft: 30,
      bottomLeft: 30,
      topRight: 0,
      bottomRight: 0,
    };

    const rightRadii = {
      topLeft: 0,
      bottomLeft: 0,
      topRight: 30,
      bottomRight: 30,
    };

    setChartData({
      labels: [label], // 카테고리 배열 (현재는 label 하나로, 개별 막대)
      datasets: [
        {
          label: "Left",
          data: [leftScore], // 카테고리 하나이므로 점수값 하나만
          backgroundColor: [leftColor],
          borderRadius: leftRadii,
          borderSkipped: false,
          categoryPercentage: 0.5, //	카테고리 안의 절반만 사용 (슬림하고 여유)
          barPercentage: 1.0, // 여러 막대 중 이 막대가 최대 너비 차지
          barThickness: 6,
        },
        {
          label: "Right",
          data: [rightScore],
          backgroundColor: [rightColor],
          borderRadius: rightRadii,
          borderSkipped: false,
          categoryPercentage: 0.5,
          barPercentage: 1.0,
          barThickness: 6,
        },
      ],
    });
  }, [label, left, right, color]);

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false, // ✅ 이걸 추가하면 너비는 100% 유지됨
    scales: {
      x: {
        stacked: true,
        max: 100,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      datalabels: { display: false },
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  if (!chartData) return null;

  return (
    <div className="w-full min-w-0 flex flex-col flex-grow items-center">
      {/* 가운데 레이블 */}
      <div className="text-center text-grey-90 text-[1.4rem]">{label}</div>

      {/* Bar 차트 */}
      <div className="w-full h-[4rem] flex justify-center items-center">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
