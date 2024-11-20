import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FooterBar from "./footerBar";
import DosageCard from "@components/DosageCard";

import { dosageItem } from "@modules/formula/newFormula/mockData";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FormulationList() {
  const router = useRouter();

  const newProposalctx = useNewProposalCTX();
  const { formulation, setFormulation, setNewProposal, newProposal } =
    newProposalctx;
  const [selected, setSelected] = useState("");

  const handleDosageCard = (name, id) => {
    setSelected(id);
    setNewProposal(() => ({
      ...newProposal,
      dosage_form: name,
    }));
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex">
            <Title level={4} style={{ color: "#004D7D" }}>
              Dosage Form
            </Title>
          </div>
          <BreadCrumb />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {dosageItem.map((e, i) => {
            return (
              <DosageCard
                key={i}
                id={e.id}
                name={e.name}
                title={e.title}
                image={e.image}
                onClick={() => handleDosageCard(e.name, e.id)}
                selected={selected}
              />
            );
          })}
          {formulation.length > 0 && (
            <div className="col-span-2 flex flex-col justify-end">
              <div className="flex pl-[42px] gap-2 items-center">
                <div
                  className="font-semibold text-revomed-dark-grey"
                  style={{ fontSize: "16px" }}
                >
                  Formulation:
                </div>
                {formulation.map((formu, i) => [
                  <div
                    className="h-[40px] bg-revomed-secondary-light3 text-revomed-secondary rounded-lg flex items-center px-5 font-normal mr-3"
                    key={i}
                  >
                    {formu}
                  </div>,
                ])}
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterBar />
    </>
  );
}
