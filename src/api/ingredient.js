import axios from "@config/axios";

export const getAllIngredient = () =>
  axios.get(`/ingredients/listAllIngredient`);

export const createIngredient = (input) =>
  axios.post("/ingredients/addIngredient", input);

export const getIngredientById = (_id) =>
  axios.get(`/ingredients/getIngredientById/${_id}`);
