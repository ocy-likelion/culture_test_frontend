import { ChartCanvasProps } from "@/models/common";
import Chart from "@components/Chart";

export default function ChartCanvas({ chartData }: ChartCanvasProps) {
  const colorPalette = [
    { hex: "#FF7E8F", text: "text-type-pink" },
    { hex: "#AD7EFF", text: "text-type-purple" },
    { hex: "#00C0EB", text: "text-type-blue" },
    { hex: "#35D12A", text: "text-type-green" },
  ];

  return (
    <div className="w-full rounded-[0.6rem] flex flex-col justify-between items-center bg-white py-[3.6rem] px-[2rem] gap-[1.2rem]">
      {chartData?.map((item, index) => (
        <div key={index} className="flex items-end w-full">
          {/* 왼쪽 */}
          <div
            className={`min-w-[6rem] xl:min-w-[10rem] text-nowrap flex flex-col items-start 
                  gap-2 text-left font-medium ${
                    item.left.score > item.right.score
                      ? colorPalette[index].text
                      : "text-grey-70"
                  }`}
          >
            <p className="text-[1.3rem] lg:text-[1.7rem]">{item.left.score}%</p>
            <p className="text-[1rem] lg:text-[1.4rem]">{item.left.type}</p>
          </div>

          <Chart
            key={index}
            label={item.label}
            left={item.left}
            right={item.right}
            color={colorPalette[index].hex}
          />

          {/* 오른쪽 */}
          <div
            className={` text-nowrap flex flex-col min-w-[6rem] xl:min-w-[10rem] items-end 
                  gap-2 text-left font-medium ${
                    item.right.score > item.left.score
                      ? colorPalette[index].text
                      : "text-grey-70"
                  }`}
          >
            <p className="text-[1.3rem] lg:text-[1.7rem]">
              {item.right.score}%
            </p>
            <p className="text-[1rem] lg:text-[1.4rem]">{item.right.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
