"use client";
import React from "react";
import { useParams } from "next/navigation";
import FormulaDetail from "@modules/formula/formulaDetail/index";

export default function FormulaDetailPage() {
  const { _id } = useParams();
  return <FormulaDetail _id={_id} />;
}
