import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomFormula from "./customFormula";

import Title from "antd/es/typography/Title";
import BackIcon from "@icons/BackIcon";
import FooterBar from "./footerBar";

import ModalDetail from "@modules/formula/newFormula/modalDetail";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function Page({ _id }) {
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { fetchOrderById, orderDetail } = newProposalctx;

  const [openDetail, setOpenDetail] = useState(false);
  const [detailModal, setDetailModal] = useState({});

  const [dataSource, setDataSource] = useState([]);
  const [isChange, setIsChange] = useState(false);

  const [price, setPrice] = useState(0);

  const [dataToChange, setDataToChange] = useState({
    master_ingredient: "",
    ingredient: "",
    price1: "",
    price2: "",
    price3: "",
  });

  useEffect(() => {
    fetchOrderById(_id);
  }, []);

  useEffect(() => {
    if (orderDetail) {
      const master = Array.isArray(orderDetail.master_ingredient)
        ? orderDetail.master_ingredient
        : [];
      const ingredient = Array.isArray(orderDetail.ingredient)
        ? orderDetail.ingredient
        : [];

      setDataSource([...master, ...ingredient]);
    }
  }, [orderDetail]);

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
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
            <Title level={4} style={{ color: "#004D7D" }} className="pt-2">
              Sale Custom Formula Detail
            </Title>
          </div>
        </div>
        <CustomFormula
          orderDetail={orderDetail}
          setDetailModal={setDetailModal}
          setOpenDetail={setOpenDetail}
          dataSource={dataSource}
          setDataSource={setDataSource}
          setIsChange={setIsChange}
          price={price}
          setPrice={setPrice}
          setDataToChange={setDataToChange}
          dataToChange={dataToChange}
        />
      </div>
      <FooterBar
        _id={_id}
        isChange={isChange}
        price={price}
        dataToChange={dataToChange}
      />
      <ModalDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        detailModal={detailModal}
      />
    </div>
  );
}
