import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Popover } from "antd";

import Title from "antd/es/typography/Title";
import BackIcon from "@icons/BackIcon";
import EditIcon from "@icons/EditIcon";
import SubMenuIcon from "@icons/SubMenuIcon";
import UnpubIcon from "@icons/UnpubIcon";
import BinIcon from "@icons/BinIcon";
import FooterBar from "./footerBar";
import ProposalDoc from "./proposalDoc";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function Page({ _id }) {
  const componentRef = useRef(null);
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { fetchOrderById, orderDetail = {} } = newProposalctx;

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

  const [moqActive, setMoqActive] = useState(1);

  const reactPrint = useReactToPrint({
    content: () => componentRef.current, // Pass the ref here
  });

  // const reactPrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   print: async (printIframe) => {
  //     // Do whatever you want here, including asynchronous work
  //     await generateAndSavePDF(printIframe);
  //   },
  // });

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
        <ProposalDoc
          ref={componentRef}
          moqActive={moqActive}
          orderDetail={orderDetail}
          allIngredient={allIngredient}
        />
      </div>
      <FooterBar
        status={orderDetail?.order_status}
        _id={_id}
        reactPrint={reactPrint}
      />
    </>
  );
}
