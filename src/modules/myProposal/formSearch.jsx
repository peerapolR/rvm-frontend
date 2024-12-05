import React from "react";
import Tabs from "@components/Tabs";
import { Dropdown, Form, Input, Select } from "antd";
import BaseButton from "@components/BaseButton";
import { SearchOutlined } from "@ant-design/icons";

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

  const optionProdCat = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Supplement",
      value: "supplement",
    },
    // {
    //   label: "Cosmetic",
    //   value: "cosmetic",
    // },
    // {
    //   label: "Skincare",
    //   value: "skincare",
    // },
  ];

  const optionStatus = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Draft",
      value: "draft",
    },
    {
      label: "Publish",
      value: "publish",
    },
    {
      label: "Approve",
      value: "approve",
    },
    {
      label: "Decline",
      value: "decline",
    },
    {
      label: "Success",
      value: "success",
    },
    {
      label: "Cancel",
      value: "cancel",
    },
  ];

  const optionMonth = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Jan",
      value: 0,
    },
    {
      label: "Feb",
      value: 1,
    },
    {
      label: "Mar",
      value: 2,
    },
    {
      label: "Apr",
      value: 3,
    },
    {
      label: "May",
      value: 4,
    },
    {
      label: "Jun",
      value: 5,
    },
    {
      label: "Jul",
      value: 6,
    },
    {
      label: "Aug",
      value: 7,
    },
    {
      label: "Sep",
      value: 8,
    },
    {
      label: "Oct",
      value: 9,
    },
    {
      label: "Nov",
      value: 10,
    },
    {
      label: "Dec",
      value: 11,
    },
  ];

  return (
    <div>
      <Form className="py-6 grid grid-cols-6 items-end" layout="inline">
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
        <Form.Item name="productCat" label="Product Category" layout="vertical">
          <Select options={optionProdCat} defaultValue={"all"} />
        </Form.Item>
        <Form.Item name="status" label="Status" layout="vertical">
          <Select options={optionStatus} defaultValue={"all"} />
        </Form.Item>
        <Form.Item name="date" label="Date" layout="vertical">
          <Select options={optionMonth} defaultValue={"all"} />
        </Form.Item>
        <BaseButton className="bg-revomed-primary text-revomed-white">
          Apply
        </BaseButton>
      </Form>
    </div>
  );
}
