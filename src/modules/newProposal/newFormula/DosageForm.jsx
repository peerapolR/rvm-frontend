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
  const {
    setFormulation,
    formulation,
    setIsOpen,
    setOpenDetail,
    setDetailModal,
    setIsMaster,
    setDataSource,
    dataSource,
  } = props;

  const ctx = useFormulaCTX();
  const {
    newFormula,
    setNewFormula,
    masterIngredient,
    activeIngredient,
    setMasterIngredient,
    setActiveIngredient,
    sumDose,
  } = ctx;

  const [form] = Form.useForm();
  const [selected, setSelected] = useState("");
  //แก้ตรงนี้
  // useEffect(() => {
  //   if (dataSource.length > 0) {
  //     const mergedArray = [...dataSource, ...masterIngredient].filter(
  //       (item, index, self) =>
  //         index ===
  //         self.findIndex((obj) => obj.ingredient_name === item.ingredient_name)
  //     );
  //     setDataSource(mergedArray);
  //   } else {
  //     setDataSource(masterIngredient);
  //   }
  // }, [masterIngredient]);

  // useEffect(() => {
  //   if (dataSource.length > 0) {
  //     const mergedArray = [...dataSource, ...activeIngredient].filter(
  //       (item, index, self) =>
  //         index ===
  //         self.findIndex((obj) => obj.ingredient_name === item.ingredient_name)
  //     );
  //     setDataSource(mergedArray);
  //   } else {
  //     setDataSource(activeIngredient);
  //   }
  // }, [activeIngredient]);

  useEffect(() => {
    const mergedArray = [...masterIngredient, ...activeIngredient].filter(
      (item, index, self) =>
        index ===
        self.findIndex((obj) => obj.ingredient_name === item.ingredient_name)
    );
    setDataSource(mergedArray);
  }, [masterIngredient, activeIngredient]);

  useEffect(() => {
    const clonedMaster = [...masterIngredient];
    const clonedActive = [...activeIngredient];

    const mergedArray = [...clonedMaster, ...clonedActive].filter(
      (item, index, self) =>
        index ===
        self.findIndex((obj) => obj.ingredient_name === item.ingredient_name)
    );

    setDataSource(mergedArray);
  }, [masterIngredient, activeIngredient]);

  const handleDosageCard = (name, id) => {
    setSelected(id);
    setNewFormula(() => ({
      ...newFormula,
      dosage_form: name,
    }));
  };

  const handleDetail = (record) => {
    setDetailModal(record);
    setOpenDetail(true);
  };

  const handleDelete = (record) => {
    if (record.isMaster) {
      setMasterIngredient((prev) =>
        prev.filter((item) => item.ingredient_name !== record.ingredient_name)
      );
    } else {
      setActiveIngredient((prev) =>
        prev.filter((item) => item.ingredient_name !== record.ingredient_name)
      );
    }
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
            <div
              className="ml-10 cursor-pointer"
              onClick={() => handleDelete(record)}
            >
              <BinIcon className="text-revomed-primary" />
            </div>
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

  const onClickMaster = () => {
    setIsOpen(true);
    setIsMaster(true);
  };

  const onClickActive = () => {
    setIsOpen(true);
    setIsMaster(false);
  };

  const items = [
    {
      label: (
        <div
          className="pt-4 px-6 pb-3"
          style={{ fontSize: "16px" }}
          onClick={onClickMaster}
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
          onClick={onClickActive}
        >
          Active Ingredient
        </div>
      ),
      key: "2",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
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
            rowKey={"_id"}
            components={{ body: { cell: EdiTableCell } }}
          />
          <div className="flex items-end justify-end bg-revomed-white p-6 border rounded-b-2xl">
            <div className="flex gap-4">
              <div
                className="flex items-center font-bold"
                style={{ fontSize: "16px" }}
              >
                {"Total Active (mg)"}
              </div>
              {/* <Form.Item name="total" style={{ margin: "0" }}>
                <Input
                  min={22}
                  max={150}
                  disabled
                  className="w-[120px] h-[40px]"
                  defaultValue={sumDose}
                />
              </Form.Item> */}
              <div>{sumDose}</div>
            </div>
          </div>
        </Form>
      </div>{" "}
      <div
        className="flex gap-[16px] font-bold mt-6"
        style={{ fontSize: "16px" }}
      >
        <div className="text-revomed-dark-grey">Total price:</div>
        <div className="text-revomed-primary">0.00 THB</div>
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
            value={record.dosageToUse}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
