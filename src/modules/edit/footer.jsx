import React from "react";
import { useRouter } from "next/navigation";

import { useIngredientCTX } from "@contexts/IngredientContext";

import BaseButton from "@components/BaseButton";

export default function Footer() {
  const ctx = useIngredientCTX();
  const { saveDraftIngredient, addNewIngredient } = ctx;
  const router = useRouter();
  return (
    <div className="min-h-20 bg-revomed-white">
      <div className="flex gap-5 justify-end mx-5 pt-4">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-0 bg-revomed-white"
          onClick={() => {
            saveDraftIngredient();
          }}
        >
          Save
        </BaseButton>
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary rounded-lg text-revomed-secondary"
          onClick={() => {
            router.push("/main/ingredient");
          }}
        >
          Cancle
        </BaseButton>
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 rounded-lg border-1 border-revomed-primary bg-revomed-primary text-white hover:bg-black"
          onClick={() => {
            addNewIngredient();
          }}
        >
          Add Ingredient
        </BaseButton>
      </div>
    </div>
  );
}
