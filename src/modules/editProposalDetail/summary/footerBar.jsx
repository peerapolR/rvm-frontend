import React from "react";
import { useRouter, useParams } from "next/navigation";

import BaseButton from "@components/BaseButton";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FooterBar() {
  const { _id } = useParams();
  const router = useRouter();

  const newProposalctx = useNewProposalCTX();
  const { editDraftNewProposal } = newProposalctx;

  return (
    <div className="min-h-20 bg-revomed-white">
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
            onClick={() => {
              editDraftNewProposal(_id);
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
            onClick={() => {
              router.push(`/main/myProposal/proposalEdit/${_id}/proposal`);
            }}
          >
            Next
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
