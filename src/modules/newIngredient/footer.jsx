import React from "react";
import { useRouter } from "next/navigation";

import { useIngredientCTX } from "@contexts/IngredientContext";

import BaseButton from "@components/BaseButton";

import { notification } from "antd";

export default function Footer() {
  const ctx = useIngredientCTX();
  const { saveDraftIngredient, addNewIngredient, newIngredient } = ctx;
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.info({
      message: `กรุณากรอกข้อมูลของสารให้ครบถ้วน`,
      // description:
      //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement: "top",
      showProgress: true,
      pauseOnHover: true,
    });
  };

  const openNumNotification = () => {
    api.info({
      message: `กรุณากรอก Dose และ Price ให้เป็นตัวเลข`,
      // description:
      //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement: "top",
      showProgress: true,
      pauseOnHover: true,
    });
  };

  function isValidNumber(value) {
    return typeof value === "string" && value.trim() !== "" && !isNaN(value);
  }

  const checkValidNext = () => {
    if (
      !newIngredient.ingredient_name ||
      newIngredient.ingredient_name === "" ||
      !newIngredient.dose_min ||
      newIngredient.dose_min === "" ||
      !newIngredient.dose_max ||
      newIngredient.dose_max === "" ||
      !newIngredient.leadTime ||
      newIngredient.leadTime === "" ||
      !newIngredient.price_min ||
      newIngredient.price_min === "" ||
      !newIngredient.price_max ||
      newIngredient.price_max === "" ||
      !newIngredient.chemical_comp ||
      newIngredient.chemical_comp === "" ||
      !newIngredient.health_benefits ||
      newIngredient.health_benefits === "" ||
      newIngredient.formulation.length <= 0
    ) {
      openNotification();
    } else {
      if (
        isValidNumber(newIngredient.dose_min) &&
        isValidNumber(newIngredient.dose_max) &&
        isValidNumber(newIngredient.price_min) &&
        isValidNumber(newIngredient.price_max)
      ) {
        addNewIngredient();
      } else {
        openNumNotification();
      }
    }
  };

  const checkValidSave = () => {
    if (
      !newIngredient.ingredient_name ||
      newIngredient.ingredient_name === ""
    ) {
      openNotification();
    } else {
      saveDraftIngredient();
    }
  };
  return (
    <div className="min-h-20 bg-revomed-white">
      {contextHolder}
      <div className="flex gap-5 justify-end mx-5 pt-4">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-0 bg-revomed-white"
          onClick={() => {
            checkValidSave();
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
          Cancel
        </BaseButton>
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 rounded-lg border-1 border-revomed-primary bg-revomed-primary text-white hover:bg-black"
          onClick={checkValidNext}
        >
          Add Ingredient
        </BaseButton>
      </div>
    </div>
  );
}
