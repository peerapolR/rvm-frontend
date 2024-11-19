"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUserAuth } from "@contexts/UserAuthContext";

import * as formulaApi from "@api/formula";

const FormulaContext = createContext(null);

function FormulaContextProvider({ children }) {
  const { user } = useUserAuth();
  //   console.log(user?.firstName);

  const defaultFormula = {
    product_category: "",
    formula_name: "",
    formula_type: "",
    dosage_form: "",
    createdBy: "",
    formula_status: "draft",
  };
  const router = useRouter();
  const [formula, setFormula] = useState([]);
  const [formulaById, setFormulaById] = useState({});
  const [newFormula, setNewFormula] = useState(defaultFormula);

  const [formulation, setFormulation] = useState([]);
  const [masterIngredient, setMasterIngredient] = useState([]);
  const [ingredient, setIngredient] = useState([]);

  const handleFormulaChange = (e) => {
    const { name, value } = e.target;

    setNewFormula(() => ({
      ...newFormula,
      [name]: value,
    }));
  };

  const fetchFormula = async () => {
    try {
      const res = await formulaApi.getAllFormula();
      if (res.status === 200 || res.status === 201) {
        setFormula(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setNewFormula(defaultFormula);
    fetchFormula();
  }, []);

  const fetchFormulaById = async (_id) => {
    try {
      const res = await formulaApi.getFormulaById(_id);
      if (res.status === 200 || res.status === 201) {
        setFormulaById(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveDraftFormula = async () => {
    try {
      const res = await formulaApi.createFormula({
        ...newFormula,
        product_category: "supplement",
        formula_status: "draft",
      });
      if (res.status === 201 || res.status === 200) {
        setNewFormula(defaultFormula);
        router.push("/main/formula");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewFormula = async () => {
    try {
      const res = await formulaApi.createFormula({
        ...newFormula,
        product_category: "supplement",
        formula_status: "publish",
      });
      if (res.status === 201 || res.status === 200) {
        setNewFormula(defaultFormula);
        router.push("/main/formula");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editFormula = async () => {
    try {
      const res = await formulaApi.updateFormula({
        ...newFormula,
        product_category: "supplement",
        formula_status: "publish",
      });

      if (res?.status === 201 || res?.status === 200) {
        setNewFormula(defaultFormula);
        router.push("/main/formula");
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error in editFormula:", error);
    }
  };

  const publishFormula = async (_id) => {
    try {
      const res = await formulaApi.pubFormula(_id);
      if (res.status === 200 || res.status === 201) {
        router.push("/main/formula");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFormula = async (_id) => {
    try {
      const res = await formulaApi.deleteFormula(_id);
      if (res.status === 200 || res.status === 201) {
        router.push("/main/formula");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    setFormulation,
    formulation,
    handleFormulaChange,
    newFormula,
    setNewFormula,
    masterIngredient,
    setMasterIngredient,
  };
  return (
    <FormulaContext.Provider value={value}>{children}</FormulaContext.Provider>
  );
}

export default FormulaContextProvider;

export const useFormulaCTX = () => {
  const ctx = useContext(FormulaContext);

  if (!ctx) {
    throw new Error(
      "useFormulaCTX must be used within a FormulaContextProvider"
    );
  }

  return ctx;
};
