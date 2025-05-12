"use client";
import React from "react";
import { useParams } from "next/navigation";
import Detail from "@modules/allProposal/detail";

export default function AllProposalPage() {
  const { _id } = useParams();

  return <Detail _id={_id} />;
}
