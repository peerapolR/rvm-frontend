import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Popover } from "antd";
import RevomedLogo from "./RevomedLogo";

import Title from "antd/es/typography/Title";
import BackIcon from "@icons/BackIcon";
import EditIcon from "@icons/EditIcon";
import SubMenuIcon from "@icons/SubMenuIcon";
import UnpubIcon from "@icons/UnpubIcon";
import BinIcon from "@icons/BinIcon";
import FooterBar from "./footerBar";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

import formatPrice from "@functions/formatPrice";
import formatUnit from "@functions/formatUnit";

export default function Page({ _id }) {
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { fetchOrderById, orderDetail } = newProposalctx;

  const [allIngredient, setAllIngredient] = useState([]);

  useEffect(() => {
    if (orderDetail?.master_ingredient?.length > 0) {
      setAllIngredient([
        ...orderDetail?.master_ingredient,
        ...orderDetail?.ingredient,
      ]);
    }
  }, [orderDetail]);

  useEffect(() => {
    fetchOrderById(_id);
  }, []);

  const spaces = "\u00A0".repeat(75);
  const signForm = (name) => (
    <div>
      <div className="text-revomed-primary-dark">{name}</div>
      <div className="h-[4rem] border-b-1 border-revomed-black mx-[8rem] mb-3"></div>
      <span>({spaces})</span>
      <div className="mt-3">
        วันที่ ................ /................ / ................
      </div>
    </div>
  );

  const [moqActive, setMoqActive] = useState(1);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div
            className="bg-revomed-primary-light2 w-[40px] h-[40px] rounded-lg items-center flex justify-center mr-5 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <BackIcon />
          </div>
          <div className="flex justify-between w-full">
            <Title level={4} style={{ color: "#004D7D" }}>
              Proposal
            </Title>
            <div className="flex gap-5">
              <p className="text-lg font-semibold text-revomed-primary">
                Proposal
              </p>
              <div
                className={` rounded-lg w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer ${
                  moqActive === 1
                    ? "text-revomed-white bg-revomed-primary"
                    : "text-revomed-primary bg-revomed-light-grey2"
                }`}
                onClick={() => {
                  setMoqActive(1);
                }}
              >
                1
              </div>
              {orderDetail.moq2 ? (
                <div
                  className={` rounded-lg w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer ${
                    moqActive === 2
                      ? "text-revomed-white bg-revomed-primary"
                      : "text-revomed-primary bg-revomed-light-grey2"
                  }`}
                  onClick={() => {
                    setMoqActive(2);
                  }}
                >
                  2
                </div>
              ) : (
                ""
              )}
              {orderDetail.moq3 ? (
                <div
                  className={` rounded-lg w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer ${
                    moqActive === 3
                      ? "text-revomed-white bg-revomed-primary"
                      : "text-revomed-primary bg-revomed-light-grey2"
                  }`}
                  onClick={() => {
                    setMoqActive(3);
                  }}
                >
                  3
                </div>
              ) : (
                ""
              )}
            </div>
            <p
              className={`first-letter:capitalize text-center text-revomed-white rounded-xl px-5 h-[21px] ${
                orderDetail?.order_status === "draft"
                  ? "bg-gray-500"
                  : orderDetail?.order_status === "pending"
                  ? "bg-yellow-400"
                  : orderDetail?.order_status === "reject" ||
                    orderDetail?.order_status === "decline"
                  ? "bg-red-500"
                  : orderDetail?.order_status === "success"
                  ? "bg-green-600"
                  : "bg-green-600"
              }`}
            >
              {orderDetail?.order_status}
            </p>
          </div>
        </div>
        {moqActive === 1 ? (
          <div className="bg-revomed-white p-5 w-full">
            <div className="flex justify-between border-b-1">
              <div>
                <RevomedLogo />
              </div>
              <div>
                <p className="text-3xl text-revomed-primary-dark font-semibold">
                  PROPOSAL(1)
                </p>
                <p className="text-end mt-5">
                  เลขที่{" "}
                  <span className="font-semibold ml-5">
                    {orderDetail.proposal_code}
                    {orderDetail.moq1 ? "/1" : ""}
                  </span>
                </p>
                <p className="text-end my-5 bg-revomed-primary-light2 text-revomed-primary px-3 py-2 rounded-lg">
                  ยอดชำระ{" "}
                  <span className="font-semibold ml-5">
                    {orderDetail.price1
                      ? formatPrice(orderDetail.price1)
                      : "00.00"}
                  </span>
                </p>
              </div>
            </div>
            <div className="my-5 flex justify-between">
              <div className="flex">
                <div className="flex">
                  <p>จาก</p>
                  <div className="ml-5">
                    <p>{orderDetail.creator_id}</p>
                    {/* <p>+66{user.tel}</p>
                  <p>{user.email}</p> */}
                  </div>
                </div>
                <div className="flex ml-5">
                  <p>เรียน</p>
                  <div className="ml-5">
                    <p>{orderDetail.customer_name}</p>
                    <p>
                      {orderDetail.address} {orderDetail.district}{" "}
                      {orderDetail.sub_district} {orderDetail.city}{" "}
                      {orderDetail.postal_code} {orderDetail.tel} -{" "}
                      {orderDetail.contact_person}
                    </p>
                    <p>Tax ID: {orderDetail.tax_id}</p>
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
                      {orderDetail.proposal_name}
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
                      {orderDetail.formula}
                    </span>
                  </p>
                  <p className="font-semibold mt-5">
                    Form:{" "}
                    <span className="ml-5 font-normal">
                      {orderDetail.dosage_form}
                    </span>
                  </p>
                  <div className="font-semibold mt-5">
                    Packaging:{" "}
                    <span className="ml-5 font-normal">
                      {orderDetail.packaging1}
                    </span>
                    <p className="ml-5 font-normal">
                      {orderDetail.packaging_detail1}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 ">{orderDetail.prePrice}</div>
                <div className="col-span-1 ">
                  {formatUnit(orderDetail.moq1)}
                </div>
                <div className="col-span-1 ">{orderDetail.dosage_form}</div>
                <div className="col-span-1  rounded-r-lg">
                  {orderDetail.price1
                    ? formatPrice(orderDetail.price1)
                    : "00.00"}
                </div>
              </div>
              <div className="flex justify-between font-semibold mt-[10rem] pl-[10rem] pr-[1rem] mb-5">
                <p>ยอดชำระทั้งหมด</p>
                <p>
                  {orderDetail.price1
                    ? formatPrice(orderDetail.price1)
                    : "00.00"}
                </p>
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
                29/11 หมู​่ 10 ต.{""}​บางบัว​ทอง​ อ.{""}​บางบัว​ทอง​ จ.
                ​นนทบุรี​ 11110
              </p>
              <p className="text-revomed-dark-grey">
                เบอร์โทร​ศัพท์​: 061-662-4242 แฟกซ​์: 02-191-2770 อี​เมล:
                revomedthai@gmail.com เว็บ​ไซ​ต์: www.revomed.co.th
                เลข​ประจําตัวผู้เสีย​ภาษ​:ี 0735558007293
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {moqActive === 2 ? (
          <div className="bg-revomed-white p-5 w-full">
            <div className="flex justify-between border-b-1">
              <div>
                <RevomedLogo />
              </div>
              <div>
                <p className="text-3xl text-revomed-primary-dark font-semibold">
                  PROPOSAL(2)
                </p>
                <p className="text-end mt-5">
                  เลขที่{" "}
                  <span className="font-semibold ml-5">
                    {orderDetail.proposal_code}
                    {orderDetail.moq2 ? "/2" : ""}
                  </span>
                </p>
                <p className="text-end my-5 bg-revomed-primary-light2 text-revomed-primary px-3 py-2 rounded-lg">
                  ยอดชำระ{" "}
                  <span className="font-semibold ml-5">
                    {orderDetail.price2 ? formatPrice(orderDetail.price2) : "0"}
                  </span>
                </p>
              </div>
            </div>
            <div className="my-5 flex justify-between">
              <div className="flex">
                <div className="flex">
                  <p>จาก</p>
                  <div className="ml-5">
                    <p>{orderDetail.creator_id}</p>
                    {/* <p>+66{user.tel}</p>
                  <p>{user.email}</p> */}
                  </div>
                </div>
                <div className="flex ml-5">
                  <p>เรียน</p>
                  <div className="ml-5">
                    <p>{orderDetail.customer_name}</p>
                    <p>
                      {orderDetail.address} {orderDetail.district}{" "}
                      {orderDetail.sub_district} {orderDetail.city}{" "}
                      {orderDetail.postal_code} {orderDetail.tel} -{" "}
                      {orderDetail.contact_person}
                    </p>
                    <p>Tax ID: {orderDetail.tax_id}</p>
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
                      {orderDetail.proposal_name}
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
                      {orderDetail.formula}
                    </span>
                  </p>
                  <p className="font-semibold mt-5">
                    Form:{" "}
                    <span className="ml-5 font-normal">
                      {orderDetail.dosage_form}
                    </span>
                  </p>
                  <div className="font-semibold mt-5">
                    Packaging:{" "}
                    <span className="ml-5 font-normal">
                      {orderDetail.packaging2}
                    </span>
                    <p className="ml-5 font-normal">
                      {orderDetail.packaging_detail2}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 ">{orderDetail.prePrice}</div>
                <div className="col-span-1 ">
                  {formatUnit(orderDetail.moq2)}
                </div>
                <div className="col-span-1 ">{orderDetail.dosage_form}</div>
                <div className="col-span-1  rounded-r-lg">
                  {orderDetail.price2 ? formatPrice(orderDetail.price2) : "0"}
                </div>
              </div>
              <div className="flex justify-between font-semibold mt-[10rem] pl-[10rem] pr-[1rem] mb-5">
                <p>ยอดชำระทั้งหมด</p>
                <p>
                  {orderDetail.price2 ? formatPrice(orderDetail.price2) : "0"}
                </p>
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
                29/11 หมู​่ 10 ต.{""}​บางบัว​ทอง​ อ.{""}​บางบัว​ทอง​ จ.
                ​นนทบุรี​ 11110
              </p>
              <p className="text-revomed-dark-grey">
                เบอร์โทร​ศัพท์​: 061-662-4242 แฟกซ​์: 02-191-2770 อี​เมล:
                revomedthai@gmail.com เว็บ​ไซ​ต์: www.revomed.co.th
                เลข​ประจําตัวผู้เสีย​ภาษ​:ี 0735558007293
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {moqActive === 3 ? (
          <div className="bg-revomed-white p-5 w-full">
            <div className="flex justify-between border-b-1">
              <div>
                <RevomedLogo />
              </div>
              <div>
                <p className="text-3xl text-revomed-primary-dark font-semibold">
                  PROPOSAL(3)
                </p>
                <p className="text-end mt-5">
                  เลขที่{" "}
                  <span className="font-semibold ml-5">
                    {orderDetail.proposal_code}
                    {orderDetail.moq3 ? "/3" : ""}
                  </span>
                </p>
                <p className="text-end my-5 bg-revomed-primary-light2 text-revomed-primary px-3 py-2 rounded-lg">
                  ยอดชำระ{" "}
                  <span className="font-semibold ml-5">
                    {orderDetail.price3 ? formatPrice(orderDetail.price3) : "0"}
                  </span>
                </p>
              </div>
            </div>
            <div className="my-5 flex justify-between">
              <div className="flex">
                <div className="flex">
                  <p>จาก</p>
                  <div className="ml-5">
                    <p>{orderDetail.creator_id}</p>
                    {/* <p>+66{user.tel}</p>
                  <p>{user.email}</p> */}
                  </div>
                </div>
                <div className="flex ml-5">
                  <p>เรียน</p>
                  <div className="ml-5">
                    <p>{orderDetail.customer_name}</p>
                    <p>
                      {orderDetail.address} {orderDetail.district}{" "}
                      {orderDetail.sub_district} {orderDetail.city}{" "}
                      {orderDetail.postal_code} {orderDetail.tel} -{" "}
                      {orderDetail.contact_person}
                    </p>
                    <p>Tax ID: {orderDetail.tax_id}</p>
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
                      {orderDetail.proposal_name}
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
                      {orderDetail.formula}
                    </span>
                  </p>
                  <p className="font-semibold mt-5">
                    Form:{" "}
                    <span className="ml-5 font-normal">
                      {orderDetail.dosage_form}
                    </span>
                  </p>
                  <div className="font-semibold mt-5">
                    Packaging:{" "}
                    <span className="ml-5 font-normal">
                      {orderDetail.packaging3}
                    </span>
                    <p className="ml-5 font-normal">
                      {orderDetail.packaging_detail3}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 ">{orderDetail.prePrice}</div>
                <div className="col-span-1 ">
                  {formatUnit(orderDetail.moq3)}
                </div>
                <div className="col-span-1 ">{orderDetail.dosage_form}</div>
                <div className="col-span-1  rounded-r-lg">
                  {orderDetail.price3 ? formatPrice(orderDetail.price3) : "0"}
                </div>
              </div>
              <div className="flex justify-between font-semibold mt-[10rem] pl-[10rem] pr-[1rem] mb-5">
                <p>ยอดชำระทั้งหมด</p>
                <p>
                  {orderDetail.price3 ? formatPrice(orderDetail.price3) : "0"}
                </p>
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
                29/11 หมู​่ 10 ต.{""}​บางบัว​ทอง​ อ.{""}​บางบัว​ทอง​ จ.
                ​นนทบุรี​ 11110
              </p>
              <p className="text-revomed-dark-grey">
                เบอร์โทร​ศัพท์​: 061-662-4242 แฟกซ​์: 02-191-2770 อี​เมล:
                revomedthai@gmail.com เว็บ​ไซ​ต์: www.revomed.co.th
                เลข​ประจําตัวผู้เสีย​ภาษ​:ี 0735558007293
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <FooterBar _id={_id} />
    </>
  );
}
