import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";

import FormSearch from "./formSearch";
import ProposalContainer from "./list";

// import { useIngredientCTX } from "@contexts/IngredientContext";

export default function Page() {
  const router = useRouter();

  // const ctx = useIngredientCTX();
  // const { fetchIngredient } = ctx;

  // useEffect(() => {
  //   fetchIngredient();
  // }, []);

  return (
    <div className="p-6" style={{ minHeight: "calc(100vh - 75px)" }}>
      <div className="flex items-center mb-6">
        <Title level={4} style={{ color: "#004D7D" }}>
          Verify Formula By P&D
        </Title>
      </div>
      <FormSearch />
      <ProposalContainer />
    </div>
  );
}
