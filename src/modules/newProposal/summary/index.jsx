import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FooterBar from "./footerBar";
import DosageCard from "@components/DosageCard";
import IngredientTable from "./IngredientTable";
import ModalDetail from "@modules/formula/newFormula/modalDetail";

import capSule from "@public/assets/images/capsule.png";
import tablet from "@public/assets/images/tablet.png";
import softgel from "@public/assets/images/softgel.png";
import powder from "@public/assets/images/powder.png";
import oralPowder from "@public/assets/images/oralPowder.png";
import jelly from "@public/assets/images/jelly.png";
import gummie from "@public/assets/images/gummie.png";
import effervescent from "@public/assets/images/effervescent.png";
import chewable from "@public/assets/images/chewable.png";
import coffeeAndTea from "@public/assets/images/coffeeAndTea.png";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

import formatPrice from "@functions/formatPrice";

export default function SummaryList() {
  const router = useRouter();

  const [detailModal, setDetailModal] = useState({});
  const [openDetail, setOpenDetail] = useState(false);

  const newProposalctx = useNewProposalCTX();
  const { formulation, newProposal } = newProposalctx;

  const topicText = `text-revomed-dark-grey font-semibold`;
  const detailText = `ml-5 capitalize`;

  const moFormulation = (formu) => {
    return formu.join(" , ");
  };
  const dosageIcon = (name) => {
    switch (name) {
      case "Capsule":
        return capSule;
      case "Tablet":
        return tablet;
      case "Softgel":
        return softgel;
      case "Powder":
        return powder;
      case "Oral Dissolving":
        return oralPowder;
      case "Jelly":
        return jelly;
      case "Gummie":
        return gummie;
      case "Effervescent":
        return effervescent;
      case "Chewable":
        return chewable;
      case "Coffee & Tea":
        return coffeeAndTea;
    }
  };
  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div className="p-6">
        <div className="flex justify-between items-center pb-5 mb-6 border-b-1 border-revomed-light-grey1">
          <div className="flex">
            <Title level={4} style={{ color: "#004D7D" }}>
              Summary
            </Title>
          </div>
          <BreadCrumb />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 bg-revomed-white rounded-xl p-6">
            <div className="flex mb-2">
              <p className={topicText}>Product Category:</p>
              <p className={detailText}>{newProposal.product_category}</p>
            </div>
            <div className="flex mb-2">
              <p className={topicText}>Formula Name:</p>
              <p className={detailText}>{newProposal.formular_name}</p>
            </div>
            <div className="flex mb-2">
              <p className={topicText}>Formulation:</p>
              <p className={detailText}>{moFormulation(formulation)}</p>
            </div>
            <div className="flex flex-col mb-2">
              <p className={topicText}>Dosage Form:</p>
              <DosageCard
                key={1}
                image={dosageIcon(newProposal.dosage_form)}
                name={newProposal.dosage_form}
                showOnly={true}
              />
            </div>
          </div>
          <div className="col-span-2 bg-revomed-white rounded-xl p-6">
            <IngredientTable
              newProposal={newProposal}
              setDetailModal={setDetailModal}
              setOpenDetail={setOpenDetail}
            />
          </div>
          <div className="col-span-3 bg-revomed-white rounded-xl p-6">
            <div className="flex gap-5 justify-between">
              <div className="flex mb-2">
                <p className={topicText}>MOQ:</p>
                <p className={detailText}>{newProposal.moq1}</p>
              </div>
              <div className="flex mb-2 flex-col">
                <div className="flex">
                  <p className={topicText}>Packaging:</p>
                  <p className={detailText}>{newProposal.packaging1}</p>
                </div>
                <div className="flex">
                  <p className={topicText}>Packaging & Additional Detail:</p>
                  <p className={detailText}>
                    {newProposal?.packaging_detail1
                      ? newProposal.packaging_detail1
                      : "-"}
                  </p>
                </div>
                <div className="flex">
                  <p className={topicText}>Packaging Price:</p>
                  <p className={detailText}>
                    {newProposal?.packaging_price1
                      ? `${formatPrice(newProposal.packaging_price1)} THB`
                      : "-"}
                  </p>
                </div>
              </div>
              <div className="flex mb-2 ">
                <div className="font-bold text-lg">MOQ 1</div>
              </div>
            </div>
          </div>
          {newProposal?.moq2 != "" ? (
            <div className="col-span-3 bg-revomed-white rounded-xl p-6">
              <div className="flex gap-5 justify-between">
                <div className="flex mb-2">
                  <p className={topicText}>MOQ:</p>
                  <p className={detailText}>{newProposal.moq2}</p>
                </div>
                <div className="flex mb-2 flex-col">
                  <div className="flex">
                    <p className={topicText}>Packaging:</p>
                    <p className={detailText}>{newProposal.packaging2}</p>
                  </div>
                  <div className="flex">
                    <p className={topicText}>Packaging & Additional Detail:</p>
                    <p className={detailText}>
                      {newProposal?.packaging_detail2
                        ? newProposal?.packaging_detail2
                        : "-"}
                    </p>
                  </div>
                  <div className="flex">
                    <p className={topicText}>Packaging Price:</p>
                    <p className={detailText}>
                      {newProposal?.packaging_price2
                        ? `${formatPrice(newProposal.packaging_price2)} THB`
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="flex mb-2 ">
                  <div className="font-bold text-lg">MOQ 2</div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {newProposal?.moq3 != "" ? (
            <div className="col-span-3 bg-revomed-white rounded-xl p-6">
              <div className="flex gap-5 justify-between">
                <div className="flex mb-2">
                  <p className={topicText}>MOQ:</p>
                  <p className={detailText}>{newProposal.moq3}</p>
                </div>
                <div className="flex mb-2 flex-col">
                  <div className="flex">
                    <p className={topicText}>Packaging:</p>
                    <p className={detailText}>{newProposal.packaging3}</p>
                  </div>
                  <div className="flex">
                    <p className={topicText}>Packaging & Additional Detail:</p>
                    <p className={detailText}>
                      {newProposal?.packaging_detail3
                        ? newProposal?.packaging_detail3
                        : "-"}
                    </p>
                  </div>
                  <div className="flex">
                    <p className={topicText}>Packaging Price:</p>
                    <p className={detailText}>
                      {newProposal?.packaging_price3
                        ? `${formatPrice(newProposal.packaging_price3)} THB`
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="flex mb-2 ">
                  <div className="font-bold text-lg">MOQ 3</div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
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
