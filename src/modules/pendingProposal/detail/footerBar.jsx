import React from "react";
import { useRouter } from "next/navigation";

import BaseButton from "@components/BaseButton";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FooterBar({ _id }) {
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { approveOrder, rejectOrder } = newProposalctx;
  return (
    <div className="min-h-20 bg-revomed-white bottom-0 flex gap-5 justify-between pt-4 px-5">
      <div>
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-1 border-revomed-secondary font-semibold"
          onClick={() => {
            router.back();
          }}
        >
          Cancle
        </BaseButton>
      </div>
      <div className="flex gap-5">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-red border-0  font-semibold"
          onClick={() => rejectOrder(_id)}
        >
          Reject
        </BaseButton>
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-green border-0 font-semibold"
          onClick={() => approveOrder(_id)}
        >
          Approve
        </BaseButton>
      </div>
    </div>
  );
}
