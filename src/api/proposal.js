import axios from "@config/axios";

export const addOrder = (params) => axios.post(`/orders/addOrder`, params);

export const listOrderBySale = (params) =>
  axios.post(`/orders/listOrderBySale`, params);

export const listPendingOrder = () => axios.get(`/orders/listOrderPending`);

export const listOrderBysaleManager = () =>
  axios.get(`/orders/listOrderBysaleManager`);

export const fetchOrderById = (_id) =>
  axios.get(`/orders/fetchOrderById/${_id}`);

export const approveOrder = (_id) => axios.get(`/orders/approveOrder/${_id}`);

export const rejectOrder = (_id) => axios.get(`/orders/rejectOrder/${_id}`);

export const proposedOrder = (_id) => axios.get(`/orders/proposedOrder/${_id}`);
