import React from "react";
import Tabs from "@components/Tabs";
import { Dropdown, Form, Input, Select } from "antd";
import BaseButton from "@components/BaseButton";
import SearchIcon from "@icons/SearchIcon";
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
      {/* Tabs Container */}
      <Tabs />
      {/* SearchContainer */}
      <Form
        className="px-6 py-6 grid grid-cols-5 items-end bg-revomed-white mb-1"
        layout="inline"
      >
        <Form.Item name="formulaNameLike" label="Search" layout="vertical">
          <Input placeholder="Search Formulation..." prefix={<SearchIcon />} />
        </Form.Item>
        <Form.Item name="type" label="Type" layout="vertical">
          <Select options={optionType} defaultValue={"all"} />
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
