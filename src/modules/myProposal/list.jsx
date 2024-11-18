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

// import { useIngredientCTX } from "@contexts/IngredientContext";

export default function IngredientContainer() {
  const router = useRouter();
  // const ctx = useIngredientCTX();
  // const { ingredient, publishIngredient, deleteIngredient } = ctx;

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "15%",
    },
    {
      title: "Customer Name",
      dataIndex: "cust_name",
      key: "cust_name",
      width: "30%",
    },
    {
      title: "Formula Name",
      dataIndex: "formula_name",
      key: "formula_name",
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <>
          <p
            className={`first-letter:capitalize text-center text-revomed-white rounded-xl ${
              text === "draft"
                ? "bg-gray-500"
                : text === "pending"
                ? "bg-blue-400"
                : text === "reject"
                ? "bg-red-500"
                : text === "proposed"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            {text}
          </p>
        </>
      ),
    },
    {
      title: "Manage",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <div className="flex">
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push(`/main/myProposal/proposalDeatil/${text}`);
            }}
          >
            <EditIcon />
          </div>
          <div
            className="cursor-pointer pl-5"
            onClick={() => {
              router.push(`/main/myProposal/proposalDeatil/${text}`);
            }}
          >
            <BinIcon />
          </div>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      no: "P2309-01",
      category: "Supplement",
      cust_name: "New Image",
      formula_name: "Anti-Aging",
      createdAt: "2024-11-20T08:34:05.630Z",
      status: "pending",
      _id: "001",
    },
    {
      no: "P2309-02",
      category: "Supplement",
      cust_name: "New Image",
      formula_name: "Anti-Aging",
      createdAt: "2024-11-21T08:34:05.630Z",
      status: "draft",
      _id: "002",
    },
    {
      no: "P2309-03",
      category: "Supplement",
      cust_name: "New Image",
      formula_name: "Anti-Aging",
      createdAt: "2024-11-22T08:34:05.630Z",
      status: "reject",
      _id: "003",
    },
    {
      no: "P2309-04",
      category: "Supplement",
      cust_name: "New Image",
      formula_name: "Anti-Aging",
      createdAt: "2024-11-23T08:34:05.630Z",
      status: "proposed",
      _id: "004",
    },
    {
      no: "P2309-04",
      category: "Supplement",
      cust_name: "New Image",
      formula_name: "Anti-Aging",
      createdAt: "2024-11-24T08:34:05.630Z",
      status: "approve",
      _id: "005",
    },
  ];

  // const [dataSource, setDataSource] = useState([]);

  // useEffect(() => {
  //   let data = [];

  //   if (ingredient && ingredient.length > 0) {
  //     data = ingredient.map((i) => ({
  //       ...i,
  //       key: i._id,
  //     }));
  //     setDataSource(data);
  //   }
  // }, [ingredient]);

  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  return (
    <div className="bg-revomed-white rounded-b-lg mt-1">
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={dataSource.length > 0 ? false : true}
        pagination={false}
      />
      {/* <div className="px-3 py-5 flex justify-end">
        <Pagination  />
      </div> */}

      <div className="flex justify-between px-6 py-[29.5px]">
        <div className="text-[#14142A]">Total {dataSource.length} items</div>
        <BasePagination
          total={dataSource.length}
          showTitle={false}
          defaultCurrent={1}
          showSizeChanger={false}
          align="end"
        />
      </div>
    </div>
  );
}
