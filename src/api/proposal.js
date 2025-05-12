import axios from "@config/axios";

export const addOrder = (params) => axios.post(`/orders/addOrder`, params);

export const updateOrder = (params) => axios.put(`/orders/updateOrder`, params);

export const updateVerifyOrder = (params) =>
  axios.put(`/orders/updateVerifyOrder`, params);

export const listOrderBySale = (params) =>
  axios.post(`/orders/listOrderBySale`, params);

export const listPendingOrder = () => axios.get(`/orders/listOrderPending`);

export const listVerifyOrder = () => axios.get(`/orders/listOrderVerify`);

export const listOrderBysaleManager = () =>
  axios.get(`/orders/listOrderBysaleManager`);

export const fetchOrderById = (_id) =>
  axios.get(`/orders/fetchOrderById/${_id}`);

export const approveOrder = (_id) => axios.get(`/orders/approveOrder/${_id}`);

export const pdVerifyOrder = (_id) => axios.get(`/orders/pdVerifyOrder/${_id}`);

export const rejectOrder = (_id) => axios.get(`/orders/rejectOrder/${_id}`);

export const proposedOrder = (_id) => axios.get(`/orders/proposedOrder/${_id}`);

export const declineOrder = (_id) => axios.get(`/orders/declineOrder/${_id}`);

export const getNumToGenOrderId = (order_id) =>
  axios.get(`/orders/getNumToGenOrderId/${order_id}`);

export const getDataByDosage = (dosage_form) =>
  axios.post(`/ingredients/getDataByDosage`, dosage_form);
