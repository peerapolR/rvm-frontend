import React from "react";
import { Dropdown, Form, Input, Select, Table, Pagination } from "antd";
import EditIcon from "@icons/EditIcon";
import SubMenuIcon from "@icons/SubMenuIcon";

const columns = [
  {
    title: "Active Ingredient",
    dataIndex: "activeIngredient",
    key: "activeIngredient",
    width: "60%",
  },
  {
    title: "Dosage (mg)",
    dataIndex: "dosage",
    key: "dosage",
    width: "12%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "10%",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Create Date",
    dataIndex: "createDate",
    key: "createDate",
    width: "10%",
  },
  {
    title: "Manage",
    dataIndex: "manage",
    key: "manage",
    render: () => (
      <div className="flex">
        <div
          className="cursor-pointer"
          onClick={() => {
            console.log("edit");
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

export default function IngredientContainer() {
  const dataSource = [
    {
      key: "1",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
    {
      key: "2",
      activeIngredient: "Bioenergy RiaGev",
      dosage: "20.00-230.00",
      status: "Publish",
      createDate: "20/07/24",
    },
  ];
  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  return (
    <div className="bg-revomed-white rounded-b-lg mt-1">
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={dataSource.length > 0 ? false : true}
        pagination={{
          defaultCurrent: 1,
          total: dataSource.length,
          defaultPageSize: 10,
        }}
      />
      {/* <div className="px-3 py-5 flex justify-end">
        <Pagination  />
      </div> */}
    </div>
  );
}
