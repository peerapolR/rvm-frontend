import React from "react";
import { CSVLink } from "react-csv";
import { CopyOutlined } from "@ant-design/icons";

export default function ExportCSV(props) {
  const { dataToExport } = props;

  const allIngredient = [
    ...dataToExport.master_ingredient,
    ...dataToExport.ingredient,
  ];

  const activeIngredient = allIngredient.map((e, i) => ({
    no: i + 1,
    active: e.ingredient_name,
    dosage: e.dosageToUse,
  }));

  const totalDosage = allIngredient.reduce(
    (sum, item) => sum + Number(item.dosageToUse),
    0
  );

  const headers = [
    { label: "No", key: "no" },
    { label: "Active Ingredients", key: "active" },
    { label: "Dosage", key: "dosage" },
  ];

  const exportData = [
    ...activeIngredient,
    {},
    { no: "", active: "Total Dosage", dosage: totalDosage.toFixed(2) },
  ];

  return (
    <div className="cursor-pointer ml-5">
      <CSVLink
        data={exportData}
        headers={headers}
        filename={`${dataToExport.formular_name}_ingredient.csv`}
      >
        <CopyOutlined />
      </CSVLink>
    </div>
  );
}
