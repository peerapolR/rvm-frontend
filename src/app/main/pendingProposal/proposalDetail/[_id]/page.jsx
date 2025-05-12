"use client";
import React from "react";
import { useParams } from "next/navigation";
import Detail from "@modules/pendingProposal/detail";

export default function PendingProposalPage() {
  const { _id } = useParams();

  return <Detail _id={_id} />;
}
