import React from "react";

interface ResumeHeadingProps {
  heading?: string;
  subHeading?: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
}

const ResumeHeading: React.FC<ResumeHeadingProps> = ({
  heading = "",
  subHeading = "",
  fromDate,
  toDate,
  description = "",
}) => (
  <div className="flex flex-col mb-4">
    <div className="relative flex justify-between items-center">
      <div className="absolute left-[-30px] h-4 w-4 top-1.5 rounded bg-orange-600"></div>
      <span className="text-orange-600 text-lg font-semibold">{heading}</span>
      {fromDate && toDate && (
        <div className="bg-orange-600 py-1 px-3 text-sm rounded text-white">
          {fromDate} - {toDate}
        </div>
      )}
    </div>
    <div className="text-base font-semibold text-black mt-2.5">
      {subHeading}
    </div>
    <div className="text-sm text-justify">{description}</div>
  </div>
);

export default ResumeHeading;
