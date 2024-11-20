import React, { use, useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import BaseButton from "@components/BaseButton";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Dropdown, Table, Form, Input } from "antd";
import SelectedBadgeWithIcon from "@components/SelectedBadgeWithIcon";
import LockIcon from "@icons/LockIcon";
import BinIcon from "@icons/BinIcon";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function IngredientTable(props) {
  const {
    setFormulation,
    formulation,
    setIsOpen,
    setOpenDetail,
    setDetailModal,
    setIsMaster,
    setDataSource,
    dataSource,
    newProposal,
  } = props;

  console.log(newProposal.master_ingredient, newProposal.ingredient);

  const [allIngredient, setAllIngredient] = useState([
    ...newProposal.master_ingredient,
    ...newProposal.ingredient,
  ]);

  const [form] = Form.useForm();

  const handleDetail = (record) => {
    setDetailModal(record);
    setOpenDetail(true);
  };

  const sumDose = () => {
    const total = allIngredient.reduce(
      (acc, item) => acc + Number(item.dosageToUse),
      0
    );

    return isNaN(total) ? "0" : total.toString();
  };

  const column = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (record) => {
        return <div>{record.isMaster ? <LockIcon /> : ""}</div>;
      },
    },
    {
      title: "No.",
      dataIndex: "",
      key: "",
      render: (text, record, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: "Active Ingredients",
      dataIndex: "ingredient_name",
      key: "ingredient_name",
    },
    {
      title: "Dosage (mg)",
      dataIndex: "dosageToUse",
      key: "dosageToUse",
      editable: false,
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
            {/* <div>
              <BinIcon className="text-revomed-primary ml-5" />
            </div> */}
          </div>
        );
      },
    },
  ];

  const columnForEdit = column.map((col, i) => {
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
        rowKey: record._id,
      }),
    };
  });

  const handleSelectedBadge = (name) => {
    const result = formulation.filter((e) => e !== name);
    setFormulation(result);
  };

  // const onClickMaster = () => {
  //   setIsOpen(true);
  //   setIsMaster(true);
  // };

  // const onClickActive = () => {
  //   setIsOpen(true);
  //   setIsMaster(false);
  // };

  // const items = [
  //   {
  //     label: (
  //       <div
  //         className="pt-4 px-6 pb-3"
  //         style={{ fontSize: "16px" }}
  //         onClick={onClickMaster}
  //       >
  //         Master Active Ingredient
  //       </div>
  //     ),
  //     key: "1",
  //   },
  //   {
  //     label: (
  //       <div
  //         className="pb-4 px-6 pt-3"
  //         style={{ fontSize: "16px" }}
  //         onClick={onClickActive}
  //       >
  //         Active Ingredient
  //       </div>
  //     ),
  //     key: "2",
  //   },
  // ];

  return (
    <div className="flex flex-col gap-2">
      {/* Table Ingredients */}
      <div className="pt-2 flex flex-col">
        <Form component={false} form={form}>
          <Table
            columns={columnForEdit}
            dataSource={allIngredient}
            pagination={false}
            rowClassName={"rowBackground"}
            rowKey={"_id"}
            components={{ body: { cell: EdiTableCell } }}
          />
          <div className="flex items-end justify-end bg-revomed-white p-6 border rounded-b-2xl">
            <div className="flex gap-4">
              <div
                className="flex items-center font-semibold"
                style={{ fontSize: "16px" }}
              >
                {"Total Active (mg)"}
              </div>
              <div>{sumDose()}</div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

const EdiTableCell = (props) => {
  const { record, dataIndex, title, editable, rowKey, children, ...restProps } =
    props;
  const ctx = useFormulaCTX();
  const {
    activeIngredient,
    setActiveIngredient,
    masterIngredient,
    setMasterIngredient,
  } = ctx;

  const handleDosage = (e) => {
    const { value } = e.target;
    const ingredientName = record.ingredient_name;
    const master = record.isMaster;

    if (!ingredientName) {
      console.error("Ingredient name is undefined or null");
      return;
    }

    if (master) {
      const ingredientArray = masterIngredient.find(
        (e) => e.ingredient_name === ingredientName
      );

      if (!ingredientArray) {
        console.error("Master ingredient not found:", ingredientName);
        return;
      }

      setMasterIngredient((prevItems) =>
        prevItems.map((item) =>
          item.ingredient_name === ingredientArray.ingredient_name
            ? { ...item, dosageToUse: value }
            : item
        )
      );
    } else {
      const ingredientArray = activeIngredient.find(
        (e) => e.ingredient_name === ingredientName
      );

      if (!ingredientArray) {
        console.error("Active ingredient not found:", ingredientName);
        return;
      }

      setActiveIngredient((prevItems) =>
        prevItems.map((item) =>
          item.ingredient_name === ingredientArray.ingredient_name
            ? { ...item, dosageToUse: value }
            : item
        )
      );
    }
  };

  return (
    <td>
      {editable ? (
        <Form.Item
          key={record._id}
          className="flex items-center"
          style={{ margin: "0" }}
          name={[String(rowKey), dataIndex]}
          rules={[
            {
              validator: async (_, value) => {
                if (value < record?.dose_min || value > record?.dose_max) {
                  return Promise.reject(
                    new Error(
                      `Value must be between ${record?.dose_min} and ${record?.dose_max}`
                    )
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            style={{ width: "160px", height: "40px" }}
            type="number"
            onChange={handleDosage}
            disabled={true}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
