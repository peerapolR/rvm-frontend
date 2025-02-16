"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import formatPrice from "@functions/formatPrice";

// import { useIngredientCTX } from "@contexts/IngredientContext";

export default function FormulationCard({ e, selected, handleFormulaCard }) {
  const router = useRouter();
  const [found, setFound] = useState(false);

  const moHeader = (name) => {
    let newHeader = "";
    switch (name) {
      case "prototype":
        newHeader = "Prototype Formula";
        break;
      case "concept":
        newHeader = "Concept Formula";
        break;
      case "saleCustom":
        newHeader = "Sale-Custom Formula";
        break;
      default:
        break;
    }

    return newHeader;
  };

  const moFormulation = (formu) => {
    return formu.join(" - ");
  };

  useEffect(() => {
    setFound(() => (e._id === selected ? true : false));
  }, [selected]);

  return (
    <>
      <div
        onClick={() => handleFormulaCard(e._id, e)}
        className="cursor-pointer"
      >
        <div className="flex flex-col">
          {/* header */}
          <div
            className={` px-4 py-3 flex justify-between items-center rounded-t-lg ${
              found
                ? "border-revomed-light-grey2 bg-revomed-primary-light2"
                : "border-revomed-light-grey1 bg-revomed-light-grey2"
            }`}
          >
            <div className="text-revomed-primary-blue text-[16px] font-semibold">
              {moHeader(e.formula_type)}
            </div>
            <div className="text-revomed-primary-blue text-[16px] font-semibold">
              {e.formula_type === "concept" ? `Approve: ${e.approved}` : ""}
            </div>
          </div>
          {/* body */}
          <div className="flex flex-col pt-4 px-6 pb-[22px] border-revomed-light-grey2 rounded-b-lg border-r-1 border-l-1 border-b-1 min-h-[220px]">
            <div className="flex flex-col w-[242px] pb-3">
              <div className="text-revomed-primary-dark font-bold text-base">
                {e.formula_name}
              </div>
              <div className="text-revomed-primary mb-2">
                {"("}
                {moFormulation(e?.formulation)}
                {")"}
              </div>
              <div className="min-h-[70px]">
                <ul className="list-disc px-6 text-revomed-primary-light1">
                  {e?.master_ingredient.map((ingreName, idx) => [
                    <li key={idx}>{ingreName.ingredient_name}</li>,
                  ])}
                </ul>
              </div>
            </div>
            <div className="flex justify-between text-revomed-primary ">
              <div className="flex gap-2 ">{e.dosage_form}</div>
              <div className="text-revomed-secondary">
                {formatPrice(e.price)} THB
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
