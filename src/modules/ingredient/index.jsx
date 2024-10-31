import React from "react";
import { useRouter } from "next/navigation";
import BaseButton from "@components/BaseButton";
import PlusIcon from "@icons/PlusIcon";
import ExportIcon from "@icons/ExportIcon";
import Title from "antd/es/typography/Title";

import FormSearch from "./formSearch";
import IngredientContainer from "./list";

export default function Page() {
  const router = useRouter();
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} style={{ color: "#004D7D" }}>
          All Ingredient
        </Title>
        <div className="flex gap-6">
          <BaseButton
            className="w-[185px] py-3 px-10 border-1 border-revomed-primary rounded-lg text-revomed-primary"
            iconPosition="start"
            icon={<ExportIcon />}
          >
            Export
          </BaseButton>
          <BaseButton
            className="w-[185px] py-3 px-10 rounded-lg border-1 border-revomed-primary bg-revomed-primary text-white hover:bg-black"
            iconPosition="start"
            icon={<PlusIcon />}
            onClick={() => {
              router.push("/ingredient/newIngredient");
            }}
          >
            Ingredient
          </BaseButton>
        </div>
      </div>
      <FormSearch />
      <IngredientContainer />
    </div>
  );
}
