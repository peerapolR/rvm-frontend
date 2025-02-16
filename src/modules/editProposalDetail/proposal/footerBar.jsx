import React from "react";
import { useRouter, useParams } from "next/navigation";

import BaseButton from "@components/BaseButton";

import { notification } from "antd";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FooterBar({ newProposal }) {
  const { _id } = useParams();
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const newProposalctx = useNewProposalCTX();
  const { editDraftNewProposal } = newProposalctx;

  const openNotification = () => {
    api.info({
      message: `กรุณากรอกข้อมูลลูกค้าให้ครบถ้วน`,
      // description:
      //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement: "top",
      showProgress: true,
      pauseOnHover: true,
    });
  };

  const checkValidNext = () => {
    if (
      !newProposal.proposal_name ||
      newProposal.proposal_name === "" ||
      !newProposal.customer_name ||
      newProposal.customer_name === "" ||
      !newProposal.address ||
      newProposal.address === "" ||
      !newProposal.city ||
      newProposal.city === "" ||
      !newProposal.district ||
      newProposal.district === "" ||
      !newProposal.sub_district ||
      newProposal.sub_district === "" ||
      !newProposal.postal_code ||
      newProposal.postal_code === "" ||
      !newProposal.tel ||
      newProposal.tel === "" ||
      !newProposal.tax_id ||
      newProposal.tax_id === "" ||
      !newProposal.contact_person ||
      newProposal.contact_person === ""
    ) {
      openNotification();
    } else {
      router.push(`/main/myProposal/proposalEdit/${_id}/finalProposal`);
    }
  };

  return (
    <div className="min-h-20 bg-revomed-white ">
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
            onClick={checkValidNext}
          >
            Next
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
