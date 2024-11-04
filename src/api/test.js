import axios from "@config/axios";

export const testApi = () => axios.get(`/ingredients/listAllIngredient`);

// export const createAlz = (input) => axios.post("/alzheimers/save", input);

// export const updateAlz = (alzId, input) =>
//   axios.put(`/alzheimers/update/${alzId}`, input);
