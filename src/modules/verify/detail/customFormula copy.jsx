import React, { useState, useEffect } from "react";
import { Dropdown, Table, Form, Input } from "antd";

import formatPrice from "@functions/formatPrice";

import LockIcon from "@icons/LockIcon";
// import BinIcon from "@icons/BinIcon";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function CustomFormula(props) {
  const {
    orderDetail,
    setDetailModal,
    setOpenDetail,
    dataSource,
    setDataSource,
    setIsChange,
    price,
    setPrice,
    dataToChange,
    setDataToChange,
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
  const [form] = Form.useForm();

  const handleDetail = (record) => {
    setDetailModal(record);
    setOpenDetail(true);
  };

  useEffect(() => {
    const parsed = parseFloat(orderDetail?.prePrice);
    setPrice(isNaN(parsed) ? 0 : parsed);
    if (
      orderDetail?.master_ingredient &&
      Array.isArray(orderDetail.master_ingredient)
    ) {
      setCustomMasterIngredient(orderDetail.master_ingredient);
      setMasterIngredient(orderDetail.master_ingredient);
    }

    if (orderDetail?.ingredient && Array.isArray(orderDetail.ingredient)) {
      setCustomIngredient(orderDetail.ingredient);
      setActiveIngredient(orderDetail.ingredient);
    }
    console.log(orderDetail);
  }, [orderDetail]);

  useEffect(() => {
    if (Array.isArray(masterIngredient) && Array.isArray(activeIngredient)) {
      const mergedArray = [...masterIngredient, ...activeIngredient].filter(
        (item, index, self) =>
          index ===
          self.findIndex((obj) => obj.ingredient_name === item.ingredient_name)
      );
      setDataSource(mergedArray);
      const cal = calculatePrice(masterIngredient, activeIngredient);
      setPrice(cal);
      //   callOverAll(cal);
    }
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

  const calculatePrice = (master, ing) => {
    const editIngredient = [...master, ...ing];
    const totalPrice = editIngredient.reduce((acc, item) => {
      const price = parseFloat(item.price_min.trim()) || 0;
      const dosage = parseFloat(item.dosageToUse) || 0;
      return acc + price * dosage;
    }, 0);

    const dp = parseFloat(dosagePrice(orderDetail.dosage_form));
    const sum = totalPrice + dp;

    return isNaN(totalPrice) ? "0" : sum;
  };

  //   const callOverAll = (cal) => {
  //     const mo1 = orderDetail.moq1;
  //     const mo2 = orderDetail.moq2;
  //     const mo3 = orderDetail.moq3;

  //     const prePrice = cal;
  //     console.log(mo1);

  //     // setDataToChange(()=>({
  //     // ...dataToChange,
  //     // master_ingredient: "",
  //     // ingredient: "",
  //     // price1: "",
  //     // price2: "",
  //     // price3: "",
  //     // }))
  //   };

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
            {/* <div
              className="ml-10 cursor-pointer"
              onClick={() => handleDelete(record)}
            >
              <BinIcon className="text-revomed-primary" />
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

  const sumDose = () => {
    const total = dataSource.reduce(
      (acc, item) => acc + Number(item.dosageToUse),
      0
    );

    return isNaN(total) ? "0" : total.toString();
  };

  return (
    <>
      <div>
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
                  <EdiTableCell {...props} setIsChange={setIsChange} />
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
    </>
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
    data,
    setIsChange,
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
      setIsChange(true);
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
      setIsChange(true);
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
