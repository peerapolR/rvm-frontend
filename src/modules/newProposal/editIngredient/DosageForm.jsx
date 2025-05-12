import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import DosageCard from "@components/DosageCard";
import BaseButton from "@components/BaseButton";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Dropdown, Table, Form, Input } from "antd";
import SelectedBadgeWithIcon from "@components/SelectedBadgeWithIcon";
import LockIcon from "@icons/LockIcon";
import BinIcon from "@icons/BinIcon";
import formatPrice from "@functions/formatPrice";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function DosageForm(props) {
  const {
    newProposal,
    setFormulation,
    formulation,
    setIsOpen,
    setOpenDetail,
    setDetailModal,
    setIsMaster,
    setDataSource,
    dataSource,
    setReadyToNext,
    setOpenEdit,
    price,
    setEditCount,
    editCount,
    editRecord,
    setEditRecord,
    isCal,
    setIsCal,
    editIngredientNewProposal,
    cancleEditIngredientNewProposal,
  } = props;

  const ctx = useFormulaCTX();
  const {
    newFormula,
    setNewFormula,
    masterIngredient,
    activeIngredient,
    setMasterIngredient,
    setActiveIngredient,
    customMasterIngredient,
    setCustomMasterIngredient,
    customActiveIngredient,
    setCustomIngredient,
    setIngredientDose,
    dosagePrice,
  } = ctx;

  useEffect(() => {
    if (!isCal) {
      setMasterIngredient(newProposal.master_ingredient);
      setActiveIngredient(newProposal.ingredient);
    }
    setCustomMasterIngredient(newProposal.master_ingredient);
    setCustomIngredient(newProposal.ingredient);
  }, []);

  const [allIngredient, setAllIngredient] = useState([
    ...newProposal.master_ingredient,
    ...newProposal.ingredient,
  ]);

  const [form] = Form.useForm();
  const [selected, setSelected] = useState("");

  const sumDose = () => {
    const total = allIngredient.reduce(
      (acc, item) => acc + Number(item.dosageToUse),
      0
    );

    return isNaN(total) ? "0" : total.toString();
  };

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
      dataIndex: "dosageToUse",
      key: "dosageToUse",
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

  const onClickMaster = () => {
    setIsOpen(true);
    setIsMaster(true);
  };

  const onClickActive = () => {
    setIsOpen(true);
    setIsMaster(false);
  };

  const calculatePrice = (master, ing) => {
    const editIngredient = [...master, ...ing];
    const totalPrice = editIngredient.reduce((acc, item) => {
      const price = parseFloat(item.price_min.trim()) || 0;
      const dosage = parseFloat(item.dosageToUse) || 0;
      return acc + price * dosage;
    }, 0);

    const dp = parseFloat(dosagePrice(newProposal.dosage_form));
    const sum = totalPrice + dp;

    return isNaN(totalPrice) ? "0" : sum;
  };

  const handleCalIngredient = () => {
    const cal = calculatePrice(
      newProposal.master_ingredient,
      newProposal.ingredient
    );

    console.log("Calculate Price & Save");
    setReadyToNext(false);
    setOpenEdit(false);
    setIsCal(true);
    editIngredientNewProposal(cal);
  };

  const handleCancleEdit = () => {
    setReadyToNext(false);
    setOpenEdit(false);
    setIsCal(false);
    setEditCount(0);
    setEditRecord([]);
    cancleEditIngredientNewProposal();
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

          <div className="flex">
            <div className="mr-5">
              <p className=" text-revomed-red pt-3">
                *ต้องแก้ไขสารอย่างน้อย 3 รายการจึงจะสามารถกด Calculate ราคาได้{" "}
              </p>
              <p className="text-end">รายการแก้ไข {editCount} รายการ</p>
            </div>
            <BaseButton
              className=" h-[48px] py-3 px-10  bg-revomed-primary rounded-lg text-revomed-white mr-5 font-bold"
              disabled={editCount >= 3 ? false : true}
              onClick={() => {
                handleCalIngredient();
              }}
            >
              Calculate Price & Save
            </BaseButton>
            <BaseButton
              className=" h-[48px] py-3 px-10  border-revomed-secondary rounded-lg text-revomed-secondary mr-5"
              onClick={() => {
                handleCancleEdit();
              }}
            >
              Cancle Edit
            </BaseButton>
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
        </div>
        <Form component={false} form={form}>
          <Table
            columns={columnForEdit}
            dataSource={dataSource}
            pagination={false}
            rowClassName={"rowBackground"}
            rowKey={"_id"}
            components={{
              body: {
                cell: (props) => (
                  <EdiTableCell
                    {...props}
                    setEditCount={setEditCount}
                    editCount={editCount}
                    setDataSource={setDataSource}
                    editRecord={editRecord}
                    setEditRecord={setEditRecord}
                  />
                ),
              },
            }}
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
              <div>{sumDose()}</div>
            </div>
          </div>
        </Form>
      </div>{" "}
      <div
        className="flex gap-[16px] font-bold mt-6"
        style={{ fontSize: "16px" }}
      >
        <div className="text-revomed-dark-grey">Total price:</div>
        <div className="text-revomed-primary">{formatPrice(price)} THB</div>
      </div>
    </div>
  );
}

