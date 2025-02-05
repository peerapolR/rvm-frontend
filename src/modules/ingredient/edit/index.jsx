import React, { useParams, useEffect } from "react";

import Title from "antd/es/typography/Title";
import PhotoSection from "./photoSection";
import IngredientDetail from "./ingredientDetail";
import ChemicalComp from "./chemicalComp";
import Cert from "./cert";
import HealthBene from "./healthBene";
import ExHealth from "./exHealth";
import Formulation from "./formulation";
import IncomIngredient from "./incomIngredient";
import Footer from "./footer";

import { useIngredientCTX } from "@contexts/IngredientContext";

export default function Page({ _id }) {
  const ctx = useIngredientCTX();
  const {
    fetchIngredientById,
    ingredientById: ingredient,
    setNewIngredient,
    newIngredient,
  } = ctx;

  useEffect(() => {
    fetchIngredientById(_id);
  }, []);

  useEffect(() => {
    setNewIngredient(ingredient);
  }, [ingredient]);

  return (
    <>
      <div className="p-6">
        {/* <div className="flex justify-between items-center mb-6">
          <Title level={4} style={{ color: "#004D7D" }}>
            Ingredient Detail
          </Title>
        </div> */}
        <div className="grid grid-cols-2 gap-5">
          <PhotoSection photo={ingredient.ingredient_image} />
          <IngredientDetail />
          <ChemicalComp />
          <Cert />
          <HealthBene />
          <ExHealth />
          <Formulation oldFormulation={newIngredient.formulation} />
          <IncomIngredient oldIncom={newIngredient.incomp_Ingredient} />
        </div>
      </div>
      <Footer />
    </>
  );
}
