"use client";
import React from "react";
import { useParams } from "next/navigation";
import Detail from "@modules/myProposal/detail";

export default function MyProposalDetailPage() {
  const { _id } = useParams();

  return <Detail _id={_id} />;
}
