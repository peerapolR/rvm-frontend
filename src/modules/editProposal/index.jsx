import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "antd";
import Title from "antd/es/typography/Title";

import Supplementicon from "@icons/Supplementicon";
import Skincareicon from "@icons/Skincareicon";
import Cosmeticicon from "@icons/Cosmeticicon";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function ProposalList() {
  const { _id } = useParams();
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { fetchEditOrderById } = newProposalctx;
  const supIcon = () => <Supplementicon />;
  const skinIcon = () => <Skincareicon />;
  const cosIcon = () => <Cosmeticicon />;

  const ProductCat = [
    {
      id: 1,
      name: "Supplement",
      icon: supIcon(),
    },
    {
      id: 2,
      name: "Skincare",
      icon: skinIcon(),
    },
    {
      id: 3,
      name: "Cosmetic",
      icon: cosIcon(),
    },
  ];

  useEffect(() => {
    fetchEditOrderById(_id);
  }, []);

  return (
    <div className="relative" style={{ minHeight: "calc(100vh - 72px)" }}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Title level={4} style={{ color: "#004D7D" }}>
            Product Category (Edit)
          </Title>
        </div>
        <div className="grid grid-cols-3 gap-5 place-items-center">
          {ProductCat.map((i, idx) => [
            <Button
              key={idx}
              id={i.id}
              name={i.name}
              disabled={i.name === "Supplement" ? false : true}
              className="bg-revomed-white w-[348px] h-[215px] rounded-lg border-0 hover:border-1 border-revomed-primary font-semibold text-revomed-primary text-lg flex flex-col "
              // onClick={() => handleProdCatCard(i.name, i.id)}
              onClick={() =>
                router.push(`/main/myProposal/proposalEdit/${_id}/formulation`)
              }
            >
              {i.icon}
              {i.name}
            </Button>,
          ])}
        </div>
      </div>
    </div>
  );
}
