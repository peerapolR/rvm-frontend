"use client";

import { Avatar } from "antd";
import { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { usePath } from "@contexts/PathContext";

export default function HeaderBar() {
  const { header } = usePath();

  return (
    <Header
      style={{
        backgroundColor: "white",
        padding: "12px 24px",
        display: "flex",
        height: "72px",
        justifyContent: "space-between",
        borderColor: "#EFF1F7",
      }}
    >
      <div className="flex items-center text-xl text-revomed-primary-dark">
        {header}
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col text-end text-base">
          <div className="text-revomed-primary font-bold">
            Peerapol Rattanawongghun
          </div>
          <div className="text-revomed-grey">Admin 000</div>
        </div>
        <Avatar size={48} icon={<UserOutlined />} />
      </div>
    </Header>
  );
}
