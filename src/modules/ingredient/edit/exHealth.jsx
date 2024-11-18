import React from "react";
import { Input } from "antd";

import { useIngredientCTX } from "@contexts/IngredientContext";

const { TextArea } = Input;

export default function ExHealth() {
  const ctx = useIngredientCTX();
  const { newIngredient, handleIngredientChange } = ctx;

  return (
    <div className="h-56 mt-16">
      <p className="mb-3 text-base">Exclusive Health Benefits</p>
      <TextArea
        value={newIngredient.ex_health_benefits}
        name="ex_health_benefits"
        onChange={handleIngredientChange}
        placeholder="Exclusive Health Benefits..."
        style={{
          height: 250,
          resize: "none",
          background: "white",
        }}
      />
    </div>
  );
}
