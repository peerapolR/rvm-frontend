import BaseButton from "@components/BaseButton";
import PlusIcon from "@icons/PlusIcon";
import Title from "antd/es/typography/Title";
import React from "react";
import FormSearch from "./formSearch";
import FormulaContainer from "./list";
import { useRouter } from "next/navigation";

export default function FormulaList() {
  const router = useRouter();
  return (
    <div className="p-6" style={{ minHeight: "calc(100vh - 75px)" }}>
      <div className="flex justify-between items-center mb-6">
        <Title level={4} style={{ color: "#004D7D" }}>
          Formula
        </Title>
        <div className="flex gap-6">
          <BaseButton className="w-[185px] py-3 px-10 border-1 border-revomed-secondary rounded-lg text-revomed-secondary">
            All Ingredient
          </BaseButton>
          <BaseButton
            className="w-[185px] py-3 px-10 rounded-lg border-1 border-revomed-secondary bg-revomed-secondary text-white hover:bg-black"
            iconPosition="start"
            icon={<PlusIcon />}
            onClick={() => router.push("/main/formula/newFormula")}
          >
            New Formula
          </BaseButton>
        </div>
      </div>
      <FormSearch />
      {/* Formula Container */}
      <FormulaContainer />
    </div>
  );
}
