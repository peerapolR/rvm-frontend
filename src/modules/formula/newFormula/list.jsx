import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import DosageCard from "@components/DosageCard";
import { dosageItem } from "./mockData";

export default function DosageForm() {
  const [selected, setSelected] = useState([]);

  const handleDosageCard = (id) => {
    const isSelected = selected.includes(id);

    if (isSelected) {
      const newSelectedIds = selected.filter((selectedId) => selectedId !== id);
      setSelected(newSelectedIds);
    } else {
      if (selected.length < 3) {
        setSelected([...selected, id]);
      }
    }
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className="flex flex-col gap-2">
      <Title level={4} style={{ color: "#004D7D", margin: "0" }}>
        Dosage Form
      </Title>
      <div className="grid grid-cols-3 gap-6">
        {dosageItem.map((e, i) => {
          return (
            <DosageCard
              key={i}
              id={e.id}
              name={e.name}
              title={e.title}
              image={e.image}
              onClick={() => handleDosageCard(e.id)}
              selected={selected}
            />
          );
        })}
      </div>
      {/* Table Ingredients */}
      <div className="pt-2 flex flex-col">
        <div className="flex justify-between"></div>
      </div>
    </div>
  );
}
