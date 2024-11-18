import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import FooterBar from "@components/Footer";
import { LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Form, Table } from "antd";
import FormSearch from "./formSearch";
import DosageForm from "./DosageForm";
import ModalIngredient from "./modalIngredient";
import DosageCard from "@components/DosageCard";
import capSule from "@public/assets/images/capsule.png";
import LockIcon from "@icons/LockIcon";
import "./style.scss";
import ModalDetail from "./modalDetail";

export default function NewFormulaList() {
  const [path, setPath] = useState("");
  const [formulation, setFormulation] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [form] = Form.useForm();

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
      key: "icon",
      render: () => {
        return (
          <div>
            <LockIcon />
          </div>
        );
      },
    },
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Active Ingredients",
      dataIndex: "ingredients",
      key: "ingredients",
    },
    {
      title: "Dosage (mg)",
      dataIndex: "dosage",
      key: "dosage",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (text, record) => {
        return (
          <div
            className="underline text-revomed-primary-light1"
            onClick={() => handleDetail(record)}
          >
            Detail
          </div>
        );
      },
    },
  ];

  const dataSource = [
    {
      id: 1,
      ingredients: "Bioenergy RiaGev",
      dosage: "20.00",
    },
    {
      id: 2,
      ingredients: "Grape Skin Extract - Resveratrol 98%",
      dosage: "20.00",
    },
    {
      id: 3,
      ingredients: "Pycnogenol - French Maritime Pine Bark Extract",
      dosage: "15.00",
    },
  ];

  const handleDetail = (record) => {
    setOpenDetail(true);
  };

  useEffect(()=>{
    setPath("newFormula")
  },[path])

  return (
    <div className="relative" style={{ minHeight: "calc(100vh - 72px)" }}>
      {path === "newFormula" ? (
        <>
          <div className="flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-6 items-center">
                <LeftOutlined className="p-2 bg-revomed-primary-light2 text-revomed-primary" />
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
            />
            <ModalIngredient isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <FooterBar setPath={setPath} path={path} />
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
                    Anti-Aging
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
                    className="text-revomed-black"
                    style={{ fontSize: "16px" }}
                  >
                    Prototype Formula
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className="font-bold text-revomed-dark-grey"
                    style={{ fontSize: "16px" }}
                  >
                    Formulation:{" "}
                  </span>
                  <span
                    className="text-revomed-black"
                    style={{ fontSize: "16px" }}
                  >
                    Protein, Probiotic - Prebiotic - Postbiotic, Eye & Brain
                  </span>
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
                    image={capSule}
                    name={"Capsule"}
                    showOnly={true}
                  />
                </div>
              </div>
              {/* right-Column */}
              <div className="flex flex-col w-[790px] min-h-[405px] relative">
                <Table
                  className="bg-revomed-white rounded-t-2xl min-h-[405px]"
                  columns={column}
                  dataSource={dataSource}
                  pagination={false}
                  rowClassName={"rowBackground"}
                  rowKey="id"
                />
                <div className="flex items-end justify-end bg-revomed-white p-6 border rounded-b-2xl absolute bottom-0 w-full">
                  <div
                    className="flex gap-4 items-center text-revomed-primary"
                    style={{ fontSize: "16px" }}
                  >
                    <div className="font-bold">{"Total Active (mg)"}</div>
                    <div>65.50</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex gap-[16px] font-bold mt-6"
              style={{ fontSize: "16px" }}
            >
              <div className="text-revomed-dark-grey">Total price:</div>
              <div className="text-revomed-primary">30.00 THB</div>
            </div>
          </div>
          <FooterBar setPath={setPath} path={path} />
        </>
      )}
      <ModalDetail openDetail={openDetail} setOpenDetail={setOpenDetail} />
    </div>
  );
}
