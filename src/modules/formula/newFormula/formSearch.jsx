import React, { useEffect, useState } from "react";
import { Dropdown, Form, Input, Select } from "antd";

export default function FormSearch(props) {
  const { setFormulation, formulation, form } = props;

  const optionType = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Master",
      value: "master",
    },
    {
      label: "Custom",
      value: "custom",
    },
  ];

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


  useEffect(() => {
    form.setFieldValue("formulation", formulation);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulation]);

  return (
    <Form className="pt-6 pb-4 grid grid-cols-3" layout="inline" form={form}>
      <Form.Item name="formulaNameLike" label="Formula Name" layout="vertical">
        <Input placeholder="Formula Name" />
      </Form.Item>
      <Form.Item name="type" label="Formula Type" layout="vertical">
        <Select options={optionType} placeholder="Select Formula Type" />
      </Form.Item>
      <Form.Item
        name="formulation"
        label="Formulation (1-3 Formulation)"
        layout="vertical"
      >
        <Select
          mode="multiple"
          allowClear
          maxCount="3"
          className="w-full rounded-lg"
          options={optionFormula}
          placeholder="Select Formulation"
          name="formulation"
          onChange={(value) => setFormulation(value)}
        />
      </Form.Item>
    </Form>
  );
}
