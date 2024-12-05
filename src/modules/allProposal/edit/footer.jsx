import React from "react";
import { useRouter } from "next/navigation";

import { useIngredientCTX } from "@contexts/IngredientContext";

import BaseButton from "@components/BaseButton";

// import { notification } from "antd";

export default function Footer() {
  const ctx = useIngredientCTX();
  const { saveDraftIngredient, editIngredient, newIngredient } = ctx;
  const router = useRouter();

  // const [api, contextHolder] = notification.useNotification();

  // const openNotification = () => {
  //   api.info({
  //     message: `กรุณากรอกข้อมูลของสารให้ครบถ้วน`,
  //     // description:
  //     //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  //     placement: "top",
  //     showProgress: true,
  //     pauseOnHover: true,
  //   });
  // };

  // const checkValidNext = () => {
  //   console.log(newIngredient);
  //   // if (!newProposal.formula || newProposal.formula === "") {
  //   //   openNotification();
  //   // } else {
  //   //   editIngredient();
  //   // }
  // };

  return (
    <div className="min-h-20 bg-revomed-white">
      {contextHolder}
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
          Cancel
        </BaseButton>
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 rounded-lg border-1 border-revomed-primary bg-revomed-primary text-white hover:bg-black"
          onClick={() => {
            editIngredient();
          }}
        >
          Add Ingredient
        </BaseButton>
      </div>
    </div>
  );
}
