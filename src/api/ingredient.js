import axios from "@config/axios";

export const getAllIngredient = () =>
  axios.get(`/ingredients/listAllIngredient`);

export const createIngredient = (params) =>
  axios.post("/ingredients/addIngredient", params);

export const getIngredientById = (_id) =>
  axios.get(`/ingredients/getIngredientById/${_id}`);

export const updateIngredient = (params) =>
  axios.put("/ingredients/updateIngredient", params);

export const pubIngredient = (_id) => axios.put(`/ingredients/publish/${_id}`);

export const deleteIngredient = (_id) => axios.delete(`/ingredients/${_id}`);
