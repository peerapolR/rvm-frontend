"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, Popover } from "antd";
import EditIcon from "@icons/EditIcon";
import SubMenuIcon from "@icons/SubMenuIcon";
import BasePagination from "@components/Pagination";
import UnpubIcon from "@icons/UnpubIcon";
import BinIcon from "@icons/BinIcon";

import formatDate from "@functions/formatDate";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function IngredientContainer() {
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { fetchOrderForSaleManager, saleManagerOrder } = newProposalctx;

  useEffect(() => {
    fetchOrderForSaleManager();
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "order_id",
      key: "order_id",
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "product_category",
      key: "product_category",
      width: "15%",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      width: "40%",
    },
    {
      title: "Formula Name",
      dataIndex: "formular_name",
      key: "formular_name",
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Status",
      dataIndex: "order_status",
      key: "order_status",
      render: (text) => (
        <>
          <p
            className={`first-letter:capitalize text-center text-revomed-white rounded-xl ${
              text === "draft"
                ? "bg-gray-500"
                : text === "pending"
                ? "bg-yellow-400"
                : text === "reject" || text === "decline"
                ? "bg-red-500"
                : text === "success"
                ? "bg-green-600"
                : "bg-green-600"
            }`}
          >
            {text}
          </p>
        </>
      ),
    },
  ];

  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  return (
    <div className="bg-revomed-white rounded-b-lg mt-1">
      <Table
        rowClassName="cursor-pointer"
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/main/allProposal/proposalDeatil/${record._id}`);
            },
          };
        }}
        dataSource={saleManagerOrder}
        columns={columns}
        loading={saleManagerOrder.length > 0 ? false : true}
        pagination={false}
      />
      {/* <div className="px-3 py-5 flex justify-end">
        <Pagination  />
      </div> */}

      <div className="flex justify-between px-6 py-[29.5px]">
        <div className="text-[#14142A]">
          Total {saleManagerOrder.length} items
        </div>
        {/* <BasePagination
          total={saleManagerOrder.length}
          showTitle={false}
          defaultCurrent={1}
          showSizeChanger={false}
          align="end"
        /> */}
      </div>
    </div>
  );
}
