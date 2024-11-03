import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import FooterBar from "./footerBar";

import Supplementicon from "@icons/Supplementicon";
import Skincareicon from "@icons/Skincareicon";
import Cosmeticicon from "@icons/Cosmeticicon";

export default function ProposalList() {
  const router = useRouter();
  const supIcon = () => <Supplementicon />;
  const skinIcon = () => <Skincareicon />;
  const cosIcon = () => <Cosmeticicon />;

  const ProductCat = [
    {
      name: "Supplement",
      icon: supIcon(),
    },
    {
      name: "Skincare",
      icon: skinIcon(),
    },
    {
      name: "Cosmetic",
      icon: cosIcon(),
    },
  ];
  return (
    <div className="relative" style={{ minHeight: "calc(100vh - 72px)" }}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Title level={4} style={{ color: "#004D7D" }}>
            Product Category
          </Title>
        </div>
        <div className="grid grid-cols-3 gap-5 place-items-center">
          {ProductCat.map((i, idx) => [
            <Button
              key={idx}
              disabled={i.name === "Supplement" ? false : true}
              className="bg-revomed-white w-[348px] h-[215px] rounded-lg border-0 hover:border-1 border-revomed-primary font-semibold text-revomed-primary text-lg flex flex-col "
              onClick={() => {
                router.push("/main/proposal/formulation");
              }}
            >
              {i.icon}
              {i.name}
            </Button>,
          ])}
        </div>
      </div>
      <FooterBar />
    </div>
  );
}
