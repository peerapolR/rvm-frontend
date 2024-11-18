import React from "react";
import { Input } from "antd";

import { useIngredientCTX } from "@contexts/IngredientContext";

const { TextArea } = Input;

export default function ChemicalComp() {
  const ctx = useIngredientCTX();
  const { newIngredient, handleIngredientChange } = ctx;

  return (
    <div className="h-56 mt-16">
      <p className="mb-3 text-base">
        Chemical Composition<span className="text-revomed-red">*</span>
      </p>
      <TextArea
        value={newIngredient.chemical_comp}
        name="chemical_comp"
        onChange={handleIngredientChange}
        placeholder="Chemical Composition..."
        style={{
          height: 250,
          resize: "none",
          background: "white",
        }}
      />
    </div>
  );
}
