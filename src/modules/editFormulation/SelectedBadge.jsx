import React from "react";

export default function SelectedBadge({ name }) {
  return (
    <div className="h-[40px] bg-revomed-secondary-light3 text-revomed-secondary rounded-lg flex items-center px-5 font-normal mr-3">
      {name}
    </div>
  );
}
