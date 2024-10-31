import React from "react";
import { useRouter } from "next/navigation";
import BaseButton from "@components/BaseButton";
import PlusIcon from "@icons/PlusIcon";
import ExportIcon from "@icons/ExportIcon";
import Title from "antd/es/typography/Title";

export default function Page() {
  const router = useRouter();
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} style={{ color: "#004D7D" }}>
          New Ingredient
        </Title>
      </div>
    </div>
  );
}
