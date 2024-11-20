"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import FormulationCard from "./FormulationCard";

// import { useIngredientCTX } from "@contexts/IngredientContext";

export default function FormulaContainer({
  listProposalByCon,
  handleFormulaCard,
  selected,
}) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-revomed-white mt-1">
      {listProposalByCon.map((e, i) => [
        <FormulationCard
          e={e}
          key={i}
          selected={selected}
          handleFormulaCard={handleFormulaCard}
        />,
      ])}
    </div>
  );
}
