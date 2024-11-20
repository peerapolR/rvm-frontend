import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BaseButton from "../BaseButton";
import ModalConfirm from "@components/ModalConfirm";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function FooterBar(props) {
  const ctx = useFormulaCTX();
  const { addNewFormula } = ctx;
  const { setPath, path } = props;
  const [modal, setModal] = useState({
    type: "",
    isOpen: false,
  });

  const handleModal = (type) => {
    setModal({
      type,
      isOpen: true,
    });
  };

  const handlePublish = () => {
    addNewFormula();
    handleModal("success");
  };

  return (
    <div className="min-h-20 bg-revomed-white mt-[15.5rem]">
      <div className="flex gap-5 justify-between mx-5 pt-4">
        {path === "newFormula" ? (
          <div
            className="flex gap-4 font-bold items-center"
            style={{ fontSize: "16px" }}
          >
            {/* <div className="text-revomed-dark-grey">Total price:</div>
            <div className="text-revomed-primary">0.00 THB</div> */}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <BaseButton
              className="p-3 text-revomed-secondary border-0 bg-revomed-white"
              onClick={() => handleModal("delete")}
            >
              Cancel
            </BaseButton>
          </div>
        )}
        <div className="flex gap-6 items-center">
          {path === "newFormula" ? (
            <>
              {" "}
              <BaseButton
                className="p-3 text-revomed-secondary border-0 bg-revomed-white"
                onClick={() => handleModal("delete")}
              >
                Cancel
              </BaseButton>
              <BaseButton
                className="p-3 text-revomed-secondary border-0 bg-revomed-white"
                onClick={() => handleModal("save")}
              >
                Save
              </BaseButton>
              <BaseButton
                // disabled
                className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-secondary rounded-lg text-revomed-white"
                onClick={() => setPath("summary")}
              >
                Next
              </BaseButton>
            </>
          ) : (
            <>
              {" "}
              <BaseButton
                className="p-3 text-revomed-secondary border-0 bg-revomed-white"
                onClick={() => handleModal("save")}
              >
                Save
              </BaseButton>
              <BaseButton
                className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-1 bg-revomed-white border-revomed-secondary"
                onClick={() => setPath("newFormula")}
              >
                Back
              </BaseButton>
              <BaseButton
                // disabled
                className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-secondary rounded-lg text-revomed-white"
                onClick={handlePublish}
              >
                Publish
              </BaseButton>
            </>
          )}
        </div>
      </div>
      <ModalConfirm
        isOpen={modal.isOpen}
        type={modal.type}
        setModal={setModal}
        onClick={() => setModal({ type: "", isOpen: false })}
      />
    </div>
  );
}
