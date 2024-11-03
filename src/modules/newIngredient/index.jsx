import React from "react";

import PhotoSection from "./photoSection";
import IngredientDetail from "./ingredientDetail";
import ChemicalComp from "./chemicalComp";
import Cert from "./cert";
import HealthBene from "./healthBene";
import ExHealth from "./exHealth";
import Formulation from "./formulation";
import IncomIngredient from "./incomIngredient";
import Footer from "./footer";

export default function Page() {
  return (
    <>
      <div className="p-6">
        {/* <div className="flex justify-between items-center mb-6">
        <Title level={4} style={{ color: "#004D7D" }}>
          New Ingredient
        </Title>
      </div> */}
        <div className="grid grid-cols-2 gap-5">
          <PhotoSection />
          <IngredientDetail />
          <ChemicalComp />
          <Cert />
          <HealthBene />
          <ExHealth />
          <Formulation />
          <IncomIngredient />
        </div>
      </div>
      <Footer />
    </>
  );
}
