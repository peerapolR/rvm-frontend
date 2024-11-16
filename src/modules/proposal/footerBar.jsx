import React from "react";
import { useRouter } from "next/navigation";

import BaseButton from "@components/BaseButton";

export default function FooterBar() {
  const router = useRouter();
  return (
    <div
      className="min-h-20 bg-revomed-white absolute bottom-0 flex gap-5 justify-between pt-4 px-5"
      style={{ minWidth: "calc(100vw - 300px)" }}
    >
      <BaseButton className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-0 bg-revomed-white">
        Cancel
      </BaseButton>
      <BaseButton className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-secondary rounded-lg text-revomed-white">
        Next
      </BaseButton>
    </div>
  );
}
