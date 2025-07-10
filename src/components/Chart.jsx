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

// 1️⃣ Chart.js에서 필요한 모듈 등록
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ChartDataLabels
);

export default function Chart() {
  const [chartData, setChartData] = useState(null);

  // 2️⃣ 실제 K-means 결과로 받을 데이터 형식
  const rawData = [
    {
      label: "업무 능력",
      left: { type: "즉시전력형", score: 74 },
      right: { type: "성장가능형", score: 26 },
    },
    {
      label: "갈등 대응 방식",
      left: { type: "직면형", score: 62 },
      right: { type: "숙고형", score: 38 },
    },
    {
      label: "성향 및 인성",
      left: { type: "혁신적", score: 35 },
      right: { type: "전통적", score: 65 },
    },
    {
      label: "평가 기준",
      left: { type: "객관적 자료", score: 49 },
      right: { type: "주관적 인상", score: 51 },
    },
  ];

  useEffect(() => {
    const labels = rawData.map((item) => item.label);
    const leftScores = rawData.map((item) => -item.left.score);
    const rightScores = rawData.map((item) => item.right.score);

    // ✅ 항목별 고유 색상 (인덱스 순서 기준)
    const colorPalette = ["#ef4444", "#8b5cf6", "#0ea5e9", "#22c55e"];

    // ✅ 조건부 색상 설정
    const leftColors = rawData.map((item, i) =>
      item.left.score > item.right.score ? colorPalette[i] : "#E5E7EB"
    );

    const rightColors = rawData.map((item, i) =>
      item.right.score > item.left.score ? colorPalette[i] : "#E5E7EB"
    );

    setChartData({
      labels,
      datasets: [
        {
          label: "좌측 성향",
          data: leftScores,
          backgroundColor: leftColors,
          borderRadius: 20,
          datalabels: {
            display: false,
          },
        },
        {
          label: "우측 성향",
          data: rightScores,
          backgroundColor: rightColors,
          borderRadius: 20,
          datalabels: {
            display: false,
          },
        },
      ],
    });
  }, []);

  // 3️⃣ 옵션 설정 (눈금선 제거 + 막대 두께 조정 + 가운데 레이블 유지)
  const options = {
    indexAxis: "y",
    responsive: true,
    barThickness: 12, // ✅ 막대 두께 조절
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        font: {
          size: 12,
          weight: "bold",
        },
        clamp: true,
        clip: false,
      },
    },
    scales: {
      x: {
        display: false, // ❌ x축 제거
        min: -100,
        max: 100,
        stacked: true,
      },
      y: {
        stacked: true,
        display: false, // ❌ y축도 제거
        grid: { display: false }, // ❌ y축 눈금 제거
        ticks: {
          display: false, // ❌ 왼쪽 레이블 제거
        },
      },
    },
  };

  if (!chartData) return <p>로딩 중입니다...</p>;

  return <Bar data={chartData} options={options} />;
}

/*
📦 데이터 흐름 (예시: HR 성향 테스트)
프론트에서 사용자 응답을 POST로 전송 (예: POST /api/submit-answers)

백엔드는 응답을 바탕으로 K-means 알고리즘 실행

각 사용자 응답을 벡터로 변환 → K개의 군집으로 분류

군집 번호에 따라 사전에 정의된 성향 분석 템플릿에 매핑

예: 군집 0번 → 즉시전력형 74%, 성장가능형 26%

위에서 말한 JSON 형태로 응답 생성

프론트는 해당 데이터를 받아서 차트로 시각화
 */
