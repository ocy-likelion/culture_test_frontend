// components/Chart.jsx
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
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

export default function Chart({ label, left, right, color }) {
  const [chartData, setChartData] = useState(null);

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
      labels: [label],
      datasets: [
        {
          label: "Left",
          data: [leftScore],
          backgroundColor: [leftColor],
          borderRadius: leftRadii,
          borderSkipped: false,
        },
        {
          label: "Right",
          data: [rightScore],
          backgroundColor: [rightColor],
          borderRadius: rightRadii,
          borderSkipped: false,
        },
      ],
    });
  }, [label, left, right, color]);

  const options = {
    indexAxis: "y",
    responsive: true,
    barThickness: 6,
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
        categoryPercentage: 0.5,
        barPercentage: 1.0,
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
    <div className="w-full flex flex-col items-center">
      {/* 가운데 레이블 */}
      <div className="text-center text-grey-90 text-[1.4rem]">{label}</div>

      {/* Bar 차트 */}
      <div className="w-full h-[4rem] flex justify-center items-center">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
