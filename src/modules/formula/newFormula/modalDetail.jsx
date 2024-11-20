import { Modal } from "antd";
import React from "react";
import BaseButton from "@components/BaseButton";

export default function ModalDetail(props) {
  const { setOpenDetail, openDetail, detailModal } = props;

  const listChemical = [
    {
      id: 1,
      value: "Astragalus Extract 32.21%",
    },
    {
      id: 2,
      value: "Centella Asiatica Extract 16.1%",
    },
    {
      id: 3,
      value: "Nutrimin C - Ascorbic acid 9.58%",
    },
    {
      id: 4,
      value: "Refined Rice Bran oil powder 0.37%",
    },
    {
      id: 5,
      value: "Vitamin B12 0.32%",
    },
    {
      id: 6,
      value: "L-Cysteine 16.1%",
    },
    {
      id: 7,
      value: "Grape Skin Extract 1.29%",
    },
    {
      id: 8,
      value: "Pomegranate Extract 6.44%",
    },
    {
      id: 9,
      value: "Citrus Aurantium Extract 0.36%",
    },
    {
      id: 10,
      value: "Black Pepper Extract 0.81%",
    },
    {
      id: 11,
      value: "Vitamin D3 0.32%",
    },
    {
      id: 12,
      value: "Isolated Soy Protein 16.1%",
    },
  ];

  return (
    <Modal open={openDetail} width={850} closeIcon={false} footer={false}>
      <div className="flex items-center justify-between p-6 bg-#E7ECF2 border-b border-revomed-light-grey2">
        <div className="text-xl font-bold text-revomed-primary">
          {detailModal.ingredient_name}
        </div>
      </div>
      <div className="flex flex-col p-6 bg-revomed-white">
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 border-b-1 pb-6 border-revomed-light-grey2">
            <div
              className="text-revomed-primary-light1 font-bold"
              style={{ fontSize: "16px" }}
            >
              {"Recommended Dose (mg/day)"}
            </div>
            <div className="text-revomed-primary">
              {detailModal.dose_min} - {detailModal.dose_max}
            </div>
            <div
              className="text-revomed-primary-light1 font-bold"
              style={{ fontSize: "16px" }}
            >
              {"Clinical Dose (mg/day)"}
            </div>
            <div className="text-revomed-primary">
              {detailModal.dose_clinical}
            </div>
            <div
              className="text-revomed-primary-light1 font-bold"
              style={{ fontSize: "16px" }}
            >
              {"Lead time (Days)"}
            </div>
            <div className="text-revomed-primary">{detailModal.leadTime}</div>
          </div>
          <div className="flex py-6 gap-10 border-b-1 pb-6 border-revomed-light-grey2">
            <div
              className="text-revomed-primary-light1 font-bold"
              style={{ fontSize: "16px" }}
            >
              Chemical Composition
            </div>
            <div className=" text-revomed-primary">
              {/* {listChemical.map((e, i) => (
                <span key={i}>{`• ${e.value}`}</span>
              ))} */}
              <p className="whitespace-pre-line">{detailModal.chemical_comp}</p>
            </div>
          </div>
          <div className="flex py-6 gap-10 pb-6 ">
            <div
              className="text-revomed-primary-light1 font-bold mr-[7.5rem]"
              style={{ fontSize: "16px" }}
            >
              Health Benefits
            </div>
            <div className=" text-revomed-primary">
              <p className="whitespace-pre-line">
                {detailModal.health_benefits}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center pt-6 justify-end bg-#E7ECF2 border-t border-revomed-light-grey2">
        <BaseButton
          type="button"
          className="border border-revomed-secondary rounded-lg px-3 py-4 text-revomed-secondary h-12 w-[162px]"
          onClick={() => setOpenDetail(false)}
        >
          Close
        </BaseButton>
      </div>
    </Modal>
  );
}
