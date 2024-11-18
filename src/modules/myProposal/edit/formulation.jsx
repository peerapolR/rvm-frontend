import React, { useState, useEffect } from "react";
import { Select } from "antd";

import { useIngredientCTX } from "@contexts/IngredientContext";

export default function Formulation({ oldFormulation }) {
  const ctx = useIngredientCTX();
  const { setNewIngredient } = ctx;

  const optionFormula = [
    { label: "Skin", value: "Skin" },
    {
      label: "Protein",
      value: "Protein",
    },
    {
      label: "Weight Management",
      value: "Weight Management",
    },
    {
      label: "Anti-Aging",
      value: "Anti-Aging",
    },
    {
      label: "Immune",
      value: "Immune",
    },
    {
      label: "Sleep & Stress",
      value: "Sleep & Stress",
    },
    {
      label: "Eye & Brain",
      value: "Eye & Brain",
    },
    {
      label: "Reduce Swelling",
      value: "Reduce Swelling",
    },
    {
      label: "Bone & Joint",
      value: "Bone & Joint",
    },
    {
      label: "Detox",
      value: "Detox",
    },
    {
      label: "Kid Formula",
      value: "Kid Formula",
    },
    {
      label: "Probiotic - Prebiotic - Postbiotic",
      value: "Probiotic - Prebiotic - Postbiotic",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];
  const [value, setValue] = useState([]);
  const suffix = (
    <>
      <span>{value.length} / 3</span>
    </>
  );
  useEffect(() => {
    setNewIngredient((prevState) => ({
      ...prevState,
      formulation: value,
    }));
  }, [value]);

  return (
    <div className=" mt-16 col-span-2">
      <p className="mb-3 text-base">
        Formulation<span className="text-revomed-red">*</span>
      </p>
      <Select
        mode="multiple"
        allowClear
        maxCount="3"
        className="w-full rounded-lg"
        options={optionFormula}
        suffixIcon={suffix}
        placeholder="Select Skincare Category..."
        name="formulation"
        value={oldFormulation}
        onChange={setValue}
      />
    </div>
  );
}
