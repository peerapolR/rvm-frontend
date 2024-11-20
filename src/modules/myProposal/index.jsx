import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="p-6 min-h-[100vh]">
      <FormSearch />
      <ProposalContainer />
    </div>
  );
}
