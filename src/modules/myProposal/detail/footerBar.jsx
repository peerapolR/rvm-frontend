import React from "react";
import { useRouter } from "next/navigation";

import BaseButton from "@components/BaseButton";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FooterBar({ status, _id }) {
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { proposedOrder, declineOrder } = newProposalctx;
  return (
    <>
      {status === "pending" || status === "reject" ? (
        <div className="min-h-20 bg-revomed-white bottom-0 flex gap-5 justify-end pt-4 px-5">
          <BaseButton
            className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-1 border-revomed-secondary font-semibold"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </BaseButton>
        </div>
      ) : status === "approve" ? (
        <div className="min-h-20 bg-revomed-white bottom-0 flex gap-5 justify-between pt-4 px-5">
          <div>
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-1 border-revomed-secondary font-semibold"
              onClick={() => {
                router.back();
              }}
            >
              Back
            </BaseButton>
          </div>
          <div className="gap-5 flex">
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-0 font-semibold"
              onClick={() => {
                console.log("Print");
              }}
            >
              Print
            </BaseButton>
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-secondary border-1 font-semibold"
              onClick={() => {
                console.log("Download");
              }}
            >
              Download
            </BaseButton>
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-red border-0 font-semibold"
              onClick={() => {
                declineOrder(_id);
              }}
            >
              Decline
            </BaseButton>
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-green border-0 font-semibold"
              onClick={() => {
                proposedOrder(_id);
              }}
            >
              Success
            </BaseButton>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
