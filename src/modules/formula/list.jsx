import FormulaCard from "@components/FormulaCard";
import BasePagination from "@components/Pagination";
import React from "react";

export default function FormulaContainer() {
  return (
    <div className="p-6 bg-revomed-white">
      <div className="grid grid-cols-3 gap-6">
        <FormulaCard
          header="prototype"
          type="master"
          status="draft"
          date="11/09/23"
          form="Capsule"
          details={{
            header: "Anti-Aging",
            component:
              "(Protein, Probiotic - Prebiotic - Postbiotic, Eye & Brain)",
          }}
          onEdit={()=>console.log('test')}
          onDelete={()=>console.log('test')}
        />
        <FormulaCard
          header="prototype"
          type="master"
          status="draft"
          date="11/09/23"
          form="Capsule"
          details={{
            header: "Anti-Aging",
            component:
              "(Protein, Probiotic - Prebiotic - Postbiotic, Eye & Brain)",
          }}
          onEdit={()=>console.log('test')}
          onDelete={()=>console.log('test')}
        />
        <FormulaCard
          header="concept"
          type="master"
          status="publish"
          date="11/09/23"
          form="Capsule"
          details={{
            header: "Anti-Aging",
            component:
              "(Protein, Probiotic - Prebiotic - Postbiotic, Eye & Brain)",
          }}
        />
        <FormulaCard
          header="concept"
          type="custom"
          status="proposed"
          date="11/09/23"
          form="Capsule"
          details={{
            header: "Anti-Aging",
            component:
              "(Protein, Probiotic - Prebiotic - Postbiotic, Eye & Brain)",
          }}
        />
        <FormulaCard
          header="saleCustom"
          // type="custom"
          status="approve"
          date="11/09/23"
          form="Capsule"
          details={{
            header: "Anti-Aging",
            component:
              "(Protein, Probiotic - Prebiotic - Postbiotic, Eye & Brain)",
          }}
        />
         <FormulaCard
          header="concept"
          // type="custom"
          status="cancel"
          date="11/09/23"
          form="Capsule"
          details={{
            header: "Anti-Aging",
            component:
              "(Protein, Probiotic - Prebiotic - Postbiotic, Eye & Brain)",
          }}
        />
         <FormulaCard
          header="concept"
          // type="custom"
          status="cancel"
          date="11/09/23"
          form="Oral Dissolving Powder"
          details={{
            header: "Anti-Aging",
            component:
              "(Protein, Probiotic - Prebiotic - Postbiotic, Eye & Brain)",
          }}
        />
      </div>
      <div className="flex justify-between px-6 py-[29.5px]">
        <div className="text-[#14142A]">Total 90 items</div>
        <BasePagination
          total={90}
          showTitle={false}
          defaultCurrent={1}
          showSizeChanger={false}
          align="end"
        />
      </div>
    </div>
  );
}
