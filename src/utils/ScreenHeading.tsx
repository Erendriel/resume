import React from "react";

interface ScreenHeadingProps {
  title: string;
  subHeading?: string;
}

const ScreenHeading: React.FC<ScreenHeadingProps> = ({ title, subHeading }) => {
  return (
    <div className="flex flex-col items-center w-full mb-12">
      <div className="text-4xl font-bold text-gray-800">
        <span>{title}</span>
      </div>
      {subHeading ? (
        <div className="tracking-wide my-2 text-sm text-black">
          <span>{subHeading}</span>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex items-center relative w-44 mt-2">
        <div className="w-full h-0.5 bg-gray-800"></div>
        <div className="absolute flex justify-center w-full h-2.5">
          <div className="w-9 h-2.5 rounded-full bg-orange-700"></div>
        </div>
      </div>
    </div>
  );
};

export default ScreenHeading;
