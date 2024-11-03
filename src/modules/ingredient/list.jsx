import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, Form, Input, Select, Table, Pagination } from "antd";
import EditIcon from "@icons/EditIcon";
import SubMenuIcon from "@icons/SubMenuIcon";
import BasePagination from "@components/Pagination";

import formatDate from "@functions/formatDate";

import { useIngredientCTX } from "@contexts/IngredientContext";

export default function IngredientContainer() {
  const router = useRouter();
  const ctx = useIngredientCTX();
  const { ingredient } = ctx;

  const columns = [
    {
      title: "Active Ingredient",
      dataIndex: "ingredient_name",
      key: "ingredient_name",
      width: "60%",
    },
    {
      title: "Dosage (mg)",
      dataIndex: "dose_min",
      key: "dose_min",
      width: "12%",
      render: (text, record) => (
        <>
          {text} - {record.dose_max}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "ingredient_status",
      key: "ingredient_status",
      width: "10%",
      render: (text) => (
        <div className="relative">
          <span
            className={`absolute h-[8px] w-[8px] rounded-full ${
              text === "draft"
                ? "bg-gray-500"
                : text === "publish"
                ? "bg-green-500"
                : "bg-red-500"
            }  top-1.5`}
          />
          <p className="first-letter:capitalize ml-5">{text}</p>
        </div>
      ),
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Manage",
      dataIndex: "_id",
      key: "_id",
      render: (text) => (
        <div className="flex">
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push(`/main/ingredient/ingredientDeatil/${text}`);
            }}
          >
            <EditIcon />
          </div>
          <div
            className="pl-5 cursor-pointer"
            onClick={() => {
              console.log("sub menu");
            }}
          >
            <SubMenuIcon />
          </div>
        </div>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let data = [];

    if (ingredient && ingredient.length > 0) {
      data = ingredient.map((i) => ({
        ...i,
        key: i._id,
      }));
      setDataSource(data);
    }
  }, [ingredient]);

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
