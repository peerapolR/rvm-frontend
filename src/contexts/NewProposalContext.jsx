"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUserAuth } from "@contexts/UserAuthContext";

import * as proposalApi from "@api/proposal";
import * as ingredientApi from "@api/ingredient";
import * as formulaApi from "@api/formula";

const NewProposalContext = createContext(null);

function NewProposalContextProvider({ children }) {
  const router = useRouter();
  const { user } = useUserAuth();

  const defaultProposal = {
    order_id: "",
    product_category: "",
    dosage_form: "",
    formula: "",
    formular_name: "",
    master_ingredient: "",
    ingredient: "",
    packaging: "",
    packaging_detail: "",
    packaging_price: "",
    carton: "",
    carton_detail: "",
    carton_screen: "",
    carton_price: "",
    proposal_name: "",
    moq: "",
    prePrice: "",
    price: "",
    customer_name: "",
    proposal_code: "",
    address: "",
    sub_district: "",
    district: "",
    city: "",
    postal_code: "",
    tel: "",
    tax_id: "",
    contact_person: "",
    creator_id: "",
    order_status: "",
  };

  const [formulation, setFormulation] = useState([]);
  const [newProposal, setNewProposal] = useState(defaultProposal);
  const [listProposalByCon, setListProposalByCon] = useState([]);
  const [dosageData, setDosageData] = useState([]);

  const [listOrderToSale, setListOrderToSale] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);

  const [pendingOrder, setPendingOrder] = useState([]);

  const [saleManagerOrder, setSaleManagerOrder] = useState([]);

  const handleNewProposalChange = (e) => {
    const { name, value } = e.target;

    setNewProposal(() => ({
      ...newProposal,
      [name]: value,
    }));
  };

  const fetchFormulaByCon = async () => {
    try {
      const res = await formulaApi.getFormulaByCon({
        product_category: "supplement",
        formulation: formulation,
        dosage_form: newProposal.dosage_form,
      });

      if (res.status === 200 || res.status === 201) {
        setListProposalByCon(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewProposal = async () => {
    try {
      const res = await proposalApi.addOrder({
        ...newProposal,
        creator_id: user?.firstName,
        product_category: "supplement",
        order_status: "pending",
        price: "0",
        formulation: formulation,
        order_id: newProposal.proposal_code,
      });
      if (res.status === 201 || res.status === 200) {
        setFormulation([]);
        setNewProposal(defaultProposal);
        setListProposalByCon([]);
        setDosageData([]);

        router.push("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listOrderBySaleName = async () => {
    try {
      const res = await proposalApi.listOrderBySale({
        sale_id: user?.firstName,
      });
      if (res.status === 201 || res.status === 200) {
        setListOrderToSale(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataDosage = async () => {
    try {
      const res = await ingredientApi.getDataByDosage({
        dosage_form: newProposal.dosage_form,
      });

      if (res.status === 200 || res.status === 201) {
        setDosageData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrderById = async (_id) => {
    try {
      const res = await proposalApi.fetchOrderById(_id);

      if (res.status === 200 || res.status === 201) {
        setOrderDetail(res.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendingOrder = async () => {
    try {
      const res = await proposalApi.listPendingOrder();

      if (res.status === 200 || res.status === 201) {
        setPendingOrder(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrderForSaleManager = async () => {
    try {
      const res = await proposalApi.listOrderBysaleManager();

      if (res.status === 200 || res.status === 201) {
        setSaleManagerOrder(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveOrder = async (_id) => {
    try {
      const res = await proposalApi.approveOrder(_id);

      if (res.status === 200 || res.status === 201) {
        router.push("/main/pendingProposal");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectOrder = async (_id) => {
    try {
      const res = await proposalApi.rejectOrder(_id);

      if (res.status === 200 || res.status === 201) {
        router.push("/main/pendingProposal");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const proposedOrder = async (_id) => {
    try {
      const res = await proposalApi.proposedOrder(_id);

      if (res.status === 200 || res.status === 201) {
        router.push("/main/myProposal");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    formulation,
    setFormulation,
    newProposal,
    setNewProposal,
    fetchFormulaByCon,
    listProposalByCon,
    handleNewProposalChange,
    dosageData,
    fetchDataDosage,
    addNewProposal,
    listOrderBySaleName,
    listOrderToSale,
    fetchOrderById,
    orderDetail,
    fetchPendingOrder,
    pendingOrder,
    approveOrder,
    rejectOrder,
    proposedOrder,
    fetchOrderForSaleManager,
    saleManagerOrder,
  };
  return (
    <NewProposalContext.Provider value={value}>
      {children}
    </NewProposalContext.Provider>
  );
}

export default NewProposalContextProvider;

export const useNewProposalCTX = () => {
  const ctx = useContext(NewProposalContext);

  if (!ctx) {
    throw new Error(
      "useNewProposalCTX must be used within a NewProposalContextProvider"
    );
  }

  return ctx;
};
