import React from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";

import BaseButton from "@components/BaseButton";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FooterBar({ _id, isChange, price, dataToChange }) {
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { rejectOrder, pdVerifyOrder, editVerifyOrder } = newProposalctx;

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.info({
      message: `กรุณากรอก Dosage ให้ครบ`,
      // description:
      //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement: "top",
      showProgress: true,
      pauseOnHover: true,
    });
  };
  const onClickVerify = (_id) => {
    if (isChange) {
      // editVerifyOrder(_id);

      pdVerifyOrder(_id);
    } else {
      pdVerifyOrder(_id);
    }
  };

  return (
    <div className="min-h-20 bg-revomed-white">
      {contextHolder}
      <div className="flex gap-5 justify-between mx-5 pt-4">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-1 border-revomed-secondary font-semibold"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </BaseButton>
        <div className="flex gap-5">
          <BaseButton
            className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-red border-0  font-semibold"
            onClick={() => rejectOrder(_id)}
          >
            Reject
          </BaseButton>
          <BaseButton
            className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-green border-0 font-semibold"
            onClick={() => onClickVerify(_id)}
          >
            Verify
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
