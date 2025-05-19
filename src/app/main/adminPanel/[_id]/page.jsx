"use client";
import AdminInformation from "@modules/adminPanel/adminInformation";
import React from "react";
import { useParams } from "next/navigation";
AdminInformation;

export default function AdminInformationPage() {
  const { _id } = useParams();

  return <AdminInformation _id={_id} />;
}
