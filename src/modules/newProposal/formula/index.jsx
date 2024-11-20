import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FooterBar from "./footerBar";
import BaseButton from "@components/BaseButton";
import FormSearch from "./formSearch";
import FormulaContainer from "./list";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FormulationList() {
  const router = useRouter();

  const newProposalctx = useNewProposalCTX();
  const {
    formulation,
    setFormulation,
    setNewProposal,
    newProposal,
    fetchFormulaByCon,
    listProposalByCon,
  } = newProposalctx;
  const [selected, setSelected] = useState("");

  const handleFormulaCard = (id, items) => {
    console.log("items", items);

    setSelected(id);
    setNewProposal(() => ({
      ...newProposal,
      product_category: "supplement",
      dosage_form: items.dosage_form,
      formula: items.formula_code,
      formular_name: items.formula_name,
      master_ingredient: items.master_ingredient,
      ingredient: items.ingredient,
      prePrice: items.price,
    }));
  };

  useEffect(() => {
    fetchFormulaByCon();
  }, []);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center pb-5 mb-6 border-b-1 border-revomed-light-grey1">
          <div className="flex">
            <Title level={4} style={{ color: "#004D7D" }}>
              Formula
            </Title>
          </div>
          <BreadCrumb />
        </div>
        <div className="flex justify-between mb-5">
          <div className="font-semibold flex justify-end">
            <span className="m-2 text-revomed-dark-grey">Formulation: </span>
            {formulation.map((formu, i) => [
              <div
                className="h-[40px] bg-revomed-secondary-light3 text-revomed-secondary rounded-lg flex items-center px-5 font-normal mr-3"
                key={i}
              >
                {formu}
              </div>,
            ])}
          </div>
          <div className="font-semibold flex justify-end">
            <span className="m-2 text-revomed-dark-grey">Dosage Form: </span>
            <div className="h-[40px] bg-revomed-secondary-light3 text-revomed-secondary rounded-lg flex items-center px-5 font-normal mr-3">
              {newProposal.dosage_form}
            </div>
          </div>
          <div>
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10  bg-revomed-primary rounded-lg text-revomed-white"
              onClick={() => {
                console.log("New Formula");
              }}
              disabled={true}
            >
              New Formula
            </BaseButton>
          </div>
        </div>

        <FormSearch formulation={formulation} />
        <FormulaContainer
          listProposalByCon={listProposalByCon}
          handleFormulaCard={handleFormulaCard}
          selected={selected}
        />
      </div>
      <FooterBar />
    </>
  );
}
