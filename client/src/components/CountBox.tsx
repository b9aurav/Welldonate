import React from "react";

type Props = {
  title: string,
  value: string,
};

const CountBox = ({ title, value }: Props) => {
  return (
    <div className={`flex flex-wrap gap-[30px] w-full hover:scale-y-110 transition-all duration-200`}>
      <div className="flex-1 md:w-1/2">
        <div className="flex flex-col bg-[#DEE2E6] shadow-2xl rounded-[15px] border-[#CED4DA] border-[1px]">
          <h4 className="font-bold text-[30px] p-3 text-[#343A40] bg-[#E9ECEF] rounded-t-[10px] text-center truncate shadow-inner">
            {value}
          </h4>
          <p className="font-normal text-[16px] text-[#343A40] bg-[#DEE2E6] px-3 py-2 rounded-b-[10px] text-center">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountBox;
