import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import { Form, Table } from "antd";
import DosageCard from "@components/DosageCard";
import capSule from "@public/assets/images/capsule.png";
import tablet from "@public/assets/images/tablet.png";
import softgel from "@public/assets/images/softgel.png";
import powder from "@public/assets/images/powder.png";
import oralPowder from "@public/assets/images/oralPowder.png";
import jelly from "@public/assets/images/jelly.png";
import gummie from "@public/assets/images/gummie.png";
import effervescent from "@public/assets/images/effervescent.png";
import chewable from "@public/assets/images/chewable.png";
import coffeeAndTea from "@public/assets/images/coffeeAndTea.png";
import LockIcon from "@icons/LockIcon";
import ModalDetail from "./modalDetail";

import FooterBar from "./footerBar";

import { useFormulaCTX } from "@contexts/FormulaContext";
import formatPrice from "@functions/formatPrice";
import formatUnit from "@functions/formatUnit";

export default function FormulaDetail({ _id }) {
  const ctx = useFormulaCTX();
  const {
    ingredientDose,
    sumDose,
    fetchFormulaById,
    formulaById: formula,
    setIngredientDose,
  } = ctx;

  const [openDetail, setOpenDetail] = useState(false);
  const [detailModal, setDetailModal] = useState({});

  useEffect(() => {
    fetchFormulaById(_id);
  }, []);

  useEffect(() => {
    if (formula) {
      const masterIngredient = Array.isArray(formula.master_ingredient)
        ? formula.master_ingredient
        : [];
      const ingredient = Array.isArray(formula.ingredient)
        ? formula.ingredient
        : [];

      setIngredientDose([...masterIngredient, ...ingredient]);
    }
  }, [formula]);
  const dosageIcon = (name) => {
    switch (name) {
      case "Capsule":
        return capSule;
      case "Tablet":
        return tablet;
      case "Softgel":
        return softgel;
      case "Powder":
        return powder;
      case "Oral Dissolving":
        return oralPowder;
      case "Jelly":
        return jelly;
      case "Gummie":
        return gummie;
      case "Effervescent":
        return effervescent;
      case "Chewable":
        return chewable;
      case "Coffee & Tea":
        return coffeeAndTea;
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
          </div>
        );
      },
    },
  ];

  const handleDetail = (record) => {
    setDetailModal(record);
    setOpenDetail(true);
  };

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <>
        <div className="flex flex-col p-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-6 items-center">
              <Title level={4} style={{ margin: "0", color: "#004D7D" }}>
                Formula Detail
              </Title>
            </div>
          </div>
          <div className="flex gap-6">
            {/* left-Column */}
            <div className="bg-revomed-white p-6 flex flex-col gap-[16px] w-[350px] min-h-[480px] border border-revomed-light-grey3 rounded-2xl">
              <div className="flex gap-[16px]">
                <span
                  className="font-bold text-revomed-dark-grey"
                  style={{ fontSize: "16px" }}
                >
                  Formula Name:{" "}
                </span>
                <span
                  className="text-revomed-black"
                  style={{ fontSize: "16px" }}
                >
                  {formula.formula_name}
                </span>
              </div>
              <div className="flex gap-[16px]">
                <span
                  className="font-bold text-revomed-dark-grey"
                  style={{ fontSize: "16px" }}
                >
                  Formula Type:{" "}
                </span>
                <span
                  className="text-revomed-black capitalize"
                  style={{ fontSize: "16px" }}
                >
                  {formula.formula_type} Formula
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className="font-bold text-revomed-dark-grey"
                  style={{ fontSize: "16px" }}
                >
                  Formulation:{" "}
                </span>
                {(formula && formula?.length > 0) ||
                  (formula?.formulation &&
                    Array.isArray(formula.formulation) &&
                    formula.formulation.map((e, i) => [
                      <span
                        className="text-revomed-black"
                        key={i}
                        style={{ fontSize: "16px" }}
                      >
                        {e}
                      </span>,
                    ]))}
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="font-bold text-revomed-dark-grey"
                  style={{ fontSize: "16px" }}
                >
                  Dosage Form:{" "}
                </span>
                <DosageCard
                  key={1}
                  image={dosageIcon(formula.dosage_form)}
                  name={formula.dosage_form}
                  showOnly={true}
                />
              </div>
            </div>
            {/* right-Column */}
            <div className="flex flex-col w-[790px] min-h-[405px] relative">
              <Table
                className="bg-revomed-white rounded-t-2xl min-h-[405px]"
                columns={column}
                dataSource={ingredientDose}
                pagination={false}
                rowClassName={"rowBackground"}
                rowKey="id"
              />
              <div className="flex items-end justify-end bg-revomed-white p-6 border rounded-b-2xl w-full">
                <div
                  className="flex gap-4 items-center text-revomed-primary"
                  style={{ fontSize: "16px" }}
                >
                  <div className="font-bold">{"Total Active (mg)"}</div>
                  <div>{formatUnit(sumDose)}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex gap-[16px] font-bold mt-6"
            style={{ fontSize: "16px" }}
          >
            <div className="text-revomed-dark-grey">Total price:</div>
            <div className="text-revomed-primary">
              {formatPrice(formula.price)} THB
            </div>
          </div>
        </div>
      </>
      <FooterBar _id={_id} />
      <ModalDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        detailModal={detailModal}
      />
    </div>
  );
}
