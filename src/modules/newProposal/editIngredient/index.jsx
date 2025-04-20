import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import BreadCrumb from "./Breadcrumb";
import FooterBar from "./footerBar";
import BaseButton from "@components/BaseButton";
import IngredientTable from "./IngredientTable";
import ModalDetail from "@modules/formula/newFormula/modalDetail";
import formatPrice from "@functions/formatPrice";
import DosageForm from "./DosageForm";
import ModalIngredient from "./modalIngredient";

import { useNewProposalCTX } from "@contexts/NewProposalContext";
import { useIngredientCTX } from "@contexts/IngredientContext";

import { searchIngredient } from "@functions/searchIngredient";

export default function EditIngredientList() {
  const router = useRouter();

  const newProposalctx = useNewProposalCTX();
  const {
    formulation,
    setNewProposal,
    newProposal,
    fetchFormulaByCon,
    editIngredientNewProposal,
    cancleEditIngredientNewProposal,
  } = newProposalctx;
  const ingreCtx = useIngredientCTX();
  const { ingredient, ingredientToUse } = ingreCtx;

  const [detailModal, setDetailModal] = useState({});
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [dataSource, setDataSource] = useState([
    ...newProposal.master_ingredient,
    ...newProposal.ingredient,
  ]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(ingredientToUse);
  const [selected, setSelected] = useState([]);
  const [editCount, setEditCount] = useState(0);
  const [editRecord, setEditRecord] = useState([]);
  const [isCal, setIsCal] = useState(false);

  const [readyToNext, setReadyToNext] = useState(false);

  useEffect(() => {
    setDataSource([
      ...newProposal.master_ingredient,
      ...newProposal.ingredient,
    ]);
  }, [isCal]);

  const handleEditIngredient = () => {
    console.log("Edit Ingredient");
    setReadyToNext(true);
    setOpenEdit(true);
  };
  const handleSearch = () => {
    try {
      const searchResults = searchIngredient(query, ingredientToUse);
      setResults(searchResults);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div className="p-6 mb-5">
        <div className="flex justify-between items-center pb-5 mb-6 border-b-1 border-revomed-light-grey1">
          <div className="flex">
            <Title level={4} style={{ color: "#004D7D" }}>
              Ingredients
            </Title>
          </div>
          <BreadCrumb />
        </div>
        <div className="flex justify-between mb-5">
          <div className="font-semibold flex justify-end">
            <span className="m-2 text-revomed-dark-grey">Formulation: </span>
            {formulation.map((formu, i) => [
              <div
                className="h-[40px] bg-revomed-secondary-light3 text-revomed-secondary rounded-lg flex items-center px-5 font-normal mr-3"
                key={i}
              >
                {formu}
              </div>,
            ])}
          </div>
          <div className="font-semibold flex justify-end">
            <span className="m-2 text-revomed-dark-grey">Dosage Form: </span>
            <div className="h-[40px] bg-revomed-secondary-light3 text-revomed-secondary rounded-lg flex items-center px-5 font-normal mr-3">
              {newProposal.dosage_form}
            </div>
          </div>
          <div>
            <BaseButton
              className=" h-[48px] py-3 px-10  bg-revomed-primary rounded-lg text-revomed-white"
              onClick={() => {
                handleEditIngredient();
              }}
              disabled={openEdit}
            >
              Edit Ingredient
            </BaseButton>
          </div>
        </div>
        {openEdit ? (
          <>
            <DosageForm
              formulation={formulation}
              setIsOpen={setIsOpen}
              setOpenDetail={setOpenDetail}
              setDetailModal={setDetailModal}
              setIsMaster={setIsMaster}
              setDataSource={setDataSource}
              dataSource={dataSource}
              setReadyToNext={setReadyToNext}
              setOpenEdit={setOpenEdit}
              price={newProposal.prePrice}
              setEditCount={setEditCount}
              editCount={editCount}
              newProposal={newProposal}
              editRecord={editRecord}
              setEditRecord={setEditRecord}
              isCal={isCal}
              setIsCal={setIsCal}
              editIngredientNewProposal={editIngredientNewProposal}
              cancleEditIngredientNewProposal={cancleEditIngredientNewProposal}
            />
            <ModalIngredient
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setOpenDetail={setOpenDetail}
              setDetailModal={setDetailModal}
              isMaster={isMaster}
              query={query}
              setQuery={setQuery}
              results={results}
              selected={selected}
              setSelected={setSelected}
            />
          </>
        ) : (
          <IngredientTable
            newProposal={newProposal}
            setDetailModal={setDetailModal}
            setOpenDetail={setOpenDetail}
          />
        )}
      </div>
      <FooterBar readyToNext={readyToNext} />
      <ModalDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        detailModal={detailModal}
      />
    </div>
  );
}
