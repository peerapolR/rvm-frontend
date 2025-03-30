import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import FooterBar from "@components/Footer";
import { LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Form, Table } from "antd";
import FormSearch from "./formSearch";
import DosageForm from "./DosageForm";
import ModalIngredient from "./modalIngredient";
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
import "./style.scss";
import ModalDetail from "./modalDetail";

import { useFormulaCTX } from "@contexts/FormulaContext";
import { useIngredientCTX } from "@contexts/IngredientContext";
import formatPrice from "@functions/formatPrice";

import { searchIngredient } from "@functions/searchIngredient";

export default function NewFormulaList() {
  const router = useRouter();
  const ingreCtx = useIngredientCTX();
  const { ingredient, ingredientToUse } = ingreCtx;
  const ctx = useFormulaCTX();
  const {
    setFormulation,
    formulation,
    masterIngredient,
    activeIngredient,
    newFormula,
    ingredientDose,
    sumDose,
    sumPrice,
  } = ctx;

  const [path, setPath] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [detailModal, setDetailModal] = useState({});

  const [dataSource, setDataSource] = useState([]);
  const [isMaster, setIsMaster] = useState(false);
  const [form] = Form.useForm();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(ingredientToUse);
  const [selected, setSelected] = useState([]);

  const handleSearch = () => {
    try {
      const searchResults = searchIngredient(query, ingredientToUse);
      setResults(searchResults);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

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

  const itemBreadCrumb = [
    {
      title: (
        <div style={{ color: path === "newFormula" ? "#DC818D" : "#ABB1C1" }}>
          {"New Formula"}
        </div>
      ),
    },
    {
      title: (
        <div style={{ color: path === "summary" ? "#DC818D" : "#ABB1C1" }}>
          {"Summary"}
        </div>
      ),
    },
  ];

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

  useEffect(() => {
    if (!path) {
      setPath("newFormula");
    }
  }, [path]);

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      {path === "newFormula" ? (
        <>
          <div className="flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-6 items-center">
                <LeftOutlined
                  className="p-2 bg-revomed-primary-light2 text-revomed-primary cursor-pointer"
                  onClick={() => {
                    router.back();
                  }}
                />
                <Title level={4} style={{ margin: "0", color: "#004D7D" }}>
                  Formula
                </Title>
              </div>
              <Breadcrumb separator=">" items={itemBreadCrumb} />
            </div>
            <FormSearch
              setFormulation={setFormulation}
              formulation={formulation}
              form={form}
            />
            <DosageForm
              formulation={formulation}
              setFormulation={setFormulation}
              setIsOpen={setIsOpen}
              setOpenDetail={setOpenDetail}
              setDetailModal={setDetailModal}
              setIsMaster={setIsMaster}
              setDataSource={setDataSource}
              dataSource={dataSource}
            />
            <ModalIngredient
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setOpenDetail={setOpenDetail}
              setDetailModal={setDetailModal}
              isMaster={isMaster}
              query={query}
              setQuery={setQuery}
              results={results}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col p-6">
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-6 items-center">
                <Title level={4} style={{ margin: "0", color: "#004D7D" }}>
                  Summary
                </Title>
              </div>
              <Breadcrumb separator=">" items={itemBreadCrumb} />
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
                    {newFormula.formula_name}
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
                    {newFormula.formula_type} Formula
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className="font-bold text-revomed-dark-grey"
                    style={{ fontSize: "16px" }}
                  >
                    Formulation:{" "}
                  </span>
                  {formulation.map((e, i) => [
                    <span
                      className="text-revomed-black"
                      key={i}
                      style={{ fontSize: "16px" }}
                    >
                      {e}
                    </span>,
                  ])}
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
                    image={dosageIcon(newFormula.dosage_form)}
                    name={newFormula.dosage_form}
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
                    <div>{sumDose}</div>
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
                {formatPrice(sumPrice)} THB
              </div>
            </div>
          </div>
        </>
      )}
      <FooterBar
        setPath={setPath}
        path={path}
        setConfirmOpen={setConfirmOpen}
        confirmOpen={confirmOpen}
        newFormula={newFormula}
        formulation={formulation}
        ingredientDose={ingredientDose}
      />
      <ModalDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        detailModal={detailModal}
      />
    </div>
  );
}
