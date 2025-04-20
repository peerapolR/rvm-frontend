import { Modal, Input, Form, Checkbox, Row, Col } from "antd";
import SearchIcon from "@icons/SearchIcon";
import React, { useEffect, useState } from "react";
import "./style.scss";
import BaseButton from "@components/BaseButton";

import { useIngredientCTX } from "@contexts/IngredientContext";
import { useFormulaCTX } from "@contexts/FormulaContext";

export default function ModalIngredient(props) {
  const ctx = useIngredientCTX();
  const { ingredient } = ctx;

  const formulaCtx = useFormulaCTX();
  const {
    setMasterIngredient,
    setActiveIngredient,
    masterIngredient,
    activeIngredient,
  } = formulaCtx;

  const {
    isOpen,
    setIsOpen,
    setOpenDetail,
    setDetailModal,
    isMaster,
    setQuery,
    query,
    results,
    selected,
    setSelected,
  } = props;
  const [form] = Form.useForm();

  // const handleCheckIngredient = (checkedValues) => {
  //   setSelected((prevSelected) => {
  //     const newSelected = [...prevSelected, ...checkedValues].filter(
  //       (value, index, self) => self.indexOf(value) === index
  //     );
  //     return newSelected;
  //   });
  // };

  // const handleAllIngredient = () => {
  //   const data = form.getFieldValue();

  //   const mappingData = ingredient.reduce((acc, e) => {
  //     if (!acc[e.ingredient_name]) {
  //       acc[e.ingredient_name] = e;
  //     }
  //     return acc;
  //   }, {});

  //   const result = data?.masterIngredient?.map((e) => {
  //     if (mappingData[e]) {
  //       return {
  //         ...mappingData[e],
  //         isMaster: isMaster,
  //       };
  //     }
  //   });
  //   if (isMaster) {
  //     const combinedArray = [...activeIngredient, ...result];

  //     const mergedArray = combinedArray.filter(
  //       (item, index, self) =>
  //         self.filter((obj) => obj.ingredient_name === item.ingredient_name)
  //           .length === 1
  //     );
  //     setMasterIngredient(mergedArray);
  //   } else {
  //     const combinedArray = [...masterIngredient, ...result];

  //     const mergedArray = combinedArray.filter(
  //       (item, index, self) =>
  //         self.filter((obj) => obj.ingredient_name === item.ingredient_name)
  //           .length === 1
  //     );

  //     setActiveIngredient(mergedArray);
  //   }

  //   setIsOpen(false);
  // };

  const handleSelectIngredient = (detail) => {
    const result = {
      ...detail,
      isMaster: isMaster,
    };
    if (isMaster) {
      const combinedArray = [
        ...masterIngredient,
        ...(Array.isArray(result) ? result : [result]),
      ];

      const mergedArray = combinedArray.filter(
        (item, index, self) =>
          self.filter((obj) => obj.ingredient_name === item.ingredient_name)
            .length === 1
      );
      setMasterIngredient(mergedArray);
    } else {
      const combinedArray = [
        ...activeIngredient,
        ...(Array.isArray(result) ? result : [result]),
      ];
      const mergedArray = combinedArray.filter(
        (item, index, self) =>
          self.filter((obj) => obj.ingredient_name === item.ingredient_name)
            .length === 1
      );
      setActiveIngredient(mergedArray);
    }
    setQuery("");
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelected([]);
    setIsOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue({ masterIngredient: selected });
  }, [isOpen]);

  return (
    <Modal open={isOpen} width={800} closeIcon={false} footer={false}>
      <div className="flex items-center justify-between px-6 pb-6 bg-#E7ECF2 border-b border-revomed-light-grey2">
        <div className="text-xl font-bold text-revomed-primary">
          Add Ingredient
        </div>
        <Input
          style={{ fontSize: "16px" }}
          className="w-[320px] h-[48px]"
          placeholder="Ingredient Name..."
          prefix={<SearchIcon style={{ color: "#ABB1C1" }} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Form form={form}>
        <Form.Item name="masterIngredient">
          {/* <Checkbox.Group
            style={{ width: "100%" }}
            className="flex flex-col"
            value={selected}
            onChange={handleCheckIngredient}
          > */}
          <div className="max-h-[600px] overflow-y-auto">
            {results.map((e, i) => {
              return (
                <RowInModal
                  key={i}
                  value={e.ingredient_name}
                  label={e.ingredient_name}
                  detail={e}
                  setOpenDetail={setOpenDetail}
                  setDetailModal={setDetailModal}
                  handleSelectIngredient={handleSelectIngredient}
                />
              );
            })}
          </div>
          {/* </Checkbox.Group> */}
        </Form.Item>
      </Form>
      <div className="flex items-center px-6 pt-6 justify-end bg-revomed-light-grey4 border-t border-revomed-light-grey2">
        {/* <div className="text-revomed-primary" style={{ fontSize: "16px" }}>
          {selected?.masterIngredient?.length} Selected
        </div> */}
        <div className="flex gap-4">
          <BaseButton
            type="button"
            className="border border-revomed-secondary rounded-lg px-3 py-4 text-revomed-secondary h-12 w-[162px]"
            onClick={handleCancel}
          >
            Cancel
          </BaseButton>
          {/* <BaseButton
            className="rounded-lg px-3 py-4 text-white h-12 w-[162px] bg-revomed-secondary"
            type="button"
            onClick={handleAllIngredient}
          >
            Add
          </BaseButton> */}
        </div>
      </div>
    </Modal>
  );
}

export const RowInModal = (props) => {
  const {
    selected,
    value,
    label,
    detail,
    setOpenDetail,
    setDetailModal,
    handleSelectIngredient,
  } = props;
  const openDetail = () => {
    setDetailModal(detail);
    setOpenDetail(true);
  };
  return (
    <Row className="py-4 px-6 items-center">
      {/* <Col span={4} className="flex items-center justify-center">
        <Checkbox
          style={{ lineHeight: "32px", width: "24px", height: "24px" }}
          value={value}
        />
      </Col> */}
      <Col span={16} style={{ fontSize: "16px", color: "#717171" }}>
        {label}
      </Col>
      <Col span={4} className="text-center">
        <span
          className="underline text-revomed-primary-light1 cursor-pointer"
          onClick={openDetail}
        >
          Detail
        </span>
      </Col>
      <Col span={4} className="text-center">
        <BaseButton
          className="rounded-lg px-3 py-4 text-white w-24 bg-revomed-primary"
          onClick={() => handleSelectIngredient(detail)}
        >
          Select
        </BaseButton>
      </Col>
    </Row>
  );
};
