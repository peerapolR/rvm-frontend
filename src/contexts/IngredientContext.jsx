"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

import * as ingredientApi from "@api/ingredient";

const IngredientContext = createContext(null);

function IngredientContextProvider({ children }) {
  const defaultIngredient = {
    product_category: "",
    ingredient_name: "",
    dose_min: "",
    dose_max: "",
    dose_clinical: "",
    leadTime: "30",
    price_min: "",
    price_max: "",
    chemical_comp: "",
    cert: "",
    health_benefits: "",
    ex_health_benefits: "",
    formulation: [],
    incomp_Ingredient: [],
    ingredient_image: "",
    createdBy: "Admin",
    ingredient_status: "",
  };
  const router = useRouter();
  const [ingredient, setIngredient] = useState([]);
  const [ingredientById, setIngredientById] = useState({});
  const [newIngredient, setNewIngredient] = useState(defaultIngredient);

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;

    setNewIngredient(() => ({
      ...newIngredient,
      [name]: value,
    }));
  };

  const fetchIngredient = async () => {
    try {
      const res = await ingredientApi.getAllIngredient();
      if (res.status === 200 || res.status === 201) {
        setIngredient(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setNewIngredient(defaultIngredient);
    fetchIngredient();
  }, []);

  const fetchIngredientById = async (_id) => {
    try {
      const res = await ingredientApi.getIngredientById(_id);
      if (res.status === 200 || res.status === 201) {
        setIngredientById(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveDraftIngredient = async () => {
    try {
      const res = await ingredientApi.createIngredient({
        ...newIngredient,
        product_category: "supplement",
        ingredient_status: "draft",
      });
      if (res.status === 201 || res.status === 200) {
        setNewIngredient(defaultIngredient);
        router.push("/main/ingredient");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewIngredient = async () => {
    try {
      const res = await ingredientApi.createIngredient({
        ...newIngredient,
        product_category: "supplement",
        ingredient_status: "publish",
      });
      if (res.status === 201 || res.status === 200) {
        setNewIngredient(defaultIngredient);
        router.push("/main/ingredient");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editIngredient = async () => {
    try {
      const res = await ingredientApi.updateIngredient({
        ...newIngredient,
        product_category: "supplement",
        ingredient_status: "publish",
      });

      if (res?.status === 201 || res?.status === 200) {
        setNewIngredient(defaultIngredient);
        router.push("/main/ingredient");
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error in editIngredient:", error);
    }
  };

  const publishIngredient = async (_id) => {
    try {
      const res = await ingredientApi.pubIngredient(_id);
      if (res.status === 200 || res.status === 201) {
        router.push("/main/ingredient");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIngredient = async (_id) => {
    try {
      const res = await ingredientApi.deleteIngredient(_id);
      if (res.status === 200 || res.status === 201) {
        router.push("/main/ingredient");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    ingredient,
    setIngredient,
    newIngredient,
    setNewIngredient,
    handleIngredientChange,
    saveDraftIngredient,
    addNewIngredient,
    fetchIngredient,
    fetchIngredientById,
    ingredientById,
    editIngredient,
    publishIngredient,
    deleteIngredient,
  };
  return (
    <IngredientContext.Provider value={value}>
      {children}
    </IngredientContext.Provider>
  );
}

export default IngredientContextProvider;

export const useIngredientCTX = () => {
  const ctx = useContext(IngredientContext);

  if (!ctx) {
    throw new Error(
      "useIngredientCTX must be used within a IngredientContextProvider"
    );
  }

  return ctx;
};
