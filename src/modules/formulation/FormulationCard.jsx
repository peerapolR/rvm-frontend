import React from "react";

export default function FormulationCard({ icon, name, setSelected, selected }) {
  const handleFormulation = () => {
    if (!name.includes(selected)) {
    } else {
      setSelected((selected) => [...selected, name]);
    }
  };

  return (
    <div
      className="w-full h-[72px] bg-revomed-white rounded-lg flex px-10 items-center text-revomed-primary text-base cursor-pointer hover:border-1 border-revomed-primary"
      onClick={handleFormulation}
    >
      {icon}
      <span className="ml-3">{name}</span>
    </div>
  );
}
