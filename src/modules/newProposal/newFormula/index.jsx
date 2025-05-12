import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import FooterBar from "./footerBar";
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
import { useNewProposalCTX } from "@contexts/NewProposalContext";
import formatPrice from "@functions/formatPrice";

import { searchIngredient } from "@functions/searchIngredient";

export default function NewFormulaList() {
  const router = useRouter();
  const ingreCtx = useIngredientCTX();
  const { ingredient, ingredientToUse } = ingreCtx;
  const ctx = useFormulaCTX();
  const {
    setFormulation,
    masterIngredient,
    activeIngredient,
    newFormula,
    ingredientDose,
    sumDose,
    sumPrice,
  } = ctx;

  const newProposalctx = useNewProposalCTX();
  const {
    formulation,
    setNewProposal,
    newProposal,
    fetchFormulaByCon,
    setIsSaleCustom,
  } = newProposalctx;

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

  const [readyToNext, setReadyToNext] = useState(true);

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

  useEffect(() => {
    setIsSaleCustom(true);
  }, []);

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
      <>
        <div className="flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
            <Title level={4} style={{ margin: "0", color: "#004D7D" }}>
              New Formula
            </Title>
          </div>
          <FormSearch
            setFormulation={setFormulation}
            formulation={formulation}
            form={form}
          />
          <div className="flex justify-between mb-5">
            <div className="font-semibold flex justify-end">
              <span className="m-2 text-revomed-dark-grey">Formulation: </span>
              {formulation.map((formu, i) => [
                <div
                  className="h-[40px] bg-revomed-secondary-light3 text-revomed-secondary rounded-lg flex items-center px-5 font-normal mr-3"
                  key={i}
                >
                  {formu}
                </div>,
              ])}
            </div>
            <div className="font-semibold flex justify-end">
              <span className="m-2 text-revomed-dark-grey">Dosage Form: </span>
              <div className="h-[40px] bg-revomed-secondary-light3 text-revomed-secondary rounded-lg flex items-center px-5 font-normal mr-3">
                {newProposal.dosage_form}
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
          <DosageForm
            formulation={formulation}
            setFormulation={setFormulation}
            setIsOpen={setIsOpen}
            setOpenDetail={setOpenDetail}
            setDetailModal={setDetailModal}
            setIsMaster={setIsMaster}
            setDataSource={setDataSource}
            dataSource={dataSource}
            dosage_form={newProposal.dosage_form}
            setReadyToNext={setReadyToNext}
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
      <FooterBar readyToNext={readyToNext} />
      <ModalDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        detailModal={detailModal}
      />
    </div>
  );
}
