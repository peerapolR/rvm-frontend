import React from "react";
import { useRouter } from "next/navigation";

import BaseButton from "@components/BaseButton";

export default function FooterBar() {
  const router = useRouter();
  return (
    <div className="min-h-20 bg-revomed-white mt-[11.5rem]">
      <div className="flex gap-5 justify-between mx-5 pt-4">
        <BaseButton className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-0 bg-revomed-white">
          Cancle
        </BaseButton>
        <BaseButton className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-secondary rounded-lg text-revomed-white">
          Next
        </BaseButton>
      </div>
    </div>
  );
}
