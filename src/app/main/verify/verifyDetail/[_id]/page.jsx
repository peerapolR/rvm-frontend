"use client";
import React from "react";
import { useParams } from "next/navigation";
import Detail from "@modules/verify/detail";

export default function VerifyProposalPage() {
  const { _id } = useParams();

  return <Detail _id={_id} />;
}
