import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FooterBar from "./footerBar";
import RevomedLogo from "@modules/allProposal/detail/RevomedLogo";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FinalProposalList() {
  const router = useRouter();

  const newProposalctx = useNewProposalCTX();
  const { newProposal } = newProposalctx;

  const spaces = "\u00A0".repeat(75);
  const signForm = (name) => (
    <>
      <p className="text-revomed-primary-dark">{name}</p>
      <div className="h-[4rem] border-b-1 border-revomed-black mx-[8rem] mb-3"></div>
      <span>({spaces})</span>
      <p className="mt-3">
        วันที่ ................ /................ / ................
      </p>
    </>
  );
  const [allIngredient, setAllIngredient] = useState([
    ...newProposal.master_ingredient,
    ...newProposal.ingredient,
  ]);
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center pb-5 mb-6 border-b-1 border-revomed-light-grey1">
          <div className="flex">
            <Title level={4} style={{ color: "#004D7D" }}>
              Summary Proposal
            </Title>
          </div>
          <BreadCrumb />
        </div>
        <div className="bg-revomed-white p-5 w-full">
          <div className="flex justify-between border-b-1">
            <div>
              <RevomedLogo />
            </div>
            <div>
              <p className="text-3xl text-revomed-primary-dark font-semibold">
                PROPOSAL
              </p>
              <p className="text-end mt-5">
                เลขที่{" "}
                <span className="font-semibold ml-5">
                  {newProposal.proposal_code}
                </span>
              </p>
              <p className="text-end my-5 bg-revomed-primary-light2 text-revomed-primary px-3 py-2 rounded-lg">
                ยอดชำระ{" "}
                <span className="font-semibold ml-5">
                  {newProposal.price ? newProposal.price : "0"}
                </span>
              </p>
            </div>
          </div>
          <div className="my-5 flex justify-between">
            <div className="flex">
              <div className="flex">
                <p>จาก</p>
                <div className="ml-5">
                  <p>พีรพล</p>
                  <p>097-196-3636</p>
                  <p>peerapol@revomed.co.th</p>
                </div>
              </div>
              <div className="flex ml-5">
                <p>เรียน</p>
                <div className="ml-5">
                  <p>{newProposal.customer_name}</p>
                  <p>
                    {newProposal.address} {newProposal.district}{" "}
                    {newProposal.sub_district} {newProposal.city}{" "}
                    {newProposal.postal_code} {newProposal.tel} -{" "}
                    {newProposal.contact_person}
                  </p>
                  <p>Tax ID: {newProposal.tax_id}</p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div>
                <p>Create Date</p>
                <p>Approve Date</p>
                <p>Expiration Date</p>
              </div>
              <div className="ml-5">
                <p>-</p>
                <p>-</p>
                <p>-</p>
              </div>
            </div>
          </div>
          <div className="border-b-1">
            <div className="grid grid-cols-9 text-revomed-white h-[2rem] text-center items-center">
              <div className="col-span-1 bg-revomed-secondary px-3 rounded-l-lg py-2">
                ลำดับ
              </div>
              <div className="col-span-4 bg-revomed-primary text-left py-2 pl-5">
                สินค้า
              </div>
              <div className="col-span-1 bg-revomed-primary py-2">
                ราคา/หน่วย
              </div>
              <div className="col-span-1 bg-revomed-primary py-2">จำนวน</div>
              <div className="col-span-1 bg-revomed-primary py-2">หน่วย</div>
              <div className="col-span-1 bg-revomed-primary py-2 rounded-r-lg">
                ยอดเงิน (THB)
              </div>
            </div>
            <div className="grid grid-cols-9 text-center mt-5">
              <div className="col-span-1 ">1</div>
              <div className="col-span-4 text-left">
                <p className="font-semibold">
                  Name:{" "}
                  <span className="ml-5 font-normal">
                    {newProposal.proposal_name}
                  </span>
                </p>
                <div className="mt-2 text-revomed-grey">
                  {allIngredient.map((ingre, i) => [
                    <p key={i}>{ingre.ingredient_name}</p>,
                  ])}
                </div>
                <p className="font-semibold mt-5">
                  Code:{" "}
                  <span className="ml-5 font-normal">
                    {newProposal.formula}
                  </span>
                </p>
                <p className="font-semibold mt-5">
                  Form:{" "}
                  <span className="ml-5 font-normal">
                    {newProposal.dosage_form}
                  </span>
                </p>
                <p className="font-semibold mt-5">
                  Packaging:{" "}
                  <span className="ml-5 font-normal">
                    {newProposal.packaging}
                    {newProposal.packaging_detail}
                  </span>
                </p>
                <p className="font-semibold mt-5">
                  Carton:{" "}
                  <span className="ml-5 font-normal">
                    {newProposal.carton}
                    {newProposal.carton_detail}
                    {newProposal.carton_screen}
                  </span>
                </p>
              </div>
              <div className="col-span-1 ">00.00</div>
              <div className="col-span-1 ">{newProposal.moq}</div>
              <div className="col-span-1 ">{newProposal.dosage_form}</div>
              <div className="col-span-1  rounded-r-lg">
                {newProposal.price ? newProposal.price : "0"}
              </div>
            </div>
            <div className="flex justify-between font-semibold mt-[10rem] pl-[10rem] pr-[1rem] mb-5">
              <p>ยอดชำระทั้งหมด</p>
              <p>{newProposal.price ? newProposal.price : "0"}</p>
            </div>
          </div>
          <div className="m-5">
            <p className="font-semibold">
              จึง​เรียน​มา​เพื่อ​โปรด​พิจารณา​ บริษัทฯ​
              หวัง​เป็น​อย่างยิ่งว่าท่านจะ​พึง​พอใจ​ใน​ราคา​ที่เสนอ​มา​และ​ม​ีโอกาส​ได้รับ​ใช​้ท่าน​
            </p>
            <p>
              We hope our quotation will meet with your approval sincerely
              yours.
            </p>
          </div>
          <div className="grid grid-cols-3 items-center text-center mt-14">
            <div className="col-span-1">{signForm("ผู้อนุมัติซื้อ")}</div>
            <div className="col-span-1">{signForm("ผู้เสนอราคา")}</div>
            <div className="col-span-1">{signForm("ผู้มีอำนาจลงนาม")}</div>
          </div>
          <div className="mx-5 mt-10 leading-6 mb-10">
            <p className="font-semibold text-lg">
              บริษัท​ รี​โว่เมด​ กรุ๊ป​ จํากัด
            </p>
            <p className="text-revomed-dark-grey">
              29/11 หมู​่ 10 ต.{""}​บางบัว​ทอง​ อ.{""}​บางบัว​ทอง​ จ. ​นนทบุรี​
              11110
            </p>
            <p className="text-revomed-dark-grey">
              เบอร์โทร​ศัพท์​: 061-662-4242 แฟกซ​์: 02-191-2770 อี​เมล:
              revomedthai@gmail.com เว็บ​ไซ​ต์: www.revomed.co.th
              เลข​ประจําตัวผู้เสีย​ภาษ​:ี 0735558007293
            </p>
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  );
}
