import axios from "@config/axios";

export const addFormula = (params) =>
  axios.post(`/formulas/addFormula`, params);

export const getAllFormula = () =>
  axios.get(`/formulas/listAllFormula`);


export const getFormulaByCon = (params) =>
  axios.post(`/formulas/getFormulaByCon`, params);

// export const getIngredientById = (_id) =>
//   axios.get(`/ingredients/getIngredientById/${_id}`);

// export const updateIngredient = (params) =>
//   axios.put("/ingredients/updateIngredient", params);

// export const pubIngredient = (_id) => axios.put(`/ingredients/publish/${_id}`);

// export const deleteIngredient = (_id) => axios.delete(`/ingredients/${_id}`);
