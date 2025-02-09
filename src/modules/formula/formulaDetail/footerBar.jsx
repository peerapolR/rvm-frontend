import React from "react";
import { useRouter } from "next/navigation";

import BaseButton from "@components/BaseButton";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function FooterBar({ _id }) {
  const router = useRouter();
  const ctx = useFormulaCTX();
  const { publishFormula } = ctx;

  return (
    <>
      <div className="min-h-20 bg-revomed-white bottom-0 flex gap-5 justify-end pt-4 px-5">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-1 border-revomed-secondary font-semibold"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </BaseButton>
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-1 border-revomed-secondary font-semibold"
          onClick={() => publishFormula(_id)}
        >
          Unpublish
        </BaseButton>
      </div>
    </>
  );
}
