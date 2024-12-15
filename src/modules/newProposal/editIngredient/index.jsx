import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FooterBar from "./footerBar";
import BaseButton from "@components/BaseButton";
import IngredientTable from "./IngredientTable";
import ModalDetail from "@modules/formula/newFormula/modalDetail";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function EditIngredientList() {
  const router = useRouter();

  const [detailModal, setDetailModal] = useState({});
  const [openDetail, setOpenDetail] = useState(false);

  const newProposalctx = useNewProposalCTX();
  const { formulation, setNewProposal, newProposal, fetchFormulaByCon } =
    newProposalctx;

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div className="p-6 mb-[22.5rem]">
        <div className="flex justify-between items-center pb-5 mb-6 border-b-1 border-revomed-light-grey1">
          <div className="flex">
            <Title level={4} style={{ color: "#004D7D" }}>
              Ingredients
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
                console.log("Edit Ingredient");
              }}
              disabled={true}
            >
              Edit Ingredient
            </BaseButton>
          </div>
        </div>
        <IngredientTable
          newProposal={newProposal}
          setDetailModal={setDetailModal}
          setOpenDetail={setOpenDetail}
        />

        <div
          className="flex gap-[16px] font-bold mt-6"
          style={{ fontSize: "16px" }}
        >
          <div className="text-revomed-dark-grey">Total price:</div>
          <div className="text-revomed-primary">
            {newProposal.prePrice
              ? parseFloat(newProposal.prePrice).toFixed(2)
              : "0.00"}{" "}
            THB
          </div>
        </div>
      </div>
      <FooterBar />
      <ModalDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        detailModal={detailModal}
      />
    </div>
  );
}
