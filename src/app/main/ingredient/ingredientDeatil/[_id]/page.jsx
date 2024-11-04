"use client";
import React from "react";
import { useParams } from "next/navigation";
import Detail from "@modules/detail";

export default function NewIngredientPage() {
  const { _id } = useParams();

  return <Detail _id={_id} />;
}
