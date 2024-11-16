import React from "react";
import { CloseOutlined } from "@ant-design/icons";
export default function BadgeSelected(props) {
  const { name, onClick } = props;
  return (
    <div
      className="h-[40px] bg-revomed-secondary-light3 text-revomed-secondary rounded-lg flex items-center gap-[10px] px-4"
      style={{ fontSize: "16px" }}
      onClick={onClick}
    >
      {name}
      <CloseOutlined />
    </div>
  );
}
