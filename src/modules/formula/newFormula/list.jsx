import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import DosageCard from "@components/DosageCard";
import { dosageItem } from "./mockData";
import BaseButton from "@components/BaseButton";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Table } from "antd";

export default function DosageForm() {
  const [selected, setSelected] = useState(0);

  const handleDosageCard = (id) => {
    setSelected(id);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const column = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Active Ingredients",
      dataIndex: "ingredients",
      key: "ingredients",
    },
    {
      title: "Dosage (mg)",
      dataIndex: "dosage",
      key: "dosage",
    },
    {
      title: "Manage",
      dataIndex: "manage",
      key: "manage",
    },
  ];

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
        <div className="flex justify-between">
          <div className="text-revomed-primary text-xl font-bold">
            Ingredients
          </div>
          <BaseButton
            className="pl-6 pr-2 py-2 text-white bg-revomed-primary"
            icon={
              <DownOutlined
                style={{ color: "#fff", padding: "8px", fontSize: "10px" }}
                className="bg-revomed-primary-light1"
              />
            }
          >
            <div className="flex gap-2">
              <div>
                <PlusOutlined />
              </div>
              <div style={{ fontSize: "16px" }} className="font-bold mr-4">
                Ingredient
              </div>
            </div>
          </BaseButton>
        </div>
        <Table columns={column} dataSource={[]} pagination={false} />
      </div>
    </div>
  );
}
