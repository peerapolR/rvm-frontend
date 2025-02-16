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
  const [ingredientToUse, setIngredientToUse] = useState([]);
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

  const fetchIngredientToUse = async () => {
    try {
      const res = await ingredientApi.getIngredientToUse();
      if (res.status === 200 || res.status === 201) {
        setIngredientToUse(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setNewIngredient(defaultIngredient);
    fetchIngredient();
    fetchIngredientToUse();
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
      // Assuming 'img' is the File object
      const params = {
        ...Object.fromEntries(
          Object.entries(newIngredient).map(([key, value]) => [
            key,
            value ?? " ",
          ])
        ),
        product_category: "supplement",
        ingredient_status: "draft",
      };

      // Prepare the form data
      const formData = new FormData();

      // Add form fields (including the image file)
      Object.keys(params).forEach((key) => {
        if (Array.isArray(params[key])) {
          // If the value is an array, append each item with the same key
          params[key].forEach((item) => {
            formData.append(key, item); // Append each array item individually
          });
        } else {
          formData.append(key, params[key]); // If it's not an array, append the value directly
        }
      });

      const res = await ingredientApi.createIngredient(formData);
      if (res.status === 201 || res.status === 200) {
        setNewIngredient(defaultIngredient);
        router.push("/main/ingredient");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editDraftIngredient = async () => {
    try {
      // Assuming 'img' is the File object
      const params = {
        ...newIngredient,
        product_category: "supplement",
        ingredient_status: "draft",
      };

      // Prepare the form data
      const formData = new FormData();

      // Add form fields (including the image file)
      Object.keys(params).forEach((key) => {
        if (Array.isArray(params[key])) {
          // If the value is an array, append each item with the same key
          params[key].forEach((item) => {
            formData.append(key, item); // Append each array item individually
          });
        } else {
          formData.append(key, params[key]); // If it's not an array, append the value directly
        }
      });

      const res = await ingredientApi.updateIngredient(formData);
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
      // Assuming 'img' is the File object
      const params = {
        ...newIngredient,
        product_category: "supplement",
        ingredient_status: "publish",
      };

      // Prepare the form data
      const formData = new FormData();

      // Add form fields (including the image file)
      Object.keys(params).forEach((key) => {
        if (Array.isArray(params[key])) {
          // If the value is an array, append each item with the same key
          params[key].forEach((item) => {
            formData.append(key, item); // Append each array item individually
          });
        } else {
          formData.append(key, params[key]); // If it's not an array, append the value directly
        }
      });

      // Send the request to the backend
      const res = await ingredientApi.createIngredient(formData);
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
      // Assuming 'img' is the File object
      const params = {
        ...newIngredient,
        product_category: "supplement",
        ingredient_status: "publish",
      };

      // Prepare the form data
      const formData = new FormData();

      // Add form fields (including the image file)
      Object.keys(params).forEach((key) => {
        if (Array.isArray(params[key])) {
          // If the value is an array, append each item with the same key
          params[key].forEach((item) => {
            formData.append(key, item); // Append each array item individually
          });
        } else {
          formData.append(key, params[key]); // If it's not an array, append the value directly
        }
      });

      const res = await ingredientApi.updateIngredient(formData);

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
    ingredientToUse,
    setIngredientToUse,
    fetchIngredientToUse,
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
    editDraftIngredient,
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
