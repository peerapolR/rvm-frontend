"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUserAuth } from "@contexts/UserAuthContext";

import * as formulaApi from "@api/formula";

const FormulaContext = createContext(null);

function FormulaContextProvider({ children }) {
  const { user } = useUserAuth();

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
  const [activeIngredient, setActiveIngredient] = useState([]);
  const [ingredientDose, setIngredientDose] = useState([]);
  const [sumDose, setSumDose] = useState("");
  const [sumPrice, setSumPrice] = useState("");
  const handleFormulaChange = (e) => {
    const { name, value } = e.target;

    setNewFormula(() => ({
      ...newFormula,
      [name]: value,
    }));
  };
  const calculateSum = () => {
    const total = ingredientDose.reduce(
      (acc, item) => acc + Number(item.dosageToUse),
      0
    );

    setSumDose(isNaN(total) ? "0" : total.toString());
  };

  const calculatePrice = () => {
    const totalPrice = ingredientDose.reduce((acc, item) => {
      const price = parseFloat(item.price_min) || 0;
      const dosage = parseFloat(item.dosageToUse) || 0;
      return acc + price * dosage;
    }, 0);

    setSumPrice(isNaN(totalPrice) ? "0" : totalPrice.toFixed(2).toString());
  };

  useEffect(() => {
    calculateSum();
    calculatePrice();
  }, [ingredientDose]);

  useEffect(() => {
    setIngredientDose([...masterIngredient, ...activeIngredient]);
  }, [masterIngredient, activeIngredient]);

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

  const fetchEditFormulaById = async (_id) => {
    try {
      const res = await formulaApi.getFormulaById(_id);

      if (res.status === 200 || res.status === 201) {
        const data = res.data.data;
        console.log(data);

        setNewFormula({
          product_category: data.product_category,
          formula_name: data.formula_name,
          formula_type: data.formula_type,
          dosage_form: data.dosage_form,
          createdBy: data.createdBy,
          formula_status: data.formula_status,
        });
        setFormulation(data.formulation);
        setMasterIngredient(data.master_ingredient);
        setActiveIngredient(data.ingredient);
      }
    } catch (error) {
      console.error("Error fetching formula:", error);
    }
  };

  const saveDraftFormula = async () => {
    try {
      const res = await formulaApi.addFormula({
        formula_name: newFormula.formula_name,
        formula_type: newFormula.formula_type,
        formulation: formulation,
        dosage_form: newFormula.dosage_form,
        master_ingredient: masterIngredient,
        price: sumPrice,
        ingredient: activeIngredient,
        createdBy: user?.firstName,
        product_category: "supplement",
        formula_status: "draft",
      });
      if (res.status === 201 || res.status === 200) {
        setNewFormula(defaultFormula);
        setMasterIngredient([]);
        setActiveIngredient([]);
        setIngredientDose([]);
        setFormulation([]);
        setSumDose("");
        setSumPrice("");
        router.push("/main/formula");
        fetchFormula();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveEditDraftFormula = async (_id) => {
    try {
      const res = await formulaApi.updateFormula({
        _id: _id,
        formula_name: newFormula.formula_name,
        formula_type: newFormula.formula_type,
        formulation: formulation,
        dosage_form: newFormula.dosage_form,
        master_ingredient: masterIngredient,
        price: sumPrice,
        ingredient: activeIngredient,
        createdBy: user?.firstName,
        product_category: "supplement",
        formula_status: "draft",
      });

      if (res.status === 201 || res.status === 200) {
        setNewFormula(defaultFormula);
        setMasterIngredient([]);
        setActiveIngredient([]);
        setIngredientDose([]);
        setFormulation([]);
        setSumDose("");
        setSumPrice("");
        router.push("/main/formula");
        fetchFormula();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewFormula = async () => {
    try {
      const res = await formulaApi.addFormula({
        formula_name: newFormula.formula_name,
        formula_type: newFormula.formula_type,
        formulation: formulation,
        dosage_form: newFormula.dosage_form,
        master_ingredient: masterIngredient,
        ingredient: activeIngredient,
        price: sumPrice,
        createdBy: user?.firstName,
        product_category: "supplement",
        formula_status: "publish",
      });
      if (res.status === 201 || res.status === 200) {
        setNewFormula(defaultFormula);
        setMasterIngredient([]);
        setActiveIngredient([]);
        setIngredientDose([]);
        setFormulation([]);
        setSumDose("");
        setSumPrice("");
        fetchFormula();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePubFormula = async (_id) => {
    try {
      const res = await formulaApi.updateFormula({
        _id: _id,
        formula_name: newFormula.formula_name,
        formula_type: newFormula.formula_type,
        formulation: formulation,
        dosage_form: newFormula.dosage_form,
        master_ingredient: masterIngredient,
        ingredient: activeIngredient,
        price: sumPrice,
        createdBy: user?.firstName,
        product_category: "supplement",
        formula_status: "publish",
      });
      if (res.status === 201 || res.status === 200) {
        setNewFormula(defaultFormula);
        setMasterIngredient([]);
        setActiveIngredient([]);
        setIngredientDose([]);
        setFormulation([]);
        setSumDose("");
        setSumPrice("");
        fetchFormula();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const editFormula = async () => {
  //   try {
  //     const res = await formulaApi.updateFormula({
  //       ...newFormula,
  //       product_category: "supplement",
  //       formula_status: "publish",
  //     });

  //     if (res?.status === 201 || res?.status === 200) {
  //       setNewFormula(defaultFormula);
  //       router.push("/main/formula");
  //     } else {
  //       console.error("Unexpected response:", res);
  //     }
  //   } catch (error) {
  //     console.error("Error in editFormula:", error);
  //   }
  // };

  const publishFormula = async (_id) => {
    try {
      const res = await formulaApi.unPubFormula(_id);
      if (res.status === 200 || res.status === 201) {
        router.push("/main/formula");
        fetchFormula();
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
        fetchFormula();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [formulaToShow, setFormulaToShow] = useState(formula);

  const [formulaQuery, setFormulaQuery] = useState("");

  useEffect(() => {
    if (formula) {
      setFormulaToShow(formula);
    }
  }, [formula]);

  useEffect(() => {
    searchFormula(formulaQuery, formula);
  }, [formulaQuery]);

  const searchFormula = (name, nameList) => {
    if (!nameList || !Array.isArray(nameList)) return;

    if (!name.trim()) {
      setFormulaToShow(nameList);
      return;
    }

    const searchData = nameList.filter((item) =>
      item.formula_name.toLowerCase().includes(name.toLowerCase())
    );

    setFormulaToShow(searchData);
  };

  const value = {
    saveDraftFormula,
    addNewFormula,
    setFormulation,
    formulation,
    handleFormulaChange,
    newFormula,
    setNewFormula,
    masterIngredient,
    setMasterIngredient,
    activeIngredient,
    setActiveIngredient,
    ingredientDose,
    sumDose,
    formula,
    sumPrice,
    defaultFormula,
    setIngredientDose,
    setSumDose,
    setSumPrice,
    fetchFormulaById,
    formulaById,
    publishFormula,
    deleteFormula,
    fetchEditFormulaById,
    saveEditDraftFormula,
    updatePubFormula,
    formulaToShow,
    setFormulaToShow,
    setFormulaQuery,
    formulaQuery,
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
