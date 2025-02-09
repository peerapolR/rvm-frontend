"use client";
import React from "react";
import { useParams } from "next/navigation";
import EditFormula from "@modules/formula/editFormula/index";

export default function EditFormulaPage() {
  const { _id } = useParams();
  return <EditFormula _id={_id} />;
}
