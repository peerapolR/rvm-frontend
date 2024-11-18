import React from "react";
import { Input } from "antd";

import { useIngredientCTX } from "@contexts/IngredientContext";

const { TextArea } = Input;

export default function Cert() {
  const ctx = useIngredientCTX();
  const { newIngredient, handleIngredientChange } = ctx;
  return (
    <div className="h-56 mt-16">
      <p className="mb-3 text-base">Certification</p>
      <TextArea
        value={newIngredient.cert}
        name="cert"
        onChange={handleIngredientChange}
        placeholder="Certification..."
        style={{
          height: 250,
          resize: "none",
          background: "white",
        }}
      />
    </div>
  );
}
