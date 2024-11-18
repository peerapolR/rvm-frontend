"use client";
import React from "react";
import { useParams } from "next/navigation";
import Edit from "@modules/ingredient/edit";

export default function MyProposalEditPage() {
  const { _id } = useParams();

  return <Edit _id={_id} />;
}
