import React from 'react'
import { Dropdown, Form, Input, Select } from "antd";


export default function FormSearch() {

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


  return (
    <Form className="pt-6 pb-4 grid grid-cols-3" layout="inline">
        <Form.Item name="formulaNameLike" label="Formula Name" layout="vertical">
          <Input
            placeholder="Formula Name"
          />
        </Form.Item>
        <Form.Item name="type" label="Formula Type" layout="vertical">
          <Select options={optionType} defaultValue={"all"}  placeholder="Select Formula Type"/>
        </Form.Item>
        <Form.Item name="formulation" label="Formulation (1-3 Formulation)" layout="vertical">
          <Select options={optionType} defaultValue={"all"} placeholder="Select Formulation"/>
        </Form.Item>
      </Form>
  )
}
