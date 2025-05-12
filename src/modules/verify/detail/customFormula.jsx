import React, { useState, useEffect, useRef } from "react";
import { Table, Form, Input } from "antd";
import formatPrice from "@functions/formatPrice";
import LockIcon from "@icons/LockIcon";
import { useFormulaCTX } from "@contexts/FormulaContext";

export default function CustomFormula(props) {
  const {
    orderDetail,
    setDetailModal,
    setOpenDetail,
    setDataSource,
    setIsChange,
    price,
    setPrice,
    dataSource,
  } = props;

  const ctx = useFormulaCTX();
  const {
    masterIngredient,
    activeIngredient,
    setMasterIngredient,
    setActiveIngredient,
    setCustomMasterIngredient,
    setCustomIngredient,
    dosagePrice,
  } = ctx;

  const [form] = Form.useForm();

  const handleDetail = (record) => {
    setDetailModal(record);
    setOpenDetail(true);
  };

  const calculatePrice = (master, ing) => {
    const editIngredient = [...master, ...ing];
    const totalPrice = editIngredient.reduce((acc, item) => {
      const price = parseFloat(item.price_min?.trim()) || 0;
      const dosage = parseFloat(item.dosageToUse) || 0;
      return acc + price * dosage;
    }, 0);

    const dp = parseFloat(dosagePrice(orderDetail.dosage_form));
    const sum = totalPrice + dp;
    return isNaN(totalPrice) ? 0 : sum;
  };

  useEffect(() => {
    const parsed = parseFloat(orderDetail?.prePrice);
    setPrice(isNaN(parsed) ? 0 : parsed);
    if (Array.isArray(orderDetail?.master_ingredient)) {
      setCustomMasterIngredient(orderDetail.master_ingredient);
      setMasterIngredient(orderDetail.master_ingredient);
    }
    if (Array.isArray(orderDetail?.ingredient)) {
      setCustomIngredient(orderDetail.ingredient);
      setActiveIngredient(orderDetail.ingredient);
    }
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
    }
  }, [masterIngredient, activeIngredient]);

  useEffect(() => {
    if (dataSource.length > 0) {
      const fields = {};
      dataSource.forEach((item) => {
        fields[item._id] = { dosageToUse: item.dosageToUse };
      });
      form.setFieldsValue(fields);
    }
  }, [dataSource]);

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row._id === item._id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);

    const updateList = row.isMaster ? masterIngredient : activeIngredient;
    const updateFn = row.isMaster ? setMasterIngredient : setActiveIngredient;

    updateFn(
      updateList.map((item) =>
        item.ingredient_name === row.ingredient_name
          ? { ...item, dosageToUse: row.dosageToUse }
          : item
      )
    );
    setIsChange(true);
  };

  const column = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (record) => <div>{record.isMaster ? <LockIcon /> : ""}</div>,
    },
    {
      title: "No.",
      render: (text, record, index) => <div>{index + 1}</div>,
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
      render: (text, record) => (
        <div className="flex">
          <div
            className="underline text-revomed-primary-light1 cursor-pointer"
            onClick={() => handleDetail(record)}
          >
            Detail
          </div>
        </div>
      ),
    },
  ];

  const columnForEdit = column.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
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
      <Form form={form} component={false}>
        <Table
          columns={columnForEdit}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
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
              Total Active (mg)
            </div>
            <div>{sumDose()}</div>
          </div>
        </div>
      </Form>
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

const EdiTableCell = ({
  editable,
  children,
  dataIndex,
  record,
  title,
  handleSave,
  ...restProps
}) => {
  const inputRef = useRef(null);
  const form = Form.useFormInstance();

  const save = async () => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values[record._id] });
    } catch (errInfo) {
      console.error("Save failed:", errInfo);
    }
  };

  if (!editable) {
    return <td {...restProps}>{children}</td>;
  }

  return (
    <td {...restProps}>
      <Form.Item
        name={[record._id, dataIndex]}
        style={{ margin: 0 }}
        // rules={[
        //   {
        //     validator: async (_, value) => {
        //       if (value < record.dose_min || value > record.dose_max) {
        //         return Promise.reject(
        //           new Error(
        //             `Value must be between ${record.dose_min} and ${record.dose_max}`
        //           )
        //         );
        //       }
        //       return Promise.resolve();
        //     },
        //   },
        // ]}
      >
        <Input
          ref={inputRef}
          type="number"
          style={{ width: "160px", height: "40px" }}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    </td>
  );
};
