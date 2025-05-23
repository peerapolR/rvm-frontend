import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import BaseButton from "@components/BaseButton";

import { notification } from "antd";

import { useNewProposalCTX } from "@contexts/NewProposalContext";
import { useFormulaCTX } from "@contexts/FormulaContext";

export default function FooterBar(props) {
  const { readyToNext } = props;
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const newProposalctx = useNewProposalCTX();
  const { draftNewProposal, setNewProposal, newProposal } = newProposalctx;

  const ctx = useFormulaCTX();
  const {
    addNewFormulaBySale,
    masterIngredient,
    activeIngredient,
    sumPrice,
    newFormula,
  } = ctx;

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

  const openNameNotification = () => {
    api.info({
      message: `กรุณากรอกชื่อสูตร`,
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

  const checkValidNext = () => {
    if (newFormula.formula_name === "") {
      openNameNotification();
    } else {
      addNewFormulaBySale();
      setNewProposal(() => ({
        ...newProposal,
        master_ingredient: masterIngredient,
        ingredient: activeIngredient,
        prePrice: sumPrice,
        formular_name: newFormula.formula_name,
      }));
      router.push("/main/proposal/packaging");
    }
  };

  return (
    <div className="min-h-20 bg-revomed-white">
      {contextHolder}
      <div className="flex gap-5 justify-between mx-5 pt-4">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-0 bg-revomed-white"
          onClick={() => {
            router.push("/main");
          }}
        >
          Cancel
        </BaseButton>
        <div className="flex gap-5">
          <BaseButton
            className="w-[162px] h-[48px] py-3 px-10  bg-revomed-white border-0 text-revomed-secondary"
            disabled={readyToNext}
            onClick={() => {
              draftNewProposal();
            }}
          >
            Save
          </BaseButton>
          <BaseButton
            className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-white rounded-lg text-revomed-secondary"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </BaseButton>
          <BaseButton
            className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-secondary rounded-lg text-revomed-white"
            disabled={readyToNext}
            onClick={checkValidNext}
          >
            Next
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
