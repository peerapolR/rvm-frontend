import React, { useEffect, useState } from "react";

export default function FormulationCard({
  icon,
  name,
  setFormulation,
  formulation,
}) {
  const handleFormulation = () => {
    if (formulation.length < 3) {
      if (formulation.includes(name)) {
        setFormulation((prevFormulation) =>
          prevFormulation.filter((item) => item !== name)
        );
      } else {
        setFormulation((formulation) => [...formulation, name]);
      }
    } else {
      if (formulation.includes(name)) {
        setFormulation((prevFormulation) =>
          prevFormulation.filter((item) => item !== name)
        );
      }
    }
  };

  return (
    <div
      className={`w-full h-[72px]  rounded-lg flex px-10 items-center text-revomed-primary text-base  ${
        formulation?.includes(name)
          ? "bg-revomed-primary-light3 border-1 border-revomed-primary cursor-pointer"
          : formulation?.length < 3
          ? "bg-revomed-white cursor-pointer"
          : "bg-revomed-white cursor-not-allowed"
      }`}
      onClick={handleFormulation}
    >
      {icon}
      <span className="ml-3">{name}</span>
    </div>
  );
}
