import FormulaCard from "@components/FormulaCard";
import BasePagination from "@components/Pagination";
import React from "react";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function FormulaContainer() {
  const ctx = useFormulaCTX();
  const { formula } = ctx;
  return (
    <div className="p-6 bg-revomed-white">
      <div className="grid grid-cols-3 gap-6">
        {formula.map((e, i) => [
          <FormulaCard
            key={i}
            header={e.formula_type}
            creater={e.createdBy}
            code={e.formula_code}
            status={e.formula_status}
            date={e.createdAt}
            form={e.dosage_form}
            details={{
              header: e.formula_name,
              component: e.formulation,
            }}
            onEdit={() => console.log("Edit")}
            onDelete={() => console.log("Delete")}
          />,
        ])}
      </div>
      <div className="flex justify-between px-6 py-[29.5px]">
        <div className="text-[#14142A]">Total {formula.length} items</div>
        {/* <BasePagination
          total={formula.length}
          showTitle={false}
          defaultCurrent={1}
          showSizeChanger={false}
          align="end"
        /> */}
      </div>
    </div>
  );
}