const EdiTableCell = (props) => {
  const {
    record,
    dataIndex,
    title,
    editable,
    rowKey,
    children,
    editCount,
    setEditCount,
    data,
    dataSource,
    setDataSource,
    editRecord,
    setEditRecord,
    ...restProps
  } = props;
  const ctx = useFormulaCTX();
  const {
    activeIngredient,
    setActiveIngredient,
    masterIngredient,
    setMasterIngredient,
    customMasterIngredient,
    setCustomMasterIngredient,
    customActiveIngredient,
    setCustomIngredient,
  } = ctx;

  const isIngredientNameExists = (editRecord, ingredientName) => {
    if (!Array.isArray(editRecord)) return false;
    return editRecord.some((e) => e.ingredient_name === ingredientName);
  };

  const getIngredientRecord = (editRecord, ingredientName) => {
    if (!Array.isArray(editRecord)) return null;
    return editRecord.find((e) => e.ingredient_name === ingredientName);
  };

  const removeEditRecordByName = (nameToRemove) => {
    setEditRecord((prev) =>
      prev.filter((item) => item.ingredient_name !== nameToRemove)
    );
  };

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

      setCustomMasterIngredient((prevItems) =>
        prevItems.map((item) =>
          item.ingredient_name === ingredientArray.ingredient_name
            ? { ...item, dosageToUse: value }
            : item
        )
      );

      const isChange = isIngredientNameExists(editRecord, ingredientName);

      if (isChange) {
        const matchedRecord = getIngredientRecord(editRecord, ingredientName);

        if (matchedRecord.dosageToUse === value) {
          // console.log("Found and dosageToUse is the same");
          if (editCount <= 0) {
            removeEditRecordByName(ingredientName);
          } else {
            setEditCount((prev) => prev - 1);
            removeEditRecordByName(ingredientName);
          }
        }
      } else {
        setEditRecord((prev) => [
          ...prev,
          {
            ingredient_name: ingredientArray.ingredient_name,
            dosageToUse: ingredientArray.dosageToUse,
          },
        ]);

        setEditCount((prev) => prev + 1);
      }
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

      setCustomIngredient((prevItems) =>
        prevItems.map((item) =>
          item.ingredient_name === ingredientArray.ingredient_name
            ? { ...item, dosageToUse: value }
            : item
        )
      );
      const isChange = isIngredientNameExists(editRecord, ingredientName);

      if (isChange) {
        const matchedRecord = getIngredientRecord(editRecord, ingredientName);

        if (matchedRecord.dosageToUse === value) {
          // console.log("Found and dosageToUse is the same");
          if (editCount <= 0) {
            removeEditRecordByName(ingredientName);
          } else {
            setEditCount((prev) => prev - 1);
            removeEditRecordByName(ingredientName);
          }
        }
      } else {
        setEditRecord((prev) => [
          ...prev,
          {
            ingredient_name: ingredientArray.ingredient_name,
            dosageToUse: ingredientArray.dosageToUse,
          },
        ]);

        setEditCount((prev) => prev + 1);
      }
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
          initialValue={record.dosageToUse}
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
