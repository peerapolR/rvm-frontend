import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FooterBar from "./footerBar";
import { Input, Select } from "antd";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function ProposalList() {
  const router = useRouter();

  const newProposalctx = useNewProposalCTX();
  const {
    newProposal,
    handleNewProposalChange,
    setNewProposal,
    fetchDataDosage,
    dosageData,
    getNumToGenOrderId,
    numToOrder,
  } = newProposalctx;

  const [codeToUse, setCodeToUse] = useState("");

  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = now.getMonth() + 1;

  useEffect(() => {
    fetchDataDosage();
    getNumToGenOrderId(`P${year}${month}`);
  }, []);

  const generateCode = () => {
    const runningNum = numToOrder;

    const code = `P${year}${month}-${runningNum + 1}`;

    setCodeToUse(code);
  };

  useEffect(() => {
    if (numToOrder >= 0) {
      generateCode();
    }
  }, [numToOrder]);

  useEffect(() => {
    if (codeToUse !== "") {
      setNewProposal(() => ({
        ...newProposal,
        proposal_code: codeToUse,
        order_id: codeToUse,
      }));
    }
  }, [codeToUse]);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center pb-5 mb-6 border-b-1 border-revomed-light-grey1">
          <div className="flex">
            <Title level={4} style={{ color: "#004D7D" }}>
              Proposal (Edit)
            </Title>
          </div>
          <BreadCrumb />
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-revomed-white rounded-xl p-6">
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-1 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  Proposal Name
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  name="proposal_name"
                  onChange={handleNewProposalChange}
                  value={newProposal.proposal_name}
                  placeholder="Proposal Name..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-revomed-white rounded-xl p-6">
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-3 font-semibold text-revomed-dark-grey mb-5">
                Customer Information:
              </div>
              <div className="col-span-2 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  Customer Name
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  name="customer_name"
                  onChange={handleNewProposalChange}
                  value={newProposal.customer_name}
                  placeholder="Customer Name..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
              <div className="col-span-1 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  Proposal Code
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  disabled={true}
                  name="proposal_code"
                  // onChange={handleNewProposalChange}
                  // value={newProposal.proposal_code}
                  value={newProposal.proposal_code}
                  placeholder="Proposal Code..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
              <div className="col-span-3 font-semibold text-revomed-dark-grey mb-5">
                Address Information:
              </div>
              <div className="col-span-2 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  Address
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  name="address"
                  onChange={handleNewProposalChange}
                  value={newProposal.address}
                  placeholder="Address..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
              <div className="col-span-1 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  City
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  name="city"
                  onChange={handleNewProposalChange}
                  value={newProposal.city}
                  placeholder="City..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
              <div className="col-span-1 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  District
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  name="district"
                  onChange={handleNewProposalChange}
                  value={newProposal.district}
                  placeholder="District..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
              <div className="col-span-1 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  Sub District
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  name="sub_district"
                  onChange={handleNewProposalChange}
                  value={newProposal.sub_district}
                  placeholder="Sub District..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
              <div className="col-span-1 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  Postal Code
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  name="postal_code"
                  onChange={handleNewProposalChange}
                  value={newProposal.postal_code}
                  placeholder="Postal Code..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
              <div className="col-span-1 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  Tel
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  name="tel"
                  onChange={handleNewProposalChange}
                  value={newProposal.tel}
                  placeholder="Tel..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
              <div className="col-span-1 text-revomed-dark-grey mb-5">
                <p className="mb-2">Tax Id</p>
                <Input
                  name="tax_id"
                  onChange={handleNewProposalChange}
                  value={newProposal.tax_id}
                  placeholder="Tax Id..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
              <div className="col-span-1 text-revomed-dark-grey mb-5">
                <p className="mb-2">
                  Contact Person
                  <span className="text-revomed-red">*</span>
                </p>
                <Input
                  name="contact_person"
                  onChange={handleNewProposalChange}
                  value={newProposal.contact_person}
                  placeholder="Contact Person..."
                  style={{
                    height: 50,
                    resize: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBar newProposal={newProposal} />
    </>
  );
}
