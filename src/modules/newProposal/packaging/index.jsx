import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FooterBar from "./footerBar";
import { Radio, Flex, Input, Select } from "antd";
const { TextArea } = Input;

import { useNewProposalCTX } from "@contexts/NewProposalContext";

import formatPrice from "@functions/formatPrice";

export default function PackagingList() {
  const router = useRouter();

  const newProposalctx = useNewProposalCTX();
  const {
    formulation,
    newProposal,
    handleNewProposalChange,
    setNewProposal,
    optionMoq,
    getMoqByForm,
    finalPrice1,
    setFinalPrice1,
    finalPrice2,
    setFinalPrice2,
    finalPrice3,
    setFinalPrice3,
  } = newProposalctx;

  const [valuePackaging1, setValuePackaging1] = useState("Exclude");
  const [valuePackaging2, setValuePackaging2] = useState("Exclude");
  const [valuePackaging3, setValuePackaging3] = useState("Exclude");

  const [moqPrice1, setMoqPrice1] = useState(0);
  const [moqPrice2, setMoqPrice2] = useState(0);
  const [moqPrice3, setMoqPrice3] = useState(0);

  const [moqToUse, setMoqToUse] = useState([]);

  const calPriceByMoq = (moq, num) => {
    let cal =
      parseFloat(moq.label) *
      parseFloat(newProposal.prePrice) *
      parseFloat(moq.value);
    // let formetted = formatPrice(cal);

    if (num === 1) {
      setMoqPrice1(cal);
      setFinalPrice1(cal);
    } else if (num === 2) {
      setMoqPrice2(cal);
      setFinalPrice2(cal);
    } else if (num === 3) {
      setMoqPrice3(cal);
      setFinalPrice3(cal);
    }
  };

  const onChangeRadioPackaging1 = (e) => {
    const { name, value } = e.target;
    setValuePackaging1(value);
    handleNewProposalChange(e);
  };
  const onChangeRadioPackaging2 = (e) => {
    const { name, value } = e.target;
    setValuePackaging2(value);
    handleNewProposalChange(e);
  };
  const onChangeRadioPackaging3 = (e) => {
    const { name, value } = e.target;
    setValuePackaging3(value);
    handleNewProposalChange(e);
  };

  const onChangeMoq1 = (index, e) => {
    calPriceByMoq(e, 1);
    setNewProposal(() => ({
      ...newProposal,
      moq1: e.label,
    }));
  };
  const onChangeMoq2 = (index, e) => {
    calPriceByMoq(e, 2);
    setNewProposal(() => ({
      ...newProposal,
      moq2: e.label,
    }));
  };
  const onChangeMoq3 = (index, e) => {
    calPriceByMoq(e, 3);
    setNewProposal(() => ({
      ...newProposal,
      moq3: e.label,
    }));
  };

  const onChangePackingPrice1 = (e) => {
    const newValue = Number(e.target.value);
    if (e.target.value === "") {
      setNewProposal(() => ({
        ...newProposal,
        packaging_price1: "0",
      }));
    } else {
      if (newValue >= 0) {
        handleNewProposalChange(e);
      } else {
        setNewProposal(() => ({
          ...newProposal,
          packaging_price1: "0",
        }));
      }
    }
  };

  const onChangePackingPrice2 = (e) => {
    const newValue = Number(e.target.value);
    if (e.target.value === "") {
      setNewProposal(() => ({
        ...newProposal,
        packaging_price2: "0",
      }));
    } else {
      if (newValue >= 0) {
        handleNewProposalChange(e);
      } else {
        setNewProposal(() => ({
          ...newProposal,
          packaging_price2: "0",
        }));
      }
    }
  };

  const onChangePackingPrice3 = (e) => {
    const newValue = Number(e.target.value);
    if (e.target.value === "") {
      setNewProposal(() => ({
        ...newProposal,
        packaging_price3: "0",
      }));
    } else {
      if (newValue >= 0) {
        handleNewProposalChange(e);
      } else {
        setNewProposal(() => ({
          ...newProposal,
          packaging_price3: "0",
        }));
      }
    }
  };

  useEffect(() => {
    if (newProposal.packaging_price1 != "") {
      const cal =
        parseFloat(moqPrice1) + parseFloat(newProposal.packaging_price1);

      setFinalPrice1(cal);
    }
  }, [newProposal.packaging_price1]);

  useEffect(() => {
    if (newProposal.packaging_price2 != "") {
      const cal =
        parseFloat(moqPrice2) + parseFloat(newProposal.packaging_price2);

      setFinalPrice2(cal);
    }
  }, [newProposal.packaging_price2]);

  useEffect(() => {
    if (newProposal.packaging_price3 != "") {
      const cal =
        parseFloat(moqPrice3) + parseFloat(newProposal.packaging_price3);

      setFinalPrice3(cal);
    }
  }, [newProposal.packaging_price3]);

  useEffect(() => {
    getMoqByForm();
    setNewProposal({
      ...newProposal,
      packaging1: "Exclude",
      packaging2: "Exclude",
      packaging3: "Exclude",
      carton: "Exclude",
      carton_screen: "Exclude",
    });
  }, []);

  useEffect(() => {
    if (optionMoq && optionMoq != null) {
      const options = optionMoq?.condition?.map(({ moq, price }) => ({
        label: moq,
        value: price,
      }));

      setMoqToUse(options);
    }
  }, [optionMoq]);

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
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
        <div className="flex flex-col mt-10">
          <div className="bg-revomed-white rounded-t-lg min-h-[73px] p-6 flex gap-5 justify-between">
            <div className="w-1/3">
              <p className="mb-2 text-base text-revomed-dark-grey">
                MOQ (จำนวนที่ต้องการผลิต)
                <span className="text-revomed-red">*</span>
              </p>
              <Select
                options={moqToUse}
                name="moq1"
                onChange={onChangeMoq1}
                value={newProposal.moq1}
                placeholder="MOQ (จำนวนที่ต้องการผลิต)..."
                style={{
                  height: 50,
                  width: 500,
                  resize: "none",
                }}
              />
            </div>
            <div className="text-base text-revomed-dark-grey">
              <p className="mb-2 font-semibold ">Total Amount (Ex. VAT):</p>
              <p>{formatPrice(finalPrice1)} THB</p>
            </div>
            <div></div>
            <div className="font-bold text-lg">MOQ 1</div>
          </div>
          <div className="bg-revomed-white rounded-b-lg min-h-[73px] p-6 flex flex-col gap-5">
            <p>กรุณาเลือกรูปแบบการรับ Packaging</p>
            <div className="flex">
              <p className="font-semibold text-revomed-dark-grey">
                Packaging:{" "}
              </p>
              <div className="ml-10">
                <Radio.Group
                  onChange={onChangeRadioPackaging1}
                  value={valuePackaging1}
                  name="packaging1"
                >
                  <Radio value={"Exclude"}>Exclude</Radio>
                  <Radio value={"Include"} className="ml-10">
                    Include
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {valuePackaging1 !== "Exclude" && (
              <div className="p-6 bg-revomed-light-grey3 mt-5 rounded-lg flex text-revomed-dark-grey gap-5">
                <div>
                  <p className="mb-2">
                    Packaging & Additional Detail
                    <span className="text-revomed-red">*</span>
                  </p>
                  <TextArea
                    onChange={handleNewProposalChange}
                    value={newProposal.packaging_detail1}
                    name="packaging_detail1"
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
                    name="packaging_price1"
                    // onChange={handleNewProposalChange}
                    onChange={onChangePackingPrice1}
                    value={newProposal.packaging_price1}
                    type="number"
                    placeholder="00.00"
                    min="0"
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
          {/* <div className="bg-revomed-white rounded-lg min-h-[73px] p-6 flex flex-col justify-center">
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
          </div> */}
          {/* <div className="bg-revomed-white rounded-lg min-h-[73px] p-6 flex flex-col justify-center">
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
          </div> */}
        </div>
        <div className="flex flex-col mt-10">
          <div className="bg-revomed-white rounded-t-lg min-h-[73px] p-6 flex gap-5 justify-between">
            <div className="w-1/3">
              <p className="mb-2 text-base text-revomed-dark-grey">
                MOQ (จำนวนที่ต้องการผลิต)
              </p>
              <Select
                options={moqToUse}
                name="moq2"
                onChange={onChangeMoq2}
                value={newProposal.moq2}
                placeholder="MOQ (จำนวนที่ต้องการผลิต)..."
                style={{
                  height: 50,
                  width: 500,
                  resize: "none",
                }}
              />
            </div>
            <div className="text-base text-revomed-dark-grey">
              <p className="mb-2 font-semibold ">Total Amount (Ex. VAT):</p>
              <p>{formatPrice(finalPrice2)} THB</p>
            </div>
            <div></div>
            <div className="font-bold text-lg">MOQ 2</div>
          </div>
          <div className="bg-revomed-white rounded-b-lg min-h-[73px] p-6 flex flex-col gap-5">
            <p>กรุณาเลือกรูปแบบการรับ Packaging</p>
            <div className="flex">
              <p className="font-semibold text-revomed-dark-grey">
                Packaging:{" "}
              </p>
              <div className="ml-10">
                <Radio.Group
                  onChange={onChangeRadioPackaging2}
                  value={valuePackaging2}
                  name="packaging2"
                >
                  <Radio value={"Exclude"}>Exclude</Radio>
                  <Radio value={"Include"} className="ml-10">
                    Include
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {valuePackaging2 !== "Exclude" && (
              <div className="p-6 bg-revomed-light-grey3 mt-5 rounded-lg flex text-revomed-dark-grey gap-5">
                <div>
                  <p className="mb-2">
                    Packaging & Additional Detail
                    <span className="text-revomed-red">*</span>
                  </p>
                  <TextArea
                    onChange={handleNewProposalChange}
                    value={newProposal.packaging_detail2}
                    name="packaging_detail2"
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
                    name="packaging_price2"
                    // onChange={handleNewProposalChange}
                    onChange={onChangePackingPrice2}
                    value={newProposal.packaging_price2}
                    placeholder="00.00"
                    type="number"
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
        </div>
        <div className="flex flex-col mt-10">
          <div className="bg-revomed-white rounded-t-lg min-h-[73px] p-6 flex gap-5 justify-between">
            <div className="w-1/3">
              <p className="mb-2 text-base text-revomed-dark-grey">
                MOQ (จำนวนที่ต้องการผลิต)
              </p>
              <Select
                options={moqToUse}
                name="moq3"
                onChange={onChangeMoq3}
                value={newProposal.moq3}
                placeholder="MOQ (จำนวนที่ต้องการผลิต)..."
                style={{
                  height: 50,
                  width: 500,
                  resize: "none",
                }}
              />
            </div>
            <div className="text-base text-revomed-dark-grey">
              <p className="mb-2 font-semibold ">Total Amount (Ex. VAT):</p>
              <p>{formatPrice(finalPrice3)} THB</p>
            </div>
            <div></div>
            <div className="font-bold text-lg">MOQ 3</div>
          </div>
          <div className="bg-revomed-white rounded-b-lg min-h-[73px] p-6 flex flex-col gap-5">
            <p>กรุณาเลือกรูปแบบการรับ Packaging</p>
            <div className="flex">
              <p className="font-semibold text-revomed-dark-grey">
                Packaging:{" "}
              </p>
              <div className="ml-10">
                <Radio.Group
                  onChange={onChangeRadioPackaging3}
                  value={valuePackaging3}
                  name="packaging3"
                >
                  <Radio value={"Exclude"}>Exclude</Radio>
                  <Radio value={"Include"} className="ml-10">
                    Include
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {valuePackaging3 !== "Exclude" && (
              <div className="p-6 bg-revomed-light-grey3 mt-5 rounded-lg flex text-revomed-dark-grey gap-5">
                <div>
                  <p className="mb-2">Packaging & Additional Detail</p>
                  <TextArea
                    onChange={handleNewProposalChange}
                    value={newProposal.packaging_detail3}
                    name="packaging_detail3"
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
                    name="packaging_price3"
                    // onChange={handleNewProposalChange}
                    onChange={onChangePackingPrice3}
                    value={newProposal.packaging_price3}
                    placeholder="00.00"
                    type="number"
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
        </div>
      </div>
      <FooterBar newProposal={newProposal} />
    </div>
  );
}
