import React from "react";

export default function FormulaCard(props) {
  const { header, type, status, date, form, name, details } = props;

  return (
    <div className="flex flex-col">
      <div className="bg-revomed-primary-light2 px-4 py-3 flex justify-between items-center">
        <div className="text-revomed-primary-blue text-[16px] font-bold">
          {header}
        </div>
        <div className="flex gap-2"></div>
      </div>
    </div>
  );
}
