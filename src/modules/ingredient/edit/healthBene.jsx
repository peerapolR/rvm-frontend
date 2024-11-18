import React from "react";
import { Input } from "antd";

import { useIngredientCTX } from "@contexts/IngredientContext";

const { TextArea } = Input;

export default function HealthBene() {
  const ctx = useIngredientCTX();
  const { newIngredient, handleIngredientChange } = ctx;

  return (
    <div className="h-56 mt-16">
      <p className="mb-3 text-base">
        Health Benefits<span className="text-revomed-red">*</span>
      </p>
      <TextArea
        value={newIngredient.health_benefits}
        name="health_benefits"
        onChange={handleIngredientChange}
        placeholder="Health Benefits..."
        style={{
          height: 250,
          resize: "none",
          background: "white",
        }}
      />
    </div>
  );
}
