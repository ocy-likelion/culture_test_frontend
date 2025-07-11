import Chart from "@components/Chart";

export default function ChartCanvas({ rawData, colorPalette }) {
  return (
    <div className="rounded-[0.6rem] flex flex-col justify-between items-center bg-white py-[3.6rem] px-[2.8rem] gap-[1.2rem]">
      {rawData.map((item, index) => (
        <div className="flex items-end w-full">
          {/* 왼쪽 */}
          <div
            className={`w-[16rem] text-nowrap flex flex-col items-start 
                  gap-2 text-left font-medium ${
                    item.left.score > item.right.score
                      ? colorPalette[index].text
                      : "text-grey-70"
                  }`}
          >
            <p className="text-[1.7rem]">{item.left.score}%</p>
            <p className="text-[1.4rem]">{item.left.type}</p>
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
            className={`w-[16rem] text-nowrap flex flex-col items-end 
                  gap-2 text-left font-medium ${
                    item.right.score > item.left.score
                      ? colorPalette[index].text
                      : "text-grey-70"
                  }`}
          >
            <p className="text-[1.7rem]">{item.right.score}%</p>
            <p className="text-[1.4rem]">{item.right.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
