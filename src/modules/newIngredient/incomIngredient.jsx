import React, { useState, useEffect } from "react";
import { Select } from "antd";

import { useIngredientCTX } from "@contexts/IngredientContext";

export default function IncomIngredient() {
  const ctx = useIngredientCTX();
  const { setNewIngredient, ingredient } = ctx;

  const [optionIngredient, setOptionIngredient] = useState([]);

  const [value, setValue] = useState([]);

  useEffect(() => {
    let data = [];

    if (ingredient && ingredient.length > 0) {
      data = ingredient.map((i) => ({
        key: i._id,
        label: i.ingredient_name,
        value: i.ingredient_name,
      }));
      setOptionIngredient(data);
    }
  }, [ingredient]);

  useEffect(() => {
    setNewIngredient((prevState) => ({
      ...prevState,
      incomp_Ingredient: value,
    }));
  }, [value]);
  return (
    <div className="col-span-2">
      <p className="mb-3 text-base">Incompatibility Ingredient</p>
      <Select
        mode="multiple"
        allowClear
        className="w-full rounded-lg"
        options={optionIngredient}
        placeholder="Incompatibility Ingredient..."
        name="incomp_Ingredient"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
