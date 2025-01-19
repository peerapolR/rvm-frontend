import React from "react";
import { Form, Input, Select } from "antd";
import BaseButton from "@components/BaseButton";
import { SearchOutlined } from "@ant-design/icons";

export default function FormSearch({ setHandleSearch }) {
  const [form] = Form.useForm();

  const optionStatus = [
    { label: "All", value: "all" },
    { label: "Draft", value: "draft" },
    { label: "Publish", value: "publish" },
    { label: "Unpublish", value: "unpublish" },
  ];

  const clickEvent = () => {
    form
      .validateFields()
      .then((values) => {
        setHandleSearch({
          name: values.formulaNameLike,
          status: values.status,
        });
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <div className="bg-revomed-white rounded-t-lg">
      <Form
        className="px-6 py-6 grid grid-cols-6 items-end"
        layout="inline"
        form={form} // Connect form instance
      >
        {/* Input for Formula Name */}
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
        {/* Select for Status */}
        <Form.Item
          name="status"
          label="Status"
          layout="vertical"
          initialValue="all" // Set initial value
        >
          <Select options={optionStatus} />
        </Form.Item>
        <div></div>
        <div></div>
        {/* Apply Button */}
        <BaseButton
          className="bg-revomed-primary text-revomed-white"
          onClick={clickEvent}
          type="button" // Prevent form submission
        >
          Apply
        </BaseButton>
      </Form>
    </div>
  );
}
