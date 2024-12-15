"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, Popover } from "antd";
import EditIcon from "@icons/EditIcon";
import SubMenuIcon from "@icons/SubMenuIcon";
import BasePagination from "@components/Pagination";
import UnpubIcon from "@icons/UnpubIcon";
import BinIcon from "@icons/BinIcon";

import formatDate from "@functions/formatDate";
import { div } from "framer-motion/client";

// import { useIngredientCTX } from "@contexts/IngredientContext";

export default function IngredientListContainer({ listProposalByCon }) {
  const router = useRouter();

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

  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-revomed-white mt-1">
      {listProposalByCon.map((e, i) => [
        <div key={i}>
          <div className="flex flex-col">
            {/* header */}
            <div className="bg-revomed-primary-light2 px-4 py-3 flex justify-between items-center rounded-t-lg">
              <div className="text-revomed-primary-blue text-[16px] font-bold">
                {moHeader(e.formula_type)}
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
                  {parseFloat(e.price).toFixed(2)} THB
                </div>
              </div>
            </div>
          </div>
        </div>,
      ])}
    </div>
  );
}
