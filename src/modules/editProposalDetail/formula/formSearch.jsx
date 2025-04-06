import React from "react";
import Tabs from "@components/Tabs";
import { Dropdown, Form, Input, Select } from "antd";
import BaseButton from "@components/BaseButton";
import { SearchOutlined } from "@ant-design/icons";

export default function FormSearch({ formulation }) {
  const optionFormula = [
    { label: "Skin", value: "Skin" },
    {
      label: "Protein",
      value: "Protein",
    },
    {
      label: "Weight Management",
      value: "Weight Management",
    },
    {
      label: "Anti-Aging",
      value: "Anti-Aging",
    },
    {
      label: "Immune",
      value: "Immune",
    },
    {
      label: "Sleep & Stress",
      value: "Sleep & Stress",
    },
    {
      label: "Eye & Brain",
      value: "Eye & Brain",
    },
    {
      label: "Reduce Swelling",
      value: "Reduce Swelling",
    },
    {
      label: "Bone & Joint",
      value: "Bone & Joint",
    },
    {
      label: "Detox",
      value: "Detox",
    },
    {
      label: "Kid Formula",
      value: "Kid Formula",
    },
    {
      label: "Probiotic - Prebiotic - Postbiotic",
      value: "Probiotic - Prebiotic - Postbiotic",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];
  const result = optionFormula.filter((opt) => formulation.includes(opt.value));
  return (
    <div className="bg-revomed-white rounded-t-lg">
      <Form className="px-6 py-6 grid grid-cols-6 items-end" layout="inline">
        <Form.Item
          name="formulaNameLike"
          label="Search"
          layout="vertical"
          className="col-span-2"
        >
          <Input
            placeholder="Search Formulation..."
            prefix={<SearchOutlined />}
          />
        </Form.Item>
        <Form.Item name="formulation" label="Formulation" layout="vertical">
          <Select options={result} placeholder="Select Formulation..." />
        </Form.Item>
        <Form.Item name="minPrice" label="Minimum Price" layout="vertical">
          <Input placeholder="Minimum Price..." />
        </Form.Item>
        <Form.Item name="maxPrice" label="Maximum Price" layout="vertical">
          <Input placeholder="Maximum Price..." />
        </Form.Item>
        <BaseButton className="bg-revomed-primary text-revomed-white">
          Apply
        </BaseButton>
      </Form>
    </div>
  );
}
