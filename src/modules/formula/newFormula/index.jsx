import React from "react";
import Title from "antd/es/typography/Title";
import BaseButton from "@components/BaseButton";
import { LeftOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import FormSearch from "./formSearch";
import DosageForm from "./list";

export default function NewFormulaList() {
  const itemBreadCrumb = [
    {
      title: <div style={{ color: "#DC818D" }}>{"New Formula"}</div>,
    },
    {
      title: <div style={{ color: "#ABB1C1" }}>{"Summary"}</div>,
    },
  ];

  return (
    <div className="p-6" style={{ minHeight: "calc(100vh - 75px)" }}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6 items-center">
          <LeftOutlined className="p-2 bg-revomed-primary-light2 text-revomed-primary" />
          <Title level={4} style={{ margin: "0", color: "#004D7D" }}>
            Formula
          </Title>
        </div>
        <Breadcrumb separator=">" items={itemBreadCrumb} />
      </div>
      <FormSearch />
      <DosageForm />
    </div>
  );
}
