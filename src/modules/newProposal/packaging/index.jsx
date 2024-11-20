import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FooterBar from "./footerBar";
import { Radio, Flex, Input } from "antd";
const { TextArea } = Input;

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function PackagingList() {
  const router = useRouter();

  const newProposalctx = useNewProposalCTX();
  const { formulation, newProposal, handleNewProposalChange, setNewProposal } =
    newProposalctx;

  const [valuePackaging, setValuePackaging] = useState("Exclude");
  const [valueCarton, setValueCarton] = useState("Exclude");
  const [valueScreen, setValueScreen] = useState("Exclude");

  const onChangeRadioPackaging = (e) => {
    const { name, value } = e.target;
    setValuePackaging(value);
    handleNewProposalChange(e);
  };
  const onChangeRadioCarton = (e) => {
    const { name, value } = e.target;
    setValueCarton(value);
    handleNewProposalChange(e);
  };

  const onChangeRadioScreen = (e) => {
    const { name, value } = e.target;
    setValueScreen(value);
    handleNewProposalChange(e);
  };

  useEffect(() => {
    setNewProposal({
      ...newProposal,
      packaging: "Exclude",
      carton: "Exclude",
      carton_screen: "Exclude",
    });
  }, []);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center pb-5 mb-6 border-b-1 border-revomed-light-grey1">
          <div className="flex">
            <Title level={4} style={{ color: "#004D7D" }}>
              Packaging
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
          <div></div>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <p>กรุณาเลือกรูปแบบการรับ Packaging</p>
          <div className="bg-revomed-white rounded-lg min-h-[73px] p-6 flex flex-col justify-center">
            <div className="flex">
              <p className="font-semibold text-revomed-dark-grey">Packaging</p>
              <div className="ml-10">
                <Radio.Group
                  onChange={onChangeRadioPackaging}
                  value={valuePackaging}
                  name="packaging"
                >
                  <Radio value={"Exclude"}>Exclude</Radio>
                  <Radio value={"Include"} className="ml-10">
                    Include
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {valuePackaging !== "Exclude" && (
              <div className="p-6 bg-revomed-light-grey3 mt-5 rounded-lg flex text-revomed-dark-grey gap-5">
                <div>
                  <p className="mb-2">
                    Packaging Detail (255 Characters)
                    <span className="text-revomed-red">*</span>
                  </p>
                  <TextArea
                    showCount
                    maxLength={255}
                    onChange={handleNewProposalChange}
                    value={newProposal.packaging_detail}
                    name="packaging_detail"
                    placeholder="Packaging Detail..."
                    style={{
                      height: 150,
                      width: 800,
                      resize: "none",
                    }}
                  />
                </div>
                <div>
                  <p className="mb-2">
                    Packaging Price (THB)
                    <span className="text-revomed-red">*</span>
                  </p>
                  <Input
                    name="packaging_price"
                    onChange={handleNewProposalChange}
                    value={newProposal.packaging_price}
                    placeholder="00.00"
                    style={{
                      height: 50,
                      width: 370,
                      resize: "none",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="bg-revomed-white rounded-lg min-h-[73px] p-6 flex flex-col justify-center">
            <div className="flex">
              <p className="font-semibold text-revomed-dark-grey">Carton</p>
              <div className="ml-16">
                <Radio.Group
                  onChange={onChangeRadioCarton}
                  value={valueCarton}
                  name="carton"
                >
                  <Radio value={"Exclude"}>Exclude</Radio>
                  <Radio value={"Include"} className="ml-10">
                    Include
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {valueCarton !== "Exclude" && (
              <div className="p-6 bg-revomed-light-grey3 mt-5 rounded-lg flex text-revomed-dark-grey gap-5">
                <div>
                  <p className="mb-2">
                    Carton Detail (255 Characters)
                    <span className="text-revomed-red">*</span>
                  </p>
                  <TextArea
                    name="carton_detail"
                    onChange={handleNewProposalChange}
                    value={newProposal.carton_detail}
                    showCount
                    maxLength={255}
                    placeholder="Carton Detail..."
                    style={{
                      height: 150,
                      width: 800,
                      resize: "none",
                    }}
                  />
                </div>
                <div className="mt-8">
                  <div className="mb-10">
                    <Radio.Group
                      onChange={onChangeRadioScreen}
                      value={valueScreen}
                      name="carton_screen"
                    >
                      <Radio value={"Exclude"}>Exclude Screen</Radio>
                      <Radio value={"Include"} className="ml-10">
                        Include Screen
                      </Radio>
                    </Radio.Group>
                  </div>
                  <div>
                    <p className="mb-2">
                      Carton Price (THB)
                      <span className="text-revomed-red">*</span>
                    </p>
                    <Input
                      placeholder="00.00"
                      value={newProposal.carton_price}
                      onChange={handleNewProposalChange}
                      name="carton_price"
                      style={{
                        height: 50,
                        width: 370,
                        resize: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  );
}
