import React, { use, useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import DosageCard from "@components/DosageCard";
import { dosageItem } from "./mockData";
import BaseButton from "@components/BaseButton";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Dropdown, Table, Form, Input } from "antd";
import SelectedBadgeWithIcon from "@components/SelectedBadgeWithIcon";
import LockIcon from "@icons/LockIcon";
import BinIcon from "@icons/BinIcon";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function DosageForm(props) {
  const { setFormulation, formulation, setIsOpen, setOpenDetail } = props;

  const ctx = useFormulaCTX();
  const { handleFormulaChange, newFormula, setNewFormula, masterIngredient } =
    ctx;

  const [form] = Form.useForm();
  const [selected, setSelected] = useState("");

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(masterIngredient);
  }, [masterIngredient]);

  useEffect(() => {
    console.log(dataSource);
  }, [dataSource]);

  const handleDosageCard = (name, id) => {
    setSelected(id);
    setNewFormula(() => ({
      ...newFormula,
      dosage_form: name,
    }));
  };

  const handleDetail = (record) => {
    setOpenDetail(true);
  };

  const column = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: () => {
        return (
          <div>
            <LockIcon />
          </div>
        );
      },
    },
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Active Ingredients",
      dataIndex: "ingredient_name",
      key: "ingredient_name",
    },
    {
      title: "Dosage (mg)",
      dataIndex: "dose_clinical",
      key: "dose_clinical",
      editable: true,
    },
    {
      title: "Manage",
      dataIndex: "",
      key: "",
      render: (text, record) => {
        return (
          <div className="flex">
            <div
              className="underline text-revomed-primary-light1 cursor-pointer"
              onClick={() => handleDetail(record)}
            >
              Detail
            </div>
            <div>
              <BinIcon className="text-revomed-primary ml-5" />
            </div>
          </div>
        );
      },
    },
  ];

  const columnForEdit = column.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editable: col.editable,
        rowKey: record.id,
      }),
    };
  });

  // const dataSource = [
  //   {
  //     id: 1,
  //     ingredients: "Bioenergy RiaGev",
  //     dosage: "0",
  //   },
  //   {
  //     id: 2,
  //     ingredients: "Grape Skin Extract - Resveratrol 98%",
  //     dosage: "0",
  //   },
  //   {
  //     id: 3,
  //     ingredients: "Pycnogenol - French Maritime Pine Bark Extract",
  //     dosage: "0",
  //   },
  // ];

  const handleSelectedBadge = (name) => {
    const result = formulation.filter((e) => e !== name);
    setFormulation(result);
  };

  const items = [
    {
      label: (
        <div
          className="pt-4 px-6 pb-3"
          style={{ fontSize: "16px" }}
          onClick={() => setIsOpen(true)}
        >
          Master Active Ingredient
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className="pb-4 px-6 pt-3"
          style={{ fontSize: "16px" }}
          onClick={() => setIsOpen(true)}
        >
          Active Ingredient
        </div>
      ),
      key: "2",
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
              onClick={() => handleDosageCard(e.name, e.id)}
              selected={selected}
            />
          );
        })}
        {formulation.length > 0 && (
          <div className="col-span-2 flex flex-col justify-end">
            <div className="flex pl-[42px] gap-2 items-center">
              <div
                className="font-bold text-revomed-dark-grey"
                style={{ fontSize: "16px" }}
              >
                Formulation :
              </div>
              {formulation.map((e, i) => {
                return (
                  <SelectedBadgeWithIcon
                    name={e}
                    key={i}
                    onClick={() => handleSelectedBadge(e)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Table Ingredients */}
      <div className="pt-2 flex flex-col">
        <div className="flex justify-between py-6">
          <div className="text-revomed-primary text-xl font-bold">
            Ingredients
          </div>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <BaseButton
              className="pl-6 pr-2 py-3 text-white bg-revomed-primary h-[48px]"
              iconPosition="start"
              icon={<PlusOutlined />}
            >
              <div className="flex">
                <div style={{ fontSize: "16px" }} className="font-bold mr-4">
                  Ingredient
                </div>
                <DownOutlined
                  style={{ color: "#fff", padding: "8px", fontSize: "10px" }}
                  className="bg-revomed-primary-light1"
                />
              </div>
            </BaseButton>
          </Dropdown>
        </div>
        <Form component={false} form={form}>
          <Table
            columns={columnForEdit}
            dataSource={dataSource}
            pagination={false}
            rowClassName={"rowBackground"}
            rowKey="id"
            components={{ body: { cell: EditableCell } }}
          />
          <div className="flex items-end justify-end bg-revomed-white p-6 border rounded-b-2xl">
            <div className="flex gap-4">
              <div
                className="flex items-center font-bold"
                style={{ fontSize: "16px" }}
              >
                {"Total Active (mg)"}
              </div>
              <Form.Item name="total" style={{ margin: "0" }}>
                <Input
                  min={22}
                  max={150}
                  disabled
                  className="w-[120px] h-[40px]"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

const EditableCell = (props) => {
  const { record, dataIndex, title, editable, rowKey, children, ...restProps } =
    props;
  return (
    <td>
      {editable ? (
        <Form.Item
          className="flex items-center"
          style={{ margin: "0" }}
          name={[String(rowKey), dataIndex]}
          rules={[
            {
              min: 22,
              max: 150,
              message: "Dosage must between 22 and 150",
            },
          ]}
        >
          <Input style={{ width: "160px", height: "40px" }} type="number" />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
