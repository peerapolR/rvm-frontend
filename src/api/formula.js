import axios from "@config/axios";

export const addFormula = (params) =>
  axios.post(`/formulas/addFormula`, params);

export const getAllFormula = () => axios.get(`/formulas/listAllFormula`);

export const getFormulaByCon = (params) =>
  axios.post(`/formulas/getFormulaByCon`, params);

export const getFormulaById = (_id) =>
  axios.get(`/formulas/getFormulaById/${_id}`);

export const unPubFormula = (_id) => axios.get(`/formulas/unPubFormula/${_id}`);

export const deleteFormula = (_id) => axios.delete(`/formulas/${_id}`);

export const updateFormula = (params) =>
  axios.put("/formulas/updateFormula", params);

// export const getIngredientById = (_id) =>
//   axios.get(`/ingredients/getIngredientById/${_id}`);


// export const pubIngredient = (_id) => axios.put(`/ingredients/publish/${_id}`);
