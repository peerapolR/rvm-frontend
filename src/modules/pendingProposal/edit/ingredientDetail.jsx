import React from "react";
import { Input } from "antd";

import { useIngredientCTX } from "@contexts/IngredientContext";

export default function IngredientDetail() {
  const ctx = useIngredientCTX();
  const { newIngredient, handleIngredientChange } = ctx;

  return (
    <div className="h-56">
      <div className="mb-5">
        <p className="mb-3 text-base">
          Ingredient Name<span className="text-revomed-red">*</span>
        </p>
        <Input
          placeholder="Ingredient Name..."
          size="large"
          name="ingredient_name"
          value={newIngredient.ingredient_name}
          onChange={handleIngredientChange}
        />
      </div>
      <div className="grid grid-cols-3 mb-5">
        <div className="mr-3">
          <p className="mb-3 text-base">
            Min Dose (mg/day)<span className="text-revomed-red">*</span>
          </p>
          <Input
            placeholder="0.00"
            size="large"
            name="dose_min"
            value={newIngredient.dose_min}
            onChange={handleIngredientChange}
          />
        </div>
        <div className="mr-3">
          <p className="mb-3 text-base">
            Max Dose (mg/day)<span className="text-revomed-red">*</span>
          </p>
          <Input
            placeholder="0.00"
            size="large"
            name="dose_max"
            value={newIngredient.dose_max}
            onChange={handleIngredientChange}
          />
        </div>
        <div>
          <p className="mb-3 text-base">Clinical Dose (mg/day)</p>
          <Input
            placeholder="0.00"
            size="large"
            name="dose_clinical"
            value={newIngredient.dose_clinical}
            onChange={handleIngredientChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="mr-3">
          <p className="mb-3 text-base">
            Lead time (days)<span className="text-revomed-red">*</span>
          </p>
          <Input
            placeholder="0.00"
            size="large"
            name="leadTime"
            value={newIngredient.leadTime}
            onChange={handleIngredientChange}
          />
        </div>
        <div className="mr-3">
          <p className="mb-3 text-base">
            Min Price/Kg (THB)<span className="text-revomed-red">*</span>
          </p>
          <Input
            placeholder="0.00"
            size="large"
            name="price_min"
            value={newIngredient.price_min}
            onChange={handleIngredientChange}
          />
        </div>
        <div>
          <p className="mb-3 text-base">
            Max Price/Kg (THB)<span className="text-revomed-red">*</span>
          </p>
          <Input
            placeholder="0.00"
            size="large"
            name="price_max"
            value={newIngredient.price_max}
            onChange={handleIngredientChange}
          />
        </div>
      </div>
    </div>
  );
}
