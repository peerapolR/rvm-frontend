import axios from "../config/axios";

export const login = (value) => axios.post("/users/login", value);

export const getMe = () => axios.get("/users/me");

export const getAllUser = () => axios.get("/users/getAllUsers");

export const getUserById = (_id) => axios.get(`/users/getUserById/${_id}`);

export const updateUserById = (_id, params) =>
  axios.put(`/users/update/${_id}`, params);

export const resetPassword = (_id) => axios.put(`/users/resetPassword/${_id}`);

export const register = (params) => axios.post("/users/register", params);

export const updatePassword = (_id, params) =>
  axios.put(`/users/updatePassword/${_id}`, params);
