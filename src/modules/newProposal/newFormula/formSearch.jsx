import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function FormSearch(props) {
  const { form } = props;

  const ctx = useFormulaCTX();
  const { handleFormulaChange, newFormula } = ctx;

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
    </Form>
  );
}
