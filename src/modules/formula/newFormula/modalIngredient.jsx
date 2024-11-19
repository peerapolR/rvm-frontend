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
  const { setMasterIngredient, setIngredient } = formulaCtx;

  const { isOpen, setIsOpen } = props;
  const [form] = Form.useForm();
  const [selected, setSelected] = useState([]);

  const handleCheckIngredient = () => {
    const data = form.getFieldValue();

    setSelected(data);
  };

  const handleAllIngredient = () => {
    const data = form.getFieldValue();

    const mappingData = ingredient.reduce((acc, e) => {
      if (!acc[e.ingredient_name]) {
        acc[e.ingredient_name] = e;
      }
      return acc;
    }, {});

    const result = data?.masterIngredient?.map((e) => {
      if (mappingData[e]) {
        return {
          ...mappingData[e],
        };
      }
    });

    setMasterIngredient(result);
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
          // onChange={}
        />
      </div>
      <Form form={form}>
        <Form.Item name="masterIngredient">
          <Checkbox.Group
            style={{ width: "100%" }}
            className="flex flex-col"
            onChange={handleCheckIngredient}
          >
            {ingredient.map((e, i) => {
              return (
                <RowInModal
                  key={i}
                  value={e.ingredient_name}
                  label={e.ingredient_name}
                  detail={e}
                />
              );
            })}
          </Checkbox.Group>
        </Form.Item>
      </Form>
      <div className="flex items-center px-6 pt-6 justify-between bg-revomed-light-grey4 border-t border-revomed-light-grey2">
        <div className="text-revomed-primary" style={{ fontSize: "16px" }}>
          {selected?.masterIngredient?.length} Selected
        </div>
        <div className="flex gap-4">
          <BaseButton
            type="button"
            className="border border-revomed-secondary rounded-lg px-3 py-4 text-revomed-secondary h-12 w-[162px]"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </BaseButton>
          <BaseButton
            className="rounded-lg px-3 py-4 text-white h-12 w-[162px] bg-revomed-secondary"
            type="button"
            onClick={handleAllIngredient}
          >
            Add
          </BaseButton>
        </div>
      </div>
    </Modal>
  );
}

export const RowInModal = (props) => {
  const { selected, value, label, detail } = props;
  return (
    <Row className="py-4 px-6 items-center">
      <Col span={4} className="flex items-center justify-center">
        <Checkbox
          style={{ lineHeight: "32px", width: "24px", height: "24px" }}
          value={value}
        />
      </Col>
      <Col span={16} style={{ fontSize: "16px", color: "#717171" }}>
        {label}
      </Col>

      <Col span={4} className="text-center">
        <span className="underline text-revomed-primary-light1">Detail</span>
      </Col>
    </Row>
  );
};
