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
    carton: "",
    carton_detail: "",
    carton_screen: "",
    carton_price: "",
    proposal_name: "",
    prePrice: "",
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
    moq1: "",
    price1: "",
    packaging1: "",
    packaging_detail1: "",
    packaging_price1: "",
    moq2: "",
    price2: "",
    packaging2: "",
    packaging_detail2: "",
    packaging_price2: "",
    moq3: "",
    price3: "",
    packaging3: "",
    packaging_detail3: "",
    packaging_price3: "",
  };

  const [formulation, setFormulation] = useState([]);
  const [newProposal, setNewProposal] = useState(defaultProposal);
  const [listProposalByCon, setListProposalByCon] = useState([]);
  const [dosageData, setDosageData] = useState([]);

  const [listOrderToSale, setListOrderToSale] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);

  const [pendingOrder, setPendingOrder] = useState([]);

  const [saleManagerOrder, setSaleManagerOrder] = useState([]);
  const [numToOrder, setNumToOrder] = useState(null);

  const [optionMoq, setOptionMoq] = useState([]);

  const [finalPrice1, setFinalPrice1] = useState(0);
  const [finalPrice2, setFinalPrice2] = useState(0);
  const [finalPrice3, setFinalPrice3] = useState(0);

  useEffect(() => {
    if (finalPrice1) {
      setNewProposal(() => ({
        ...newProposal,
        price1: finalPrice1,
      }));
    }
  }, [finalPrice1]);

  useEffect(() => {
    if (finalPrice2) {
      setNewProposal(() => ({
        ...newProposal,
        price2: finalPrice2,
      }));
    }
  }, [finalPrice2]);

  useEffect(() => {
    if (finalPrice3) {
      setNewProposal(() => ({
        ...newProposal,
        price3: finalPrice3,
      }));
    }
  }, [finalPrice3]);

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
        price1: finalPrice1.toString(),
        price2: finalPrice2.toString(),
        price3: finalPrice3.toString(),
        formulation: formulation,
        order_id: newProposal.proposal_code,
      });
      if (res.status === 201 || res.status === 200) {
        const update = await formulaApi.useFormula(newProposal.formular_name);

        setFormulation([]);
        setNewProposal(defaultProposal);
        setListProposalByCon([]);
        setDosageData([]);
        setNumToOrder(0);

        router.push("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const draftNewProposal = async () => {
    try {
      const res = await proposalApi.addOrder({
        ...newProposal,
        creator_id: user?.firstName,
        product_category: "supplement",
        order_status: "draft",
        price1: finalPrice1.toString(),
        price2: finalPrice2.toString(),
        price3: finalPrice3.toString(),
        formulation: formulation,
        order_id: newProposal.proposal_code,
      });
      if (res.status === 201 || res.status === 200) {
        setFormulation([]);
        setNewProposal(defaultProposal);
        setListProposalByCon([]);
        setDosageData([]);
        setNumToOrder(0);

        router.push("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editDraftNewProposal = async (_id) => {
    try {
      const res = await proposalApi.updateOrder({
        ...newProposal,
        _id: _id,
        creator_id: user?.firstName,
        product_category: "supplement",
        order_status: "draft",
        price1: finalPrice1.toString(),
        price2: finalPrice2.toString(),
        price3: finalPrice3.toString(),
        formulation: formulation,
        order_id: newProposal.proposal_code,
      });
      if (res.status === 201 || res.status === 200) {
        setFormulation([]);
        setNewProposal(defaultProposal);
        setListProposalByCon([]);
        setDosageData([]);
        setNumToOrder(0);

        router.push("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editNewProposal = async (_id) => {
    try {
      const res = await proposalApi.updateOrder({
        ...newProposal,
        _id: _id,
        creator_id: user?.firstName,
        product_category: "supplement",
        order_status: "pending",
        price1: finalPrice1.toString(),
        price2: finalPrice2.toString(),
        price3: finalPrice3.toString(),
        formulation: formulation,
        order_id: newProposal.proposal_code,
      });
      if (res.status === 201 || res.status === 200) {
        setFormulation([]);
        setNewProposal(defaultProposal);
        setListProposalByCon([]);
        setDosageData([]);
        setNumToOrder(0);

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

  const fetchEditOrderById = async (_id) => {
    try {
      const res = await proposalApi.fetchOrderById(_id);

      if (res.status === 200 || res.status === 201) {
        const data = res.data.data[0];

        setNewProposal(() => ({
          order_id: data.order_id,
          product_category: data.product_category,
          dosage_form: data.dosage_form,
          master_ingredient: data.master_ingredient,
          ingredient: data.ingredient,
          carton: data.carton,
          carton_detail: data.carton_detail,
          carton_screen: data.carton_screen,
          carton_price: data.carton_price,
          proposal_name: data.proposal_name,
          prePrice: data.prePrice,
          customer_name: data.customer_name,
          proposal_code: data.proposal_code,
          address: data.address,
          sub_district: data.sub_district,
          district: data.district,
          city: data.city,
          postal_code: data.postal_code,
          tel: data.tel,
          tax_id: data.tax_id,
          contact_person: data.contact_person,
          creator_id: data.creator_id,
          order_status: data.order_status,
          moq1: data.moq1,
          price1: data.price1,
          packaging1: data.packaging1,
          packaging_detail1: data.packaging_detail1,
          packaging_price1: data.packaging_price1,
          moq2: data.moq2,
          price2: data.price2,
          packaging2: data.packaging2,
          packaging_detail2: data.packaging_detail2,
          packaging_price2: data.packaging_price2,
          moq3: data.moq3,
          price3: data.price3,
          packaging3: data.packaging3,
          packaging_detail3: data.packaging_detail3,
          packaging_price3: data.packaging_price3,
        }));

        setFormulation(data.formulation);
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
  const declineOrder = async (_id) => {
    try {
      const res = await proposalApi.declineOrder(_id);

      if (res.status === 200 || res.status === 201) {
        router.push("/main/myProposal");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNumToGenOrderId = async (order_id) => {
    try {
      const res = await proposalApi.getNumToGenOrderId(order_id);

      if (res.status === 200 || res.status === 201) {
        setNumToOrder(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMoqByForm = async () => {
    try {
      const res = await proposalApi.getDataByDosage({
        dosage_form: newProposal.dosage_form,
      });

      if (res.status === 200 || res.status === 201) {
        setOptionMoq(res.data.data);
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
    draftNewProposal,
    editDraftNewProposal,
    editNewProposal,
    listOrderBySaleName,
    listOrderToSale,
    fetchOrderById,
    orderDetail,
    fetchPendingOrder,
    pendingOrder,
    approveOrder,
    rejectOrder,
    proposedOrder,
    declineOrder,
    fetchOrderForSaleManager,
    saleManagerOrder,
    getNumToGenOrderId,
    numToOrder,
    optionMoq,
    getMoqByForm,
    finalPrice1,
    setFinalPrice1,
    finalPrice2,
    setFinalPrice2,
    finalPrice3,
    setFinalPrice3,
    fetchEditOrderById,
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
