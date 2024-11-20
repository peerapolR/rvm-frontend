import React, { useEffect, useState } from "react";
import { Dropdown, Form, Input, Select } from "antd";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function FormSearch(props) {
  const { setFormulation, formulation, form } = props;

  const ctx = useFormulaCTX();
  const { handleFormulaChange, newFormula, setNewFormula } = ctx;

  const handleFormulaType = (e) => {
    setNewFormula(() => ({
      ...newFormula,
      formula_type: e,
    }));
  };
  const optionType = [
    {
      label: "Prototype",
      value: "prototype",
    },
    {
      label: "Concept",
      value: "concept",
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
  }, [formulation]);

  return (
    <Form className="pt-6 pb-4 grid grid-cols-3" layout="inline" form={form}>
      <Form.Item name="formulaNameLike" label="Formula Name" layout="vertical">
        <Input
          placeholder="Formula Name"
          size="large"
          name="formula_name"
          value={newFormula?.formula_name}
          onChange={handleFormulaChange}
        />
      </Form.Item>
      <Form.Item name="type" label="Formula Type" layout="vertical">
        <Select
          options={optionType}
          placeholder="Select Formula Type"
          size="large"
          name="formula_type"
          value={newFormula?.formula_type}
          onChange={handleFormulaType}
        />
      </Form.Item>
      <Form.Item
        name="formulation"
        label="Formulation (1-3 Formulation)"
        layout="vertical"
      >
        <Select
          mode="multiple"
          size="large"
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
