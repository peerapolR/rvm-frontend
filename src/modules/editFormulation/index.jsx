import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FormulationCard from "./FormulationCard";
import SelectedBadge from "./SelectedBadge";
import FooterBar from "./footerBar";

import SkinIcon from "@icons/formulationIcon/SkinIcon";
import ProteinIcon from "@icons/formulationIcon/ProteinIcon";
import WeightIcon from "@icons/formulationIcon/WeightIcon";
import AntiIcon from "@icons/formulationIcon/AntiIcon";
import ImmuneIcon from "@icons/formulationIcon/ImmuneIcon";
import SleepIcon from "@icons/formulationIcon/SleepIcon";
import EyeIcon from "@icons/formulationIcon/EyeIcon";
import ReduceIcon from "@icons/formulationIcon//ReduceIcon";
import BoneIcon from "@icons/formulationIcon//BoneIcon";
import DetoxIcon from "@icons/formulationIcon//DetoxIcon";
import KidIcon from "@icons/formulationIcon//KidIcon";
import ProbioIcon from "@icons/formulationIcon/ProbioIcon";
import OtherIcon from "@icons/formulationIcon/OtherIcon";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FormulationList() {
  const router = useRouter();

  const newProposalctx = useNewProposalCTX();
  const { formulation, setFormulation } = newProposalctx;

  const skin = () => <SkinIcon />;
  const protein = () => <ProteinIcon />;
  const weight = () => <WeightIcon />;
  const anti = () => <AntiIcon />;
  const immune = () => <ImmuneIcon />;
  const sleep = () => <SleepIcon />;
  const eye = () => <EyeIcon />;
  const reduce = () => <ReduceIcon />;
  const bone = () => <BoneIcon />;
  const detox = () => <DetoxIcon />;
  const kid = () => <KidIcon />;
  const probio = () => <ProbioIcon />;
  const other = () => <OtherIcon />;

  const FormulationOptions = [
    { name: "Skin", icon: skin() },
    {
      name: "Protein",
      icon: protein(),
    },
    {
      name: "Weight Management",
      icon: weight(),
    },
    {
      name: "Anti-Aging",
      icon: anti(),
    },
    {
      name: "Immune",
      icon: immune(),
    },
    {
      name: "Sleep & Stress",
      icon: sleep(),
    },
    {
      name: "Eye & Brain",
      icon: eye(),
    },
    {
      name: "Reduce Swelling",
      icon: reduce(),
    },
    {
      name: "Bone & Joint",
      icon: bone(),
    },
    {
      name: "Detox",
      icon: detox(),
    },
    {
      name: "Kid Formula",
      icon: kid(),
    },
    {
      name: "Probiotic - Prebiotic - Postbiotic",
      icon: probio(),
    },
    {
      name: "Others",
      icon: other(),
    },
  ];

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex">
            <Title level={4} style={{ color: "#004D7D" }}>
              Formulation (Edit)
            </Title>
            <p className="text-revomed-primary ml-5 pt-1">
              * เลือกอย่างน้อย 1 ชนิดและสูงสุดได้ไม่เกิน 3 ชนิด
            </p>
          </div>
          <BreadCrumb />
        </div>
        <div className="grid grid-cols-3 gap-8">
          {FormulationOptions.map((o, i) => [
            <FormulationCard
              icon={o.icon}
              name={o.name}
              key={i}
              setFormulation={setFormulation}
              formulation={formulation}
            />,
          ])}
        </div>
        <div className="font-semibold flex justify-end">
          <span className="m-2">Formulation: </span>
          {formulation.map((select, idx) => [
            <SelectedBadge name={select} key={idx} />,
          ])}
        </div>
      </div>
      <FooterBar formulation={formulation} />
    </div>
  );
}
